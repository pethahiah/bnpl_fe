import { Fragment } from "react";

export default function TopLayout({ leftComponents, middleComponents, rightComponents, filled = false, className }: { leftComponents?: Array<JSX.Element>, middleComponents?: Array<JSX.Element>, rightComponents?: Array<JSX.Element>, filled?: boolean, className?: string }) {
  return (
    <div className={`w-[100%] flex flex-wrap gap-2 items-center justify-between  py-2 ${filled && "bg-white"} ${className}`}>
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {leftComponents?.map((leftCom, index) => (<Fragment key={index}> {leftCom} </Fragment>))}
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {middleComponents?.map((middleCom, index) => (<Fragment key={index}>{middleCom}</Fragment>))}
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {rightComponents?.map((rightCom, index) => (<Fragment key={index}>{rightCom}</Fragment>))}
      </div>
    </div>
  )
}
