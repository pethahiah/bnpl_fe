export interface IMerchantBankAccount {
  id: number,
  store_id: number,
  account_name: string,
  account_number: string,
  bank_name: string,
  bank_code: string,
  created_at: string,
  updated_at: string
}

export interface IMerchantBankAccountActionBody {
  store_id: number,
  account_name: string;
  account_number: string;
  bank_name: string;
  bank_code: string;
  reference_id?: string;
}