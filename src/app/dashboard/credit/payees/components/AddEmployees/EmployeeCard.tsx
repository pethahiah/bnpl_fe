import { icons } from "@/assets";
import { shortenText, formatCurrency } from "@/utils/common";
import { IEmployee } from "@/utils/type";

export default function EmployeeCard({ employee, handleRemove, bankName, handleEdit }: { employee: IEmployee, handleRemove?: (id: string) => void, bankName: string, handleEdit: (id: string) => void }) {
  return (
    <div className="border border-peth-red w-[95%] !h-fit p-3 relative">
      <div className="w-full">
        <p>{employee.accountName}</p>
      </div>
      <div className="flex flex-row justify-between flex-wrap gap-1 w-full">
        <p className="text-xs flex items-center">Account number: {shortenText(employee.accountNumber, 18)}</p>
        <p className="text-xs flex items-center">Bank: {bankName}</p>
        <p className="text-xs flex flex-col">Amount: <b>{formatCurrency({ num: employee.amount })}</b></p>
      </div>
      <div className="absolute top-[0px] right-[0px] flex gap-2 p-2 justify-center items-center">
        {
          handleEdit &&
          (
            <button onClick={() => handleEdit(employee.id)} className="w-[auto] h-[auto] flex justify-center items-center pointer">
              <img src={icons.editIcon} className="w-[16px] h-[16px]" alt="edit" />
            </button>
          )
        }
        {
          handleRemove &&
          (
            <button onClick={() => handleRemove(employee.id || '')} className="w-auto h-auto flex justify-center items-center pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M15.787 14.7579L9.02831 7.99554L15.787 1.23316C16.0593 0.951224 16.0593 0.504153 15.787 0.222124C15.508 -0.0669215 15.0476 -0.074916 14.7587 0.20427L7.99997 6.96665L1.24132 0.204359C0.959535 -0.0679875 0.512705 -0.0679875 0.230828 0.204359C-0.0580623 0.483545 -0.0660523 0.944206 0.212983 1.23325L6.97163 7.99554L0.212983 14.7578C0.0766172 14.8943 1.81872e-08 15.0793 1.81872e-08 15.2722C-8.88562e-05 15.6741 0.325557 15.9999 0.727198 16C0.920117 16.0002 1.10513 15.9234 1.24132 15.7867L7.99997 9.02443L14.7587 15.7868C14.8949 15.9235 15.08 16.0003 15.2729 16C15.4657 15.9999 15.6505 15.9233 15.7869 15.787C16.071 15.5028 16.0711 15.0421 15.787 14.7579Z" fill="#222222" />
              </svg>
            </button>
          )
        }
      </div>
    </div>
  )
}