export interface IMerchantStore {
  id: number,
  merchant_id: number,
  name: string,
  uuid: string,
  created_at: string,
  updated_at: string
}

export interface IMerchantStoreActionBody {
  name: string
}