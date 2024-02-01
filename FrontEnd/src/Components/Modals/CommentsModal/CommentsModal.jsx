import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./CommentsModal.scss";
const CommentsModal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
    elRef.current.classList.add("commentsBox");
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
export default CommentsModal;
