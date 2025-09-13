
export default function StatusTag({ status, type = "filled", statusText }:
  { status: "successful" | "pending" | "failed", type?: "filled" | "text", statusText?: string }) {
  return (
    <span className={`w-fit flex gap-[10px] text-[12px] justify-center items-center px-[10px] py-[3px] rounded-md capitalize
      ${status === "successful" ? "bg-[#00B05B0D] text-[#00B05B]" :
        status === "pending" ? "bg-[#FB7A0112] text-[#FB7A01]" :
          status === "failed" ? "bg-[#FFF2F2] text-[#F55F64]"
            : null
      }
      ${type === "text" && "!bg-transparent !p-0"}
    `}>
      <span
        className={`w-[7px] h-[7px] rounded-full
      ${status === "successful" ? "bg-[#00B05B]" :
            status === "pending" ? "bg-[#FB7A01]" :
              status === "failed" ? "bg-[#F55F64]"
                : null
          }`}></span>
      {statusText ? statusText : status}
    </span>
  )
}
