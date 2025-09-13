import { documents, icons } from '@/assets';
import { getDDBanksSalary } from '@/store/actions/credit/salaryWallet';
import { IEmployee, IBank } from '@/utils/type';
import Input from '@/components/Input';
import { useCallback, useEffect, useState } from 'react';
import { AddBeneficiariesList } from './AddEmployeesList';
import { AddSingleEmployeeModal } from './AddSingleEmployeeModal';
import { ReactSpreadsheetImport } from "react-spreadsheet-import";


const AddEmployees = ({ data, handleDone }: { data?: IEmployee[], handleDone: () => void }) => {
  const [addType, setType] = useState<'manual' | 'excel'>('manual');
  const [showManualForm, setShowManualForm] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const [listName, setListName] = useState({
    saveAs: ""
  })
  const [dataList, setDataList] = useState<IEmployee[]>(data ? data : []);
  const [banks, setBanks] = useState<Array<IBank>>([]);
  
  useEffect(() => {
    getDDBanksSalary(setBanks);
  }, []);

  const isActive = (typ: 'manual' | 'excel') => {
    return typ === addType ? 'text-white bg-peth-red' : 'text-peth-red bg-white';
  };

  const fields = [
    {
      // Visible in table header and when matching columns.
      label: "EmployeeName",
      // This is the key used for this field when we call onSubmit.
      key: "accountName",
      // Allows for better automatic column matching. Optional.
      alternateMatches: [],
      // Used when editing and validating information.
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
      // Used in the first step to provide an example of what data is expected in this field. Optional.
      example: "Stephanie Adaku Hassan",
      // Can have multiple validations that are visible in Validation Step table.
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "EmployeeName is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error",
        },
      ],
    },
    {
      // Visible in table header and when matching columns.
      label: "amount",
      // This is the key used for this field when we call onSubmit.
      key: "amount",
      // Allows for better automatic column matching. Optional.
      alternateMatches: [],
      // Used when editing and validating information.
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
      // Used in the first step to provide an example of what data is expected in this field. Optional.
      example: "1000",
      // Can have multiple validations that are visible in Validation Step table.
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "NormalContributionEmployee is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error",
        },
      ],
    },
    {
      // Visible in table header and when matching columns.
      label: "bankCode",
      // This is the key used for this field when we call onSubmit.
      key: "bankCode",
      // Allows for better automatic column matching. Optional.
      alternateMatches: [],
      // Used when editing and validating information.
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
      // Used in the first step to provide an example of what data is expected in this field. Optional.
      example: "100",
      // Can have multiple validations that are visible in Validation Step table.
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "NormalContributionEmployer is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error",
        },
      ],
    },
    {
      // Visible in table header and when matching columns.
      label: "accountNumber",
      // This is the key used for this field when we call onSubmit.
      key: "accountNumber",
      // Allows for better automatic column matching. Optional.
      alternateMatches: [],
      // Used when editing and validating information.
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
      // Used in the first step to provide an example of what data is expected in this field. Optional.
      example: "1000000001",
      // Can have multiple validations that are visible in Validation Step table.
      validations: [
      ],
    },
  ] as const;

  const onClose = () => {
    setIsOpen(false);
  };

  const getBanksMap = useCallback(() => {
    const obj = {};
    banks.forEach((bank) => {
      obj[bank.bankCode] = bank.name;
    });
    return obj;
  }, [banks]);

  const onSubmit = (data: any) => {
    const validData = data.validData.map((singleData, index) => {
      return {
        id: index + 1,
        accountName: singleData.accountName,
        amount: singleData.amount,
        bankCode: singleData.bankCode,
        accountNumber: singleData.accountNumber
      }
    });
    setDataList(validData)
    setIsOpen(false);
  }

  const handleChange = useCallback((name: string, value: string) => {
    setListName((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  return (
    <div className=" w-full h-full flex flex-col justify-between">
      <div className='flex flex-col justify-center items-start'>
        <h3 className='text-3xl text-center'>Create Payment Item</h3>
      </div>
      <div className='py-5 flex w-full flex-col flex-grow flex-auto items-center'>
        <div className='h-fit mb-5 w-full'>
          <button className={`w-6/12 py-2 h-full rounded-tl-md rounded-bl-md border border-peth-red ${isActive('manual')}`} type="button" onClick={() => {
            setType('manual');
            setIsOpen(false);
            setDataList([])
          }}>Manually</button>
          <button className={`w-6/12 py-2 h-full rounded-tr-md rounded-br-md border border-peth-red ${isActive('excel')}`} type="button" onClick={() => {
            setType('excel');
            setIsOpen(false);
            setDataList([])
          }}>With Excel</button>
        </div>

        {
          addType === 'excel' &&
          (
            <a className='w-full ' href={documents.employees_template} download={`employees_templatee-${Date.now()}.xlsx`} target='__blank'>
              <button className={`w-full px-10 py-2 rounded-md text-peth-red border border-peth-red flex items-center justify-center gap-1`} type="button">
                <img src={icons.download} alt="download" />
                Download excel template</button>
            </a>
          )
        }

        <Input
          label="What should we call this list?"
          placeholder="Recurring Expenses"
          name="saveAs"
          required
          value={listName.saveAs}
          onChange={handleChange}
          id='beneficiary_list_name'
        />
        {
          addType === 'manual' ? (
            <div className='w-full flex flex-col items-center'>
              {
                dataList.length < 1 &&
                (
                  <div className='w-full mb-3'>
                    <button className={`w-full h-full px-10 py-3 rounded-md border-peth-red bg-peth-red text-white`} type="button" onClick={() => {
                      setShowManualForm(true);
                    }}>Open Manual Form</button>
                  </div>
                )
              }
            </div>
          ) : (
            <div className={`w-full flex flex-col items-center`}>
              {
                dataList.length < 1 &&
                (
                  <div className='w-full h-full flex flex-col gap-2 justify-between'>
                    <button className={`w-full px-10 py-3 rounded-md border-peth-red ${isActive('excel')}`} type="button" onClick={() => {
                      setIsOpen(true);
                    }}>Open Excel Uploader</button>
                  </div>
                )}

              <ReactSpreadsheetImport
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={onSubmit}
                fields={fields}
              />
            </div>
          )
        }
        {
          dataList.length > 0 &&
          (
            <AddBeneficiariesList
              addType={addType}
              saveAs={listName.saveAs}
              setShowManualForm={setShowManualForm}
              setIsExcelUploaderOpen={setIsOpen}
              data={dataList}
              setDataList={setDataList}
              handleDone={handleDone}
              bankMap={getBanksMap()}
            />
          )
        }
      </div>

      <AddSingleEmployeeModal dataList={dataList} setDataList={setDataList} showManualForm={showManualForm} setShowManualForm={setShowManualForm} />
    </div>
  );
};

export default AddEmployees;
