import { icons } from "@/assets";
import { ChangeEvent } from "react";
// import { icons } from "../../assets";

type IPhoneNumberInputProps = {
  width?: string;
  height?: string;
  value: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required: boolean | undefined;
  onBlur?: () => void;
  name?: string;
  min?: number;
  pattern?: string;
  readOnly?: boolean;
  defaultValue?: string;
  border?: string;
}

const PhoneNumberInput = ({ width, height, value, handleChange, required, onBlur, name, min, pattern, defaultValue, readOnly, border }: IPhoneNumberInputProps) => {
  return (
    <label
      className={`
      w-${width ? width : "full"} 
      h-${height ? height : "full"}
      ${border ? border : "border-[#b4b4b5]"}
      border rounded-md flex items-center  has-[:focus]:border-[#F55F6480]
    `}>
      <div className="min-w-fit h-full max-w-[25%] px-2 border-r border-[#b4b4b5] flex justify-center items-center gap-1">
        <img src={icons.nigeriaFlag} className="h-[15px]" alt="" />
        <span className="text-[12px] sm:text-[14px]">+234</span>
      </div>
      <input
        onChange={handleChange}
        value={value}
        type="tel"
        placeholder="8100000000"
        id=""
        className="h-[100%] px-2 w-full focus:!outline-none focus:!border-none !m-0 !border-none"
        required={required}
        onBlur={onBlur}
        name={name}
        min={min}
        pattern={pattern}
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
    </label>
  )
}

export default PhoneNumberInput