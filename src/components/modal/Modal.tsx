"use client";
import { useState, useEffect, useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";
import { gsap } from "gsap";
import Form from "../form/Form";
import { ModalToggleContext } from "@/context/ModalToggleProvider";
import CloseIcon from "../icons/CloseIcon";
import "./modal.scss";

export default function Modal() {
  const [isBrowser, setIsBrowser] = useState(false);
  const { isOpen, toggleModal } = useContext(ModalToggleContext);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClick = () => {
    toggleModal();
  };

  if (isBrowser) {
    return createPortal(
      <Transition
        mountOnEnter
        unmountOnExit
        in={isOpen}
        nodeRef={nodeRef}
        addEndListener={(done) => {
          const ctx = gsap.context(() => {
            if (isOpen) {
              gsap.set(".modal-block__modal", { y: -50 });
              gsap
                .timeline({ onComplete: done })
                .to(".modal-block__overlay", {
                  autoAlpha: 1,
                  duration: 0.1,
                  pointerEvents: "auto",
                })
                .to(
                  ".modal-block__modal",
                  { autoAlpha: 1, y: 0, duration: 0.25, pointerEvents: "auto" },
                  0
                );
            } else {
              gsap
                .timeline({ onComplete: done })
                .to(".modal-block__modal", {
                  autoAlpha: 0,
                  y: -50,
                  duration: 0.25,
                  pointerEvents: "auto",
                })
                .to(
                  ".modal-block__overlay",
                  { autoAlpha: 0, duration: 0.1, pointerEvents: "auto" },
                  ">-=0.1"
                );
            }
          }, nodeRef);
          document.body.classList.toggle("hide-body");
          return () => ctx.revert();
        }}
      >
        <div className="modal-block" ref={nodeRef}>
          <div
            className="modal-block__overlay"
            onClick={handleClick}
            data-testid="modal-ovelay"
          />
          <div className="modal-block__modal" data-testid="modal">
            <button
              className="modal-block__modal-button"
              onClick={handleClick}
              data-testid="modal-button"
            >
              <CloseIcon />
            </button>
            <Form />
          </div>
        </div>
      </Transition>,
      document.body
    );
  } else {
    return null;
  }
}
