import { Dispatch, SetStateAction, useEffect, useState } from "react"
import EmployeeCard from "./EmployeeCard";
import toast from "react-hot-toast";
import { AddSingleEmployeeModal } from "./AddSingleEmployeeModal";
import Button from "@/components/Button";
import { useAppSelector } from "@/store/hooks";
import { IEmployee } from "@/utils/type";


interface IAddBeneficiariesList {
  data: IEmployee[];
  setDataList: Dispatch<SetStateAction<IEmployee[]>>;
  saveAs: string;
  setShowManualForm: Dispatch<SetStateAction<boolean>>;
  setIsExcelUploaderOpen: Dispatch<SetStateAction<boolean>>;
  addType?: string;
  handleDone: () => void,
  bankMap: Record<string, string>,
}

export const AddBeneficiariesList = ({
  data,
  setDataList,
  saveAs,
  setShowManualForm,
  setIsExcelUploaderOpen,
  addType,
  handleDone,
  bankMap,
}: IAddBeneficiariesList) => {
  const { isLoading } = useAppSelector(state => state.loader);
  const [list, setList] = useState<Array<IEmployee>>([])
  const [editEmployee, setEditEmployee] = useState(false)
  const [editModalData, setEditModalData] = useState<IEmployee | null>(null)

  useEffect(() => {
    const copy = [...data]
    // @ts-ignore
    setList(copy.reverse())
  }, [data])


  const handleSaveBeneficiaries = () => {
    if (!saveAs) {
      toast.error("Please enter the beneficiary list name before saving.")
      const input = document.getElementById("beneficiary_list_name");
      if (input) {
        input.style.borderColor = "red"
        setTimeout(() => {
          input.style.borderColor = "initial"
        }, 3000);
      }
      return;
    }
    // save beneficiaries
    const reqData = {
      beneficiaryListItems: data,
      saveAs: saveAs
    }
    // @ts-ignore
    addBeneficiary(reqData, (res) => {
      handleDone()
    })
  }

  const handleRemove = (id) => {
    // @ts-ignore
    const newData = data.filter((singleData) => singleData.id.toString() !== id.toString())
    setDataList(newData)
  }

  const handleOpenEditEmployee = (id) => {
    // @ts-ignore
    const dataToEdit = data.find((i) => i.id.toString() === id.toString());
    setEditEmployee(true)
    // @ts-ignore
    setEditModalData(dataToEdit)
  }

  const handleEditAction = (payloadData, handleDone) => {
    const updatedData = data.map(obj =>
      obj.id === payloadData.id ? payloadData : obj
    );
    setDataList(updatedData);
    setEditEmployee(false)
    handleDone()
  }


  return (
    <>
      <div className="w-[100%] h-[55vh] sm:h-[50vh] overflow-y-scroll flex flex-col items-center gap-2">
        {
          list?.reverse().map((employee, index) => {
            return (
              // @ts-ignore
              <EmployeeCard
                key={index}
                employee={employee}
                handleRemove={handleRemove}
                bankName={bankMap[employee.bankCode]}
                handleEdit={handleOpenEditEmployee}
              />
            )
          })
        }
      </div>
      <div className="w-[100%] flex justify-between gap-5">
        {
          addType === "manual"
            ?
            (
              <Button
                label="Add more"
                type="flat"
                btnActionType="submit"
                // disabled={isLoading}
                overrideStyle={{
                  flex: "1",
                  margin: "10px 0"
                }}
                onClick={() => setShowManualForm(true)}
              />
            )
            : addType === "excel" ?
              (
                <Button
                  label="Reupload"
                  type="flat"
                  btnActionType="submit"
                  // disabled={isLoading}
                  overrideStyle={{
                    flex: "1",
                    margin: "10px 0"
                  }}
                  onClick={() => setIsExcelUploaderOpen(true)}
                />
              ) : null
        }

        <Button
          label="Save"
          type="flat"
          btnActionType="submit"
          disabled={isLoading}
          overrideStyle={{
            flex: "1",
            margin: "10px 0"
          }}
          onClick={handleSaveBeneficiaries}
        />
      </div>
      <AddSingleEmployeeModal
        dataList={list}
        setDataList={setDataList}
        showManualForm={editEmployee}
        setShowManualForm={setEditEmployee}
        editMode={true}
        editModalData={editModalData}
        setEditModalData={setEditModalData}
        customOnEditAction={handleEditAction}
      />
    </>
  )
}