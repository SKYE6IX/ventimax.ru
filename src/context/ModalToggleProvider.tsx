"use client";
import React, { createContext, useState } from "react";

type ModalToggleContextType = {
  isOpen: boolean;
  toggleModal: () => void;
};

export const ModalToggleContext = createContext<ModalToggleContextType>({
  isOpen: false,
  toggleModal: () => {},
});

function ModalToggleProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <ModalToggleContext.Provider
      value={{ isOpen: isOpen, toggleModal: handleToggle }}
    >
      {children}
    </ModalToggleContext.Provider>
  );
}

export default ModalToggleProvider;
