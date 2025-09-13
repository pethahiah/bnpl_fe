import React, { Fragment } from 'react'

interface IChartCntainer {
  className?: string;
  title: string;
  filterComponents?: Array<JSX.Element>;
  showDataTitles?: boolean;
  dataTitle?: string;
  amount?: string;
  percentage?: number;
  chart: JSX.Element
}

function ChartContainer({
  className,
  title,
  filterComponents,
  showDataTitles,
  dataTitle,
  amount,
  percentage,
  chart, }: IChartCntainer) {
  return (
    <div className={`${className} bg-white p-5 rounded-lg shadow-md flex flex-col gap-5 h-fit`}>
      <div className="w-full flex justify-between items-center gap-5 flex-wrap">
        <h1 className='text-[14px] font-[500]'>
          {title}
        </h1>
        {
          (filterComponents && filterComponents.length > 0) && (
            <div className="flex gap-5 flex-wrap">
              {
                filterComponents.map((component, index) => (
                  <Fragment key={index}>{component}</Fragment>
                ))
              }
            </div>
          )
        }
      </div>
      {
        showDataTitles && (
          <div className="w-full">
            {
              dataTitle && (
                <h3 className="text-[#222222] text-[12px]">{dataTitle}</h3>
              )
            }
            {
              amount !== undefined && (
                <div className="flex gap-3 items-center">
                  <h2 className="text-[18px] font-[500]">
                    {amount}
                  </h2>
                  {
                    percentage !== undefined && (
                      <span className={`${percentage < 0 ? "text-[red]" : percentage > 0 ? "text-[#4560ED]" : null} text-[10px] flex items-center gap-1`}>
                        {percentage}% <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${percentage < 0 ? "rotate-180" : percentage > 0 ? "rotate-0" : "hidden"} `}>
                          <path d="M5 0L9.33013 7.5H0.669873L5 0Z" fill={`${percentage < 0 ? "red" : percentage > 0 ? "#4560ED" : null}`} />
                        </svg>
                      </span>
                    )
                  }
                </div>
              )
            }
          </div>
        )
      }
      <div className="w-full max-h-[350px] overflow-auto">
        {chart}
      </div>
    </div>
  )
}

export default ChartContainer