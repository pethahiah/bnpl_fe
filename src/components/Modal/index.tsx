'use client'

// import { useEffect } from 'react';
import ReactDOM from 'react-dom';
// import { trackModalView } from '../../utils/tracker';
import "./modal.css";
import { useEffect, useState } from 'react';

interface IModal {
  children: JSX.Element;
  onClose: () => void;
  open: boolean;
  overrideStyle?: Record<string, string>;
  title: string;
  subTitle?: string;
  footer?: () => JSX.Element
  className?: string
  hideClose?: boolean
}

const Modal = ({
  children,
  onClose,
  open,
  overrideStyle,
  title,
  footer,
  subTitle,
  className,
  hideClose
}: IModal) => {
  const [domReady, setDomReady] = useState(false)

  // useEffect(() => {
  //   open && trackModalView(title);
  // }, [open, title]);
  useEffect(() => {
    setDomReady(true)
  }, [])

  if (!open) return null;

  return domReady
    ? ReactDOM.createPortal(
      <>
        <div className="overlay" onClick={onClose} />
        <div className={`c-modal ${className}`} style={overrideStyle || {}}>
          {title ? <h3 className='text-2xl w-full'>{title}</h3> : ''}
          <h5>{subTitle}</h5>
          <div
            className="modal-wrapper"
          // style={overrideChildrenStyle}
          >
            {children}
          </div>
          {
            !hideClose && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" onClick={onClose} className='!absolute !top-5 !right-5 h-4 w-4'>
                <path d="M15.787 14.7579L9.02831 7.99554L15.787 1.23316C16.0593 0.951224 16.0593 0.504153 15.787 0.222124C15.508 -0.0669215 15.0476 -0.074916 14.7587 0.20427L7.99997 6.96665L1.24132 0.204359C0.959535 -0.0679875 0.512705 -0.0679875 0.230828 0.204359C-0.0580623 0.483545 -0.0660523 0.944206 0.212983 1.23325L6.97163 7.99554L0.212983 14.7578C0.0766172 14.8943 1.81872e-08 15.0793 1.81872e-08 15.2722C-8.88562e-05 15.6741 0.325557 15.9999 0.727198 16C0.920117 16.0002 1.10513 15.9234 1.24132 15.7867L7.99997 9.02443L14.7587 15.7868C14.8949 15.9235 15.08 16.0003 15.2729 16C15.4657 15.9999 15.6505 15.9233 15.7869 15.787C16.071 15.5028 16.0711 15.0421 15.787 14.7579Z" fill="#222222" />
              </svg>
            )
          }
          {footer && <div className="modal-footer !py-5">{footer()}</div>}
        </div>
      </>,
      document.getElementById('portal')!
    ) : null
}

export default Modal

