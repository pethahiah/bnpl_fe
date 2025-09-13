import { icons } from "@/assets";

export default function SearchInputComponent({ className }: { className?: string }) {
  return (
    <div className={`w-[300px] flex items-center justify-center gap-2 p-[10px] rounded-full border border-[#2222224D] 
    ${className}`}>
      <img src={icons.search} width={20} height={20} alt="search" />
      <input
        type="search"
        className='w-[100%] h-[25px] border-none focus:!border-none focus:!outline-none bg-transparent'
        placeholder='Search'
      />
    </div>
  )
}
