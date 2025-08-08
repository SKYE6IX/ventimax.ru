"use client";
import React, { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CircleLeftArrow from "../icons/CircleLeftArrow";
import CircleRightArrow from "../icons/CircleRightArrow";
import { infiniteSlider } from "@/utils/infiniteSlider";
import "./exhibition-block.scss";

const exhibitionBlockData = [
   "/exhibition-images/ex-1.JPG",
   "/exhibition-images/ex-2.JPG",
   "/exhibition-images/ex-3.JPG",
   "/exhibition-images/ex-4.JPG",
];
gsap.registerPlugin(useGSAP);

function ExhibitionBlock() {
   const t = useTranslations("Pages.home.exhibitionBlock");
   const infiniteSliderRef = useRef<ReturnType<typeof infiniteSlider>>(null);
   const sliderContainerRef = useRef<HTMLDivElement | null>(null);
   const activeElementRef = useRef<HTMLDivElement | null>(null);
   const [initialAnimation, setInitialAnimation] = useState(true);

   const { contextSafe } = useGSAP(
      () => {
         const mm = gsap.matchMedia();
         const slides = gsap.utils.toArray(
            ".exhibition-block__slide"
         ) as HTMLDivElement[];
         const breakPoint = 912;
         mm.add(
            {
               isDesktop: `(min-width: ${breakPoint}px)`,
               isMobile: `(max-width: ${breakPoint}px)`,
            },
            (context) => {
               const { isMobile } = context.conditions as { isMobile: boolean };
               // Reset activeElementRef and initial animation duriung navigations
               activeElementRef.current = null;
               setInitialAnimation(true);
               // Set the initial style on each slide
               gsap.set(".exhibition-block__image", {
                  scale: (i) => (i === 0 ? 1 : 0.9),
               });
               //Initialize the slide helper function
               infiniteSliderRef.current = infiniteSlider({
                  items: slides,
                  config: {
                     paused: true,
                     center: true,
                     draggable: isMobile,
                     onChange: (element) => {
                        const tl = gsap.timeline();
                        if (activeElementRef.current) {
                           tl.fromTo(
                              ".active .exhibition-block__image",
                              { scale: 1 },
                              { scale: 0.9, ease: "power1.in", duration: 0.2 }
                           );
                           activeElementRef.current.classList.remove("active");
                        }
                        element.classList.add("active");
                        activeElementRef.current = element;
                        tl.add(() => {
                           tl.fromTo(
                              ".active .exhibition-block__image",
                              { scale: 0.9 },
                              { scale: 1, ease: "power1.out", duration: 0.2 }
                           );
                        }, "+=0").progress(initialAnimation ? 1 : 0);
                     },
                  },
               });
               infiniteSliderRef.current.toIndex(0, { duration: 0 });
               setInitialAnimation(false);
            }
         );
      },
      { scope: sliderContainerRef }
   );

   const moveLeft = contextSafe(() => {
      infiniteSliderRef.current?.next({ ease: "power1.inOut", duration: 0.4 });
   });
   const moveRight = contextSafe(() => {
      infiniteSliderRef.current?.previous({
         ease: "power1.inOut",
         duration: 0.4,
      });
   });
   return (
      <section className="exhibition-block">
         <div className="exhibition-block__header">
            <h3
               className="exhibition-block__title"
               data-testid="exhibition-title"
            >
               {t("title")}
            </h3>
         </div>
         <div
            className="exhibition-block__slider-container"
            ref={sliderContainerRef}
         >
            {exhibitionBlockData.map((image, idx) => (
               <div key={image + idx} className="exhibition-block__slide">
                  <Image
                     src={image}
                     alt="Exhibitons images show casing our products"
                     fill
                     className="exhibition-block__image"
                     data-testid="exhibition-image"
                     priority
                  />
               </div>
            ))}
         </div>
         <div className="exhibition-block__slider-controls-container">
            <div className="exhibition-block__slider-controls">
               <button
                  className="exhibition-block__slider-control"
                  onClick={moveLeft}
                  data-testid="exhibition-button"
               >
                  <CircleLeftArrow />
               </button>
               <button
                  className="exhibition-block__slider-control"
                  onClick={moveRight}
                  data-testid="exhibition-button"
               >
                  <CircleRightArrow />
               </button>
            </div>
         </div>
      </section>
   );
}
export default ExhibitionBlock;
