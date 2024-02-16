import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const PasswordChangeModal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    document.body.style.overflow = "hidden";
    return () => {
      modalRoot.removeChild(elRef.current);
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};
export default PasswordChangeModal;
