import { FormEvent, useEffect, useState } from "react"
import Input, { AdvancedSelect, Select as SelectComponent } from '../../../../../../components/Input';
import { formatCurrency } from "@/utils/common";
import Button from "@/components/Button";
import useVerificationDone from "@/hooks/useVerificationDone";
import { getBeneficiaries, getBeneficiariesList } from "@/store/actions/credit/beneficiaries";
import { createSchedule, getPaymentHistory } from "@/store/actions/credit/payments";
import { getDebitAccountsSalary } from "@/store/actions/credit/salaryWallet";
import { getWallet } from "@/store/actions/credit/wallet";
import { useAppSelector } from "@/store/hooks";
import { months, years } from "@/utils/data";
import { BeneficiariesListType } from "@/utils/type";
import dayjs from "dayjs";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import ConfigureDirectDebit from "../../payment_methods/components/DirectDebit/ConfigureDirectDebit";
import WalletFundAccountModal from "../../payment_methods/components/Wallet/WalletFundAccountModal";
import Modal from "@/components/Modal";


const Step1 = () => {
    return (
        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.5 3C25.0608 3 27.5965 3.50438 29.9623 4.48435C32.3282 5.46432 34.4778 6.90068 36.2886 8.71142C38.0993 10.5222 39.5357 12.6718 40.5157 15.0377C41.4956 17.4035 42 19.9392 42 22.5C42 25.0608 41.4956 27.5965 40.5156 29.9623C39.5357 32.3282 38.0993 34.4778 36.2886 36.2886C34.4778 38.0993 32.3282 39.5357 29.9623 40.5157C27.5965 41.4956 25.0608 42 22.5 42C19.9392 42 17.4035 41.4956 15.0377 40.5156C12.6718 39.5357 10.5222 38.0993 8.71141 36.2886C6.90067 34.4778 5.46431 32.3282 4.48435 29.9623C3.50438 27.5965 3 25.0608 3 22.5C3 19.9392 3.50439 17.4035 4.48435 15.0377C5.46432 12.6718 6.90068 10.5222 8.71143 8.71141C10.5222 6.90067 12.6718 5.46431 15.0377 4.48434C17.4035 3.50438 19.9392 3 22.5 3L22.5 3Z" stroke="#F55F64" strokeOpacity="0.15" strokeWidth="6"/>
            <path d="M22.5 3C26.3567 3 30.1269 4.14366 33.3336 6.28634C36.5404 8.42903 39.0397 11.4745 40.5157 15.0377C41.9916 18.6008 42.3777 22.5216 41.6253 26.3043C40.8729 30.0869 39.0157 33.5615 36.2886 36.2886" stroke="#F55F64" strokeWidth="6"/>
        </svg>
    )
}

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

const paymentMethodMap = {
  "Wallet": "wallet",
  "Card payment": "Card",
  "Direct debit": "DirectDebit",
  'Cheque deposit': 'OfflinePayment'
}

const CreateMandate = ({ handleClose, beneficiariesListId, renderCancel }: any) => {
    const [step, setStep] = useState<number>(1);
    const [data, setData] = useState({
        saveBeneficiaryAs: '',
        beneficiaryListId: 0,
        period: '',
        periodYear: '',
        periodMonth: '',
        paymentOption: '',
        sourceAccountId: '',
        beneficiary: '',
        beneficiaries: [],
        saveBeneficiaries: true,
        narration: '',
    });
    const stepper: Record<number, any> = {
        1: {
            title: 'Product Information',
            Icon: Step1,
            formTitle: 'Create payment'
        },
    }
    const currentStep = stepper[step];
    const Icon = currentStep.Icon;

    const handleStep1Submit = (event: FormEvent) => {
        event.preventDefault();
        setStep(2);
    }

    const walletCharge = 0;
    const [showAccDetails, setShowAccDetails] = useState(false);
    const { isVerificationDone } = useVerificationDone();
    const [viewList, setViewList] = useState(false);
    const [insufficientFund, setValue] = useState(false);
    const [wallet, setWallet] = useState(0);
    const [isOpenExcelUploader, setIsOpenExcelUploader] = useState(false);
    const beneficiaryList = useAppSelector((state) => state.employees.beneficiariesList);
    const [ddAccounts, setDDAccounts] = useState([]);
    const [openDDCreate, setOpenDDCreate] = useState(false);
    const beneficiariesSource = beneficiaryList.filter((itm: BeneficiariesListType) => itm.beneficiaryCount > 0);

    const getDDAccounts = () => {
        getDebitAccountsSalary((resp: any) => {
        setDDAccounts(resp.data);
        }, true)
    }

    useEffect(() => {
        getDDAccounts();
    }, []);

    const getWalletDetails = () => {
        getWallet((data) => {
            setWallet(data.availableBalance);
        });
    }
  
    useEffect(() => {
      getWalletDetails();
    }, []);

      const fetchBeneficiaries = (id: any) => {
        getBeneficiaries(id, true, (resp) => {
          setData((prevState) => ({
            ...prevState,
            beneficiaries: resp.data.data
          }));
        });
      }

    useEffect(() => {
      if (data.paymentOption === 'Wallet') {
        const insufficientFund = (getTotal(data.beneficiaries) + walletCharge) > wallet;
        setValue(insufficientFund);
      } else {
        setValue(false);
      }
    }, [data.beneficiaries, data.paymentOption])
  
    useEffect(() => {
      if (beneficiariesListId) {
        setData((prevState) => ({
          ...prevState,
          beneficiaryListId: parseInt(beneficiariesListId),
          beneficiary: beneficiariesListId,
        }));
        fetchBeneficiaries(parseInt(beneficiariesListId));
      }
    }, [beneficiariesListId]);

    const getTotal = (dataArr: any) => {
      return dataArr.reduce((total: number, employee: any) => {
        total += (employee.amount || 0);
        return total;
      }, 0);
    }
  
    const validateWalletFund = () => {
      const insufficientFund = (getTotal(data.beneficiaries) + walletCharge) > wallet;
      setValue(insufficientFund);
    }

  useEffect(() => {
    if (beneficiariesListId) {
      setData((prevState) => ({
        ...prevState,
        beneficiaryListId: parseInt(beneficiariesListId),
        beneficiary: beneficiariesListId,
      }));
    }
  }, [beneficiariesListId]);

  useEffect(() => {
    if (beneficiaryList.length === 0 && isVerificationDone) {
      getBeneficiariesList(true);
    }
  }, [isVerificationDone]);
  const handleChange = (name: string, value: string) => {
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    if (name === 'beneficiary' && value === 'Upload new employees') {
      setIsOpenExcelUploader(true);
    } else if (name === 'beneficiary') {
      setData((prevState) => ({
        ...prevState,
        beneficiaryListId: parseInt(value)
      }));
      fetchBeneficiaries(parseInt(value));
    }
    if ((name === 'paymentOption' && value === 'Wallet') || (name === 'beneficiary' && data.paymentOption === 'Wallet')) {
      validateWalletFund()
    } else if (name === 'paymentOption') {
      setValue(false);
    }
    if (name === "sourceAccountId" && value === "Configure new account") {
      setOpenDDCreate(true)
    }
  }

  const handleAddFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const newData = { ...data };
    newData.period = dayjs(`${data.periodMonth} ${data.periodYear}`).format('MMM YYYY');
    // @ts-ignore
    newData.paymentOption = paymentMethodMap[newData.paymentOption];
    // @ts-ignore
    newData.sourceAccountId = ddAccounts.find((itm) => itm.accountNumber === data.sourceAccountId)?.id;
    if (data.beneficiary === 'Upload new employees') {
      // @ts-ignore
      delete newData.beneficiaryListId
    } else {
      // @ts-ignore
      delete newData.beneficiaries
    }
    // @ts-ignore
    delete newData.beneficiary;
    newData.saveBeneficiaries = !!newData.saveBeneficiaryAs;
    createSchedule(newData, (resp) => {
      getPaymentHistory('', true);
      renderCancel && renderCancel();
    })
  }

  const removeItem = (id: string) => {
    // @ts-ignore
    const newItems = data.beneficiaries.filter((itm) => itm.staffId !== id);
    setData((prev) => ({
      ...prev,
      beneficiaries: newItems
    }))
  };


  const dataSource = beneficiariesSource.map((itm: BeneficiariesListType) => ({
    label: `${itm.listName} with ${itm.beneficiaryCount} ${itm.beneficiaryCount === 1 ? 'employee' : 'employees'}`,
    value: itm.listId
  }));

  const handleDone = () => {
    getDDAccounts();
    setData((prev) => ({ ...prev, sourceAccountId: "" }))
    setOpenDDCreate(false);
  }
    return (
        <div className="w-screen h-screen bg-[#F9F9F9]">
            <div className="h-20 w-screen bg-white drop-shadow-sm px-12 flex flex-row justify-between items-center">
                <button onClick={handleClose} className="flex flex-row">
                    <svg className="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.25 12.2744L19.25 12.2744" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.2998 18.299L4.2498 12.275L10.2998 6.25" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Go back
                </button>
                <div className="flex flex-row justify-end items-center">
                    <div className="flex flex-col justify-center items-end mr-2">
                        <span>Step {step}/1</span>
                        <span>{currentStep.title}</span>
                    </div>
                    <Icon />
                </div>
            </div>
            <div className="m-auto max-w-[450px] w-[90vw] bg-white max-h-[800px] h-fit mt-8 rounded-2xl px-8 py-6"> 
                <h2 className="w-full text-center text-pretty mb-2">{currentStep.formTitle}</h2>
                { step === 1 && (
                    <form onSubmit={handleStep1Submit}>
                         <AdvancedSelect
                            data={[...dataSource, { label: 'Upload new employees', value: 'Upload new employees' }]}
                            label="Select employee list"
                            placeholder=""
                            name="beneficiary"
                            required
                            value={data.beneficiary}
                            onChange={handleChange}
                        />
                        {
                            data.beneficiaries.length ? (
                            <div className='flex flex-row justify-between w-full'> 
                                <p className='text-sm w-full font-bold text-center'>{data.beneficiaries.length} {data.beneficiaries.length > 1 ? 'beneficiaries' : 'beneficiary'} with {formatCurrency({ num: getTotal(data.beneficiaries) })} total payment.</p>
                            </div>
                            ) : null
                        }
                        {
                            viewList ? (
                            <div className="!h-[500px] w-full overflow-auto flex flex-col">
                                {
                                data?.beneficiaries?.map((item: any) => (
                                    <div key={item.id} className="border border-az-teal !h-fit p-3 my-2 relative">
                                    <div className="flex flex-row justify-between w-full">
                                        <p>{item.employeeName} [{item.staffId}]</p>
                                    </div>
                                    <p className="text-xs mb-2">{item.rsapin}</p>
                                    <p className="mb-2">{formatCurrency({ num: item.total })}</p>
                                    <div className="flex flex-row justify-between w-full">
                                        <p className="text-xs flex flex-col">Nor. Contr. Employer: <b>{formatCurrency({ num: item.normalContributionEmployer })}</b></p>
                                        <p className="text-xs flex flex-col">Nor. Contr. Employee: <b>{formatCurrency({ num: item.normalContributionEmployee })}</b></p>
                                    </div>
                                    <div className="flex flex-row justify-between w-full">
                                        <p className="text-xs flex flex-col">Vol. Contr. Employer: <b>{formatCurrency({ num: item.voluntaryContributionEmployer })}</b></p>
                                        <p className="text-xs flex flex-col">Vol. Contr. Employee: <b>{formatCurrency({ num: item.voluntaryContributionEmployee })}</b></p>
                                    </div>
                                    <button onClick={() => removeItem(item.staffId)} className="absolute w-10 h-10 flex justify-center items-center top-[0px] right-[0px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M15.787 14.7579L9.02831 7.99554L15.787 1.23316C16.0593 0.951224 16.0593 0.504153 15.787 0.222124C15.508 -0.0669215 15.0476 -0.074916 14.7587 0.20427L7.99997 6.96665L1.24132 0.204359C0.959535 -0.0679875 0.512705 -0.0679875 0.230828 0.204359C-0.0580623 0.483545 -0.0660523 0.944206 0.212983 1.23325L6.97163 7.99554L0.212983 14.7578C0.0766172 14.8943 1.81872e-08 15.0793 1.81872e-08 15.2722C-8.88562e-05 15.6741 0.325557 15.9999 0.727198 16C0.920117 16.0002 1.10513 15.9234 1.24132 15.7867L7.99997 9.02443L14.7587 15.7868C14.8949 15.9235 15.08 16.0003 15.2729 16C15.4657 15.9999 15.6505 15.9233 15.7869 15.787C16.071 15.5028 16.0711 15.0421 15.787 14.7579Z" fill="#222222" />
                                        </svg>
                                    </button>
                                    </div>
                                ))
                                }
                            </div>
                            ) : null
                        }
                        <div className="input-grp-wrapper relative flex flex-row justify-between items-center w-full gap-4">
                            <SelectComponent
                                data={months}
                                label="Payment month"
                                placeholder=""
                                name="periodMonth"
                                required
                                value={data.periodMonth}
                                onChange={handleChange}
                            />
                            <SelectComponent
                                data={years as unknown as string[]}
                                label="Payment year"
                                placeholder=""
                                name="periodYear"
                                required
                                value={data.periodYear}
                                onChange={handleChange}
                            />
                        </div>
                        <SelectComponent
                            data={['Wallet', 'Direct debit', 'Card payment', 'Cheque deposit']}
                            label="Payment option"
                            placeholder=""
                            name="paymentOption"
                            required
                            value={data.paymentOption}
                            onChange={handleChange}
                        />
                        {
                            data.paymentOption === 'Card payment' && (
                            <p className='text-sm my-5 font-bold text-center'> <span className='text-[red]'>*</span> Please note, all salary payments via card payments are settled after 48 hours.</p>
                            )
                        }
                        {
                            (insufficientFund && data.paymentOption === 'Wallet') && (
                            <p className='text-sm my-5 font-bold text-center flex flex-col justify-center items-center'>
                                Insufficient wallet fund.
                                Current balance is {formatCurrency({ num: wallet })}.
                                Total salary payment is {formatCurrency({ num: getTotal(data.beneficiaries) })}
                                <button
                                type='button'
                                onClick={() => setShowAccDetails(true)}
                                className='block bg-az-teal text-white px-2'
                                >Fund Wallet</button>
                            </p>
                            )
                        }
                        {
                            data.paymentOption === 'Direct debit' && (
                                <SelectComponent
                                    data={[...ddAccounts.map((itm: any) => (itm.accountNumber)), "Configure new account"]}
                                    label="Select debit account"
                                    placeholder=""
                                    name="sourceAccountId"
                                    required
                                    value={data.sourceAccountId}
                                    onChange={handleChange}
                                />
                            )
                        }
                        {
                            data.beneficiary === 'Upload new employees' ? (
                                <Input
                                    label="Save employees as"
                                    placeholder="Name"
                                    name="saveBeneficiaryAs"
                                    type='string'
                                    value={data.saveBeneficiaryAs}
                                    onChange={handleChange}
                                />
                            ) : null
                        }
                        <Input
                            label="Payment narration"
                            placeholder="Name"
                            name="narration"
                            type='string'
                            value={data.narration}
                            onChange={handleChange}
                        />
                        <Button
                            label="Create"
                            type="flat"
                            btnActionType="submit"
                            overrideStyle={{
                            padding: '10px',
                            marginBottom: '10px'
                            }}
                        />
                    </form>
                )}
                <ReactSpreadsheetImport
                    isOpen={isOpenExcelUploader}
                    onClose={() => setIsOpenExcelUploader(false)}
                    onSubmit={(data) => {
                        // @ts-ignore
                        setData((prevData) => ({
                        ...prevData,
                        beneficiaries: data.validData
                        }))
                    }}
                    fields={fields}
                />
                <WalletFundAccountModal
                    showAccDetails={showAccDetails}
                    setShowAccDetails={setShowAccDetails}
                    handleGetWalletDetails={getWalletDetails}
                />
                <Modal
                    onClose={() => setOpenDDCreate(false)}
                    open={openDDCreate}
                    title={""}
                     overrideStyle={{
                        maxWidth: '450px',
                        width: '90%',
                        height: '65vh',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        left: '0',
                        right: '0',
                        top: '5%',
                        borderRadius: '20px'
                    }}
                >
                    <ConfigureDirectDebit handleDone={handleDone} />
                </Modal>
            </div>
        </div>
    );
};

export default CreateMandate;
