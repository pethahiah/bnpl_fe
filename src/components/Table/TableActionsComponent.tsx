import { useEffect, useRef, useState } from "react"
import "./tableActionsComponent.css"
import MoreCircleSVG from "../SVG/MoreCircleSVG";
import type { Ref } from "react";

interface IActions {
  label?: string;
  onClick?: () => void;
  style?: string;
  component?: JSX.Element
}
export default function TableActionsComponent({ actions }: { actions: Array<IActions> }) {
  const [showActions, setShowActions] = useState(false)

  const menuBody = useRef(null);
  useClickOutside(menuBody, () => setShowActions(false));

  return (
    <div className="table-action-component-wrapper w-full h-full flex justify-center items-center">
      <div ref={menuBody} className="table-action-component w-auto  h-auto flex justify-center items-center">
        <span
          onClick={() => setShowActions(!showActions)}
        >
          <MoreCircleSVG className={`cursor-pointer hover:fill-slate-200 ${showActions && "fill-slate-200"}`} />
        </span>
        {
          showActions &&
          (
            <div className="table-actions-menu flex flex-col gap-2 justify-center items-center p-2 rounded-md bg-white shadow-md">
              {
                actions.map((singleAction, index) => {
                  if (singleAction.component) {
                    return (singleAction.component)
                  } else {
                    return (
                      <button key={index} type='button' className={`h-8 flex justify-center items-center !rounded-full bg-az-light-red text-peth-red ${singleAction.style}`}
                        onClick={() => {
                          singleAction.onClick && singleAction.onClick();
                          setShowActions(!showActions)
                        }}>
                        {singleAction.label}
                      </button>
                    )
                  }
                })
              }
            </div>
          )
        }
      </div>
    </div>
  )
}


function useClickOutside(ref: any, func: any) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref?.current && !ref.current.contains(event.target)) {
        func()
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
