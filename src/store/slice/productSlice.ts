import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductDTO {
    documentId: 1,
    documentName: string,
    description: string,
    dateUploaded: string,
    documentStatus: 'UnderReview' | '',
    requiredFormat: string,
    uploadedFileName: string,
    remarks: string
}

interface ProductState {
  showVerificationPending: boolean,
  productData: {
    callbackUrl: string | null,
    callbackEnabled: boolean,
    productName: string,
    productType: string,
    status: "Development" | "Production",
    productKycDetailsDtos: ProductDTO[] | [],
  }
}

const initialState: ProductState = {
  showVerificationPending: true,
  productData: {
    callbackUrl: null,
    callbackEnabled: false,
    productName: '',
    productType: '',
    status: "Development",
    productKycDetailsDtos: [],
  }
}

export const productSlice = createSlice({
  name: "ProductData",
  initialState,
  reducers: {
    addProduct:(state, action)=>{
      state.productData = action.payload;
    },
    setShowVerificationPending: (state, action: PayloadAction<boolean>) => {
        state.showVerificationPending = action.payload;
    },
  },
})

export const {
  addProduct,
  setShowVerificationPending,
} = productSlice.actions;

export default productSlice.reducer;
