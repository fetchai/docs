/* eslint-disable react/no-unknown-property */
import React, { useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? onClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);

    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="nx-mx-4 nx-w-full">
        <div
          className="modal-content animate md:nx-max-w-[550px]  small-screen-height sm:nx-max-h-[min(calc(50vh-11rem-env(safe-area-inset-bottom)),400px)] md:nx-max-h-[min(calc(100vh-5rem-env(safe-area-inset-bottom)),400px)] "
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes slideInFromBottom {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideOutToBottom {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 13, 61, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          margin-inline: auto;
          background: white;
          border-radius: 8px;
          max-width: 700px;
          width: 100%;
          padding: 24px 0px 0px 0px;
          height: 450px;
          position: relative;
          z-index: 100;
          opacity: 0;
        }

        .modal-content.animate {
          animation: fadeIn 0.4s forwards;
        }

        .modal-overlay.animate-out .modal-content {
          animation: fadeOut 0.4s forwards;
        }

        @media (max-width: 768px) {
          .modal-content.animate {
            animation: slideInFromBottom 0.4s forwards;
          }

          .modal-overlay.animate-out .modal-content {
            animation: slideOutToBottom 0.4s forwards;
          }
        }
      `}</style>
    </div>,
    // eslint-disable-next-line unicorn/prefer-query-selector
    document.getElementById("modal-root") as HTMLElement,
  );
};

export default Modal;
