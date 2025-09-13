import { vectors } from "@/assets"
import WalletSVG from "../SVG/WalletSVG"
import { formatCurrency } from "@/utils/common"

export const OverViewCards = ({ cards, title }:
  {
    cards: Array<{
      withBg?: boolean,
      iconColor?: string,
      iconBg?: string,
      label: string,
      value: string
    }>,
    title?: string
  }) => {
  return (
    <div className="w-full">
      {
        title && (
          <h4 className="mb-2 text-base font-[500]">{title}</h4>
        )
      }
      
    <div className="w-full flex gap-4 flex-wrap justify-center sm:justify-start">
      {cards.map((card, index) => {
        return (
          <SingleOverViewCard
            key={index}
            withBg={card.withBg ? card.withBg : false}
            data={{ label: card.label, value: card.value }}
            iconColor={card.iconColor}
            iconBg={card.iconBg}
            />
        )
      })}
    </div>
    </div>
  )
}

const SingleOverViewCard = ({ withBg = false, data, iconBg, iconColor }: { withBg?: boolean, data: { label: string, value: string }, iconBg?: string, iconColor?: string }) => {
  return (
    <div
      style={{ backgroundImage: withBg ? `url(${vectors.cardVector})` : "" }}
      className={`w-[90%] sm:w-[265px] h-[128px] rounded-[10px] ${withBg ? "bg-[#510003]" : "bg-white"} bg-cover shadow-sm p-5 flex flex-col gap-5`}
    >
      <div className="flex gap-3 items-center">
        <span style={{ backgroundColor: iconBg ? iconBg : "" }} className={`${!iconBg && "bg-white"} w-[35px] h-[35px] rounded-full flex justify-center items-center`}>
          <WalletSVG color={iconColor ? iconColor : "white"} />
        </span>
        <p className={`text-[13px] font-light ${withBg ? "text-[#FFFFFF]" : 'text-black'}`}>{data.label}</p>
      </div>
      <div className={`${withBg ? "text-[#FFFFFF]" : 'text-black'} text-[18px] font-[500]`}>
        {data.value}
      </div>
    </div>
  )
}