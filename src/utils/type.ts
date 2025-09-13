export interface IUserCard {
  id: string;
  username: string;
  email: string;
  hasPaid: boolean;
  expense: any;
  user: any;
  paid: number;
  payable: number;
  amtPaid: number;
  isMine: boolean;
  hasReminderLink?: boolean;
  type?: 'RefundMe' | 'Kontribute' | 'Ajo Klub' | 'Transaction';
  handleEdit?: (val: string, id: string) => void;
  refetchMembers?: any,
  status?: 'accept' | 'reject' | null;
  collectingMember?: null | Record<string, any>;
  paymentMap?: null | Record<string, any>;
  userPayment?: Record<string, any>;
  membersOnly?: boolean;
}

export type IHandleDone = (data?: any) => void
export type IHandleError = () => void

export interface IAddBeneficiaryReqData {
  beneficiaryListItems: IBeneficiary[];
  saveAs: string
}

export interface IBneficiariesList {
  beneficiaryCount: number;
  dateCreated: string;
  listId: number;
  listName: string;
}
export interface IBeneficiary {
  employeeName: string;
  normalContributionEmployee: number;
  normalContributionEmployer: number;
  voluntaryContributionEmployee: number;
  voluntaryContributionEmployer: number;
  pfaCode: string;
  rsapin: string;
  staffId: string;
  otherContribution: string;
  id: number;
}

export interface IEmployee {
  accountName: string;
  accountNumber: string;
  bankCode: string;
  amount: number;
  id: string;
}

export type AccordionData = {
  title: string;
  name: string;
  description: string;
  paid?: number;
  amount: number;
  splittingFormula: string;
  members: Array<Record<string, string | number>>,
}

interface SubCategoryData {
  name: string
}

export type CategoryAccordionData = {
  name: string;
  subCategories?: Array<Record<string, string | any>>
}

export interface Reason {
  title: string;
  details: string;
  img: string;
  bg: string;
  tagline?: string;
}

export type IBlogs = {
  publishedAt: string;
  updatedAt: string;
  createdAt: string;
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  stage: string;
  coverImage: {
      width: string;
      height: string;
      url: string;
  }
  author: {
      name: string;
      picture: {
          width: string;
          height: string;
          url: string;
      }
  }
}

export type BeneficiariesListType = {
  beneficiaryCount: number,
  dateCreated: string,
  listId: number,
  listName: string,
};

export type PFAListType = {
  pfaCode: string,
  pfaName: string,
}

export interface IBank {
  bankCode: string,
  name: string,
}

export interface DataObj {
  icon: string,
  title: string,
  value: string | null | number,
  bgColor: string,
  ledgerAction?: '',
  ledgerText?: string,
  link: string,
  actionLabel?: string,
}

