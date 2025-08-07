import gsap from "gsap";

type SliderConfig = GSAPTimelineVars & {
   paddingRight?: number;
   center?: boolean;
   speed?: number;
   snap?: number;
   paused?: boolean;
   onChange?: (element: HTMLDivElement, currentIndex: number) => void;
};

type Timeline = GSAPTimeline & {
   toIndex: (
      index: number,
      vars: GSAPTweenVars
   ) => gsap.core.Timeline | gsap.core.Tween;
   closestIndex: (setCurrent?: boolean) => number;
   current: () => number;
   next: (vars: GSAPTweenVars) => gsap.core.Timeline | gsap.core.Tween;
   previous: (vars: GSAPTweenVars) => gsap.core.Timeline | gsap.core.Tween;
   times: number[];
};

export function infiniteSlider({
   items,
   config,
}: {
   items: HTMLDivElement[];
   config?: SliderConfig;
}) {
   let timeline: Timeline;
   items = gsap.utils.toArray(items);
   config = config;
   // Use a context so that if this is called from within another context
   // or a gsap.matchMedia(), we can perform proper cleanup like the "resize"
   // event handler on the window.
   gsap.context(() => {
      const container = items[0].parentNode as HTMLDivElement;
      const pixelPerSeconds = (config?.speed || 1) * 100;
      const center = config?.center;
      const length = items.length;
      const startX = items[0].offsetLeft;
      const times: number[] = [];
      const widths: number[] = [];
      const spacesBefore: number[] = [];
      const xPercents: number[] = [];
      const onChange = config?.onChange;
      const tl = gsap.timeline({
         repeat: config?.repeat,
         onUpdate: () => {
            if (onChange) {
               const i = tl.closestIndex();
               if (lastIndex !== i) {
                  lastIndex = i;
                  onChange(items[i], i);
               }
            }
         },
         paused: config?.paused,
         defaults: { ease: "none" },
         onReverseComplete: () => {
            tl.totalTime(tl.rawTime() + tl.duration() * 100);
         },
      }) as Timeline;
      let timeWrap: (value: number) => number = () => 0;
      let lastIndex: number,
         currentIndex = 0,
         indexIsDirty = false,
         timeOffset = 0,
         totalWidth: number;
      // Some browsers shift by a pixel to accommodate flex layouts,
      // so for example if width is 20% the first element's width might be 242px,
      // and the next 243px, alternating back and forth. So we snap to 5 percentage
      // points to make things look more natural
      const snap = config?.snap
         ? (v: number) => v
         : gsap.utils.snap(config?.snap || 1);

      const getTotalwidth = () =>
         items[length - 1].offsetLeft +
         (xPercents[length - 1] / 100) * widths[length - 1] -
         startX +
         spacesBefore[0] +
         items[length - 1].offsetWidth *
            Number(gsap.getProperty(items[length - 1], "scaleX")) +
         (config?.paddingRight || 0);

      const populateWidths = () => {
         let b1 = container.getBoundingClientRect(),
            b2: DOMRect;
         items.forEach((el, i) => {
            widths[i] = parseFloat(
               gsap.getProperty(el, "width", "px") as string
            );
            xPercents[i] = snap(
               (parseFloat(gsap.getProperty(el, "x", "px") as string) /
                  widths[i]) *
                  100 +
                  Number(gsap.getProperty(el, "xPercent"))
            );
            b2 = el.getBoundingClientRect();
            spacesBefore[i] = b2.left - (i ? b1.right : b1.left);
            b1 = b2;
         });
         gsap.set(items, {
            // Convert "x" to "xPercent" to make things responsive,
            // and populate the widths/xPercents Arrays to make lookups faster.
            xPercent: (i) => xPercents[i],
         });
         totalWidth = getTotalwidth();
      };

      const populateOffset = () => {
         timeOffset = center
            ? (tl.duration() * (container.offsetWidth / 2)) / totalWidth
            : 0;
         if (center) {
            times.forEach((t, i) => {
               times[i] = timeWrap(
                  tl.labels["label" + i] +
                     (tl.duration() * widths[i]) / 2 / totalWidth -
                     timeOffset
               );
            });
         }
      };

      const getClosest = (values: number[], value: number, wrap: number) => {
         let i = values.length,
            closest = 1e10,
            index = 0,
            d: number;
         while (i--) {
            d = Math.abs(values[i] - value);
            if (d > wrap / 2) {
               d = wrap - d;
            }
            if (d < closest) {
               closest = d;
               index = i;
            }
         }
         return index;
      };
      const populateTimeline = () => {
         let i: number,
            item: HTMLDivElement,
            currentX: number,
            distanceToStart: number,
            distanceToLoop: number;
         tl.clear();
         for (i = 0; i < length; i++) {
            item = items[i];
            currentX = (xPercents[i] / 100) * widths[i];
            distanceToStart =
               item.offsetLeft + currentX - startX + spacesBefore[0];
            distanceToLoop =
               distanceToStart +
               widths[i] * Number(gsap.getProperty(item, "scaleX"));
            tl.to(
               item,
               {
                  xPercent: snap(
                     ((currentX - distanceToLoop) / widths[i]) * 100
                  ),
                  duration: distanceToLoop / pixelPerSeconds,
               },
               0
            )
               .fromTo(
                  item,
                  {
                     xPercent: snap(
                        ((currentX - distanceToLoop + totalWidth) / widths[i]) *
                           100
                     ),
                  },
                  {
                     xPercent: xPercents[i],
                     duration:
                        (currentX - distanceToLoop + totalWidth - currentX) /
                        pixelPerSeconds,
                     immediateRender: false,
                  },
                  distanceToLoop / pixelPerSeconds
               )
               .add("label" + i, distanceToStart / pixelPerSeconds);
            times[i] = distanceToStart / pixelPerSeconds;
         }
         timeWrap = gsap.utils.wrap(0, tl.duration());
      };
      const refresh = (deep: boolean) => {
         //  let progress = tl.progress();
         tl.progress(0, true);
         populateWidths();
         if (deep) {
            populateTimeline();
         }
         populateOffset();
      };
      gsap.set(items, { x: 0 });
      populateWidths();
      populateTimeline();
      populateOffset();
      const onResize = () => refresh(true);
      window.addEventListener("resize", onResize);

      const toIndex = (index: number, vars: GSAPTweenVars | undefined) => {
         vars = vars || {};
         if (Math.abs(index - currentIndex) > length / 2) {
            // Always go in the shortest direction
            index += index > currentIndex ? -length : length;
         }
         const newIndex = gsap.utils.wrap(0, length, index);
         let time = times[newIndex];
         if (
            time > tl.time() !== index > currentIndex &&
            index !== currentIndex
         ) {
            // if we're wrapping the timeline's playhead, make the proper adjustments
            time += tl.duration() * (index > currentIndex ? 1 : -1);
         }
         if (time < 0 || time > tl.duration()) {
            vars.modifiers = { time: timeWrap };
         }
         currentIndex = newIndex;
         vars.overwrite = true;
         return vars.duration === 0
            ? tl.time(timeWrap(time))
            : tl.tweenTo(time, vars);
      };

      tl.toIndex = (index, vars) => toIndex(index, vars);
      tl.closestIndex = (setCurrent) => {
         const index = getClosest(times, tl.time(), tl.duration());
         if (setCurrent) {
            currentIndex = index;
            indexIsDirty = false;
         }
         return index;
      };

      tl.current = () => (indexIsDirty ? tl.closestIndex(true) : currentIndex);
      tl.next = (vars) => toIndex(tl.current() + 1, vars);
      tl.previous = (vars) => toIndex(tl.current() - 1, vars);
      tl.progress(1, true).progress(0, true);
      tl.times = times;

      tl.closestIndex(true);
      lastIndex = currentIndex;
      if (onChange) {
         onChange(items[currentIndex], currentIndex);
      }
      timeline = tl;
      return () => window.removeEventListener("resize", onResize);
   });

   //@ts-expect-error Varibale was assign above
   return timeline;
}
