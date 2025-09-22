import Button from "@/components/Button";
import { AdvancedSelect } from "@/components/Input";
import Modal from "@/components/Modal";
import { updateBeneficiary } from "@/store/actions/credit/beneficiaries";
import { getDDBanksSalary } from "@/store/actions/credit/salaryWallet";
import { IEmployee, IBank } from "@/utils/type";
import Input from "@/components/Input";
import { Dispatch, SetStateAction, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const initialDataValue = {
  accountName: "",
  amount: "",
  bankCode: "",
  accountNumber: "",
};

interface IAddSingleBeneficiaryModal {
  showManualForm: boolean;
  setShowManualForm: Dispatch<SetStateAction<boolean>>;
  setDataList?: Dispatch<SetStateAction<IEmployee[]>>;
  dataList?: IEmployee[];
  editMode?: boolean;
  editModalData?: IEmployee | null;
  setEditModalData?: Dispatch<SetStateAction<IEmployee | null>>;
  setEditMode?: Dispatch<SetStateAction<boolean>>;
  customOnEditAction?: (data: any, handleDone: () => void) => void;
  customOnEditSideEffect?: () => void;
}

export const AddSingleEmployeeModal = ({
  showManualForm,
  setShowManualForm,
  setDataList,
  dataList,
  editMode = false,
  editModalData = null,
  setEditModalData,
  setEditMode,
  customOnEditAction,
  customOnEditSideEffect,
}: IAddSingleBeneficiaryModal) => {
  const [data, setData] = useState(initialDataValue);
  const [dataValidationError, setDataValidationError] = useState({
    accountName: "",
    amount: "",
    bankCode: "",
    accountNumber: "",
  });
  const [banks, setBanks] = useState<Array<IBank>>([]);

  useEffect(() => {
    getDDBanksSalary(setBanks);
  }, []);

  useEffect(() => {
    if (editMode && editModalData) {
      // @ts-ignore
      setData(editModalData);
    }
  }, [showManualForm, editMode]);


  const handleChange = useCallback((name: string, value: string) => {
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear validation error when user updates the field
    setDataValidationError((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const dataValidityFunc = () => {
    let isValid = true;
    const errors: Record<string, string> = {
      accountName: "",
      amount: "",
      bankCode: "",
      accountNumber: "",
    };

    const doesAccountNumberExist = () => {
      if (dataList && dataList.length > 0) {
        for (let i = 0; i < dataList.length; i++) {
          if (editModalData?.accountNumber !== dataList[i]?.accountNumber && dataList[i]?.accountNumber === data?.accountNumber) {
            return true
          }
        }
      }
      return false
    }

    if (!data.accountName.trim()) {
      errors.accountName = "Employee name is required.";
      isValid = false;
    }

    if (!data.amount || isNaN(Number(data.amount)) || Number(data.amount) <= 0) {
      errors.amount = "Amount must be a positive number.";
      isValid = false;
    }

    if (!data.bankCode.trim()) {
      errors.bankCode = "Please select a bank.";
      isValid = false;
    }

    if (!/^\d{10}$/.test(data.accountNumber)) {
      errors.accountNumber = "Account number must be exactly 10 digits.";
      isValid = false;
    }

    if (doesAccountNumberExist()) {
      errors.accountNumber = "Account number already exists.";
      isValid = false;
    }

    // @ts-ignore
    setDataValidationError(errors);
    return isValid;
  };

  const handleEditSubmit = () => {
    if (!editModalData) return;
    if (!dataValidityFunc()) {
      return;
    }

    const payloadData = {
      // @ts-ignore
      id: parseInt(editModalData.id as unknown as string),
      ...data,
      // @ts-ignore
      listId: editModalData.listId,
    };

    const handleDone = () => {
      setEditModalData && setEditModalData(null);
      setEditMode && setEditMode(false);
      setShowManualForm(false);
      customOnEditSideEffect && customOnEditSideEffect();
    };

    customOnEditAction ? customOnEditAction(payloadData, handleDone) : updateBeneficiary(payloadData, handleDone);
  };

  const handleAddFormSubmit = (action: string) => {
    if (!dataValidityFunc()) {
      return;
    }

    const newArr = [...(dataList || [])];
    // @ts-ignore
    newArr.push({ ...data, id: dataList.length + 1 });
    setDataList && setDataList(newArr);

    if (action === "close") {
      setShowManualForm(false);
    }
    setData(initialDataValue);
    toast.success("Added!");
  };

  return (
    <Modal
      onClose={() => setShowManualForm(false)}
      open={showManualForm}
      title={editMode ? "Edit Item" : "Add Item"}
      className="!w-[95%] max-w-[400px] left-[40%] !h-[95%] !top-[20%] !m-auto sm:!w-[80%] md:!h-fit md:!top-[20%] p-8"
    >
      <div className="w-[100%]">
        <Input
          label="Item Name"
          placeholder="Electricity"
          name="accountName"
          required
          value={data.accountName}
          onChange={handleChange}
          hasError={!!dataValidationError.accountName}
          errorText={dataValidationError.accountName}
        />
        <div className="input-grp-wrapper">
          <Input
            label="Amount"
            placeholder="0"
            type="number"
            name="amount"
            required
            value={data.amount}
            onChange={handleChange}
            hasError={!!dataValidationError.amount}
            errorText={dataValidationError.amount}
          />
          <AdvancedSelect
            label="Bank Name"
            name="bankCode"
            data={[
              { label: "Select a Bank", value: "" },
              ...banks.map((bank) => ({ label: bank.name, value: bank.bankCode })),
            ]}
            value={data.bankCode}
            onChange={handleChange}
            hasError={!!dataValidationError.bankCode}
            errorText={dataValidationError.bankCode}
          />
        </div>
        <Input
          label="Account Number"
          placeholder="Enter 10-digit account number"
          type="text"
          name="accountNumber"
          value={data.accountNumber}
          onChange={handleChange}
          hasError={!!dataValidationError.accountNumber}
          errorText={dataValidationError.accountNumber}
        />
        <div className="w-full flex sm:justify-between gap-5 sm:gap-2 flex-col sm:flex-row mt-5">
          {editMode ? (
            <Button label="Update" type="flat" btnActionType="submit" onClick={handleEditSubmit} />
          ) : (
            <>
              <Button
                label="Save & Add Another"
                type="flat"
                btnActionType="submit"
                overrideStyle={{ margin: 0 }}
                name="more"
                onClick={() => handleAddFormSubmit("more")}
              />
              <Button
                label="Save and Close"
                type="flat"
                btnActionType="submit"
                overrideStyle={{ margin: 0 }}
                name="close"
                onClick={() => handleAddFormSubmit("close")}
              />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
