import { createSlice } from '@reduxjs/toolkit'
import { logout } from './authSlice';

export interface Participants {
  id: number;
  email: string;
}

export interface UserGroup {
  name: string;
  description: string;
  uique_code: string;
  amount: number;
  user_id: number;
  id: number;
  participants?: Participants[];
}

export interface UserGroupObj {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
  data: UserGroup[];
}

export interface IAjo {
  id: number,
  name: string,
  description: string,
  starting_date: string,
  frequency: string,
  cycle: string,
  amount_per_member: number,
  member_count: number,
  uique_code: string,
  user_id: number,
  created_at: string,
}

export interface IAjoInvitation {
  getAuthUserInvitationCreated: {
    data: Array<IAjo>;
    first_page_url: string;
    from: number,
    last_page: 1,
    last_page_url: string,
    next_page_url: string,
    path: string,
    per_page: number,
    prev_page_url: string,
    to: number,
    total: number,
    current_page: number,
  },
  getInvitationInvitedTo: {
    data: Array<IAjo>;
    first_page_url: string;
    from: number,
    last_page: 1,
    last_page_url: string,
    next_page_url: string,
    path: string,
    per_page: number,
    prev_page_url: string,
    to: number,
    total: number,
    current_page: number,
  },
}

export interface ajoObj {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
  data: IAjo[];
}

export interface SubCategry {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  subCategories?: SubCategry[];
}

export type SubCategoryObj = Record<string, SubCategry[]>

export interface Expense {
  name: string;
  amount: number;
  category_id: number;
  subcategory_id: number;
  id: number;
  expense_id: number;
  title: string;
  payable: number;
  userGroup?: Array<Record<string, any>>;
}

export interface ISplitFormula {
  id: number;
  split: string;
}

export interface IUser {
  id: number;
  email: string;
}

export type balanceObj = Record<string, Record<string, number>>;


interface DashboardState {
  showNav: boolean;
  expensesCount: number;
  awaitingFulfilment: Expense[] | null;
  awaitingRe: Expense[] | null;
  expensesMetaData: Record<string, any>;
  draftRefund: Record<string, any>;
  draftKontribute: Record<string, any>;
  allExpenses: Expense[] | null;
  allUserGroups: UserGroup[] | null;
  userGroups: UserGroupObj | null;
  openUserGroups: UserGroupObj | null;
  categories: Category[] | null;
  subCategoryObj: SubCategoryObj;
  splitFormula: ISplitFormula[] | null;
  users: IUser[] | null;
  subcategories: SubCategry[] | null;
  expensesUsers: Record<string, Array<Record<string, string | number>>> | {};
  userGroupsUsers: Record<string, Array<Record<string, string | number>>> | {};
  expenseBalanceObj: balanceObj | {};
  userGroupBalanceObj: balanceObj | {};
  issues: Array<Record<string, any>> | null;
  ajo: ajoObj | null;
  ajoInvitation: IAjoInvitation | null;
}

const initialState: DashboardState = {
  showNav: true,
  expensesCount: 0,
  awaitingFulfilment: null,
  awaitingRe: null,
  allExpenses: null,
  draftRefund: {},
  draftKontribute: {},
  expensesMetaData: {},
  allUserGroups: null,
  categories: null,
  subCategoryObj: {},
  splitFormula: null,
  users: null,
  subcategories: null,
  userGroups: null,
  openUserGroups: null,
  expensesUsers: {},
  userGroupsUsers: {},
  expenseBalanceObj: {},
  userGroupBalanceObj: {},
  issues: null,
  ajo: null,
  ajoInvitation: null,
}

export const custodianSlice = createSlice({
  name: 'dasboard',
  initialState,
  reducers: {
    addSplitFormula: (state, action) => {
      state.splitFormula = action.payload;
    },
    addUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users?.push(action.payload);
    },
    addExpenses: (state, action) => {
      state.allExpenses = action.payload;
    },

    addSubCategory: (state, action) => {
      const newSubCatObj = {...state.subCategoryObj}
      if (newSubCatObj[action.payload.categoryId]) {
        newSubCatObj[action.payload.categoryId] = [...newSubCatObj[action.payload.categoryId], action.payload.data];
      } else {
        newSubCatObj[action.payload.categoryId] = [action.payload.data]
      }
      state.subCategoryObj = newSubCatObj;
    },
    updateExpensesMetaData: (state, action) => {
      state.expensesMetaData = action.payload;
    },
    addExpense: (state, action) => {
      // @ts-ignore
      state.expensesMetaData?.getAuthUserExpensesCreated?.data.push(action.payload)
    },
    addUserToExpense: (state, action) => {
      if (state.expensesUsers[action.payload?.expenseId]) {
        state.expensesUsers[action.payload?.expense_id].push(action.payload.data);
      } else {
        state.expensesUsers[action.payload?.expense_id] = [action.payload.data];
      }
    },
    removeUserFromExpense: (state) => {
      state = {...state};
    },
    deleteExpense: (state, action) => {
      // eslint-disable-next-line array-callback-return
      const newAllExpenses = state.expensesMetaData?.getAuthUserExpensesCreated?.data.filter((expense) => {
        if (expense.id !== action.payload.id) {
          return expense
        }
      })
      state.expensesMetaData.getAuthUserExpensesCreated.data = newAllExpenses || null;
    },

    deleteGroup: (state, action) => {
      // @ts-ignore
      // eslint-disable-next-line array-callback-return
      const newAllGroups = state.userGroups?.getAuthUserGroupsCreated.data.filter((expense) => {
        if (expense.id !== action.payload.id) {
          return expense
        }
      })
      // @ts-ignore
      state.userGroups.getAuthUserGroupsCreated.data = newAllGroups;
    },
  
    updateExpense: (state, action) => {
      // @ts-ignore
      let newRefundArr = state.expensesMetaData?.getAuthUserExpensesCreated?.data;
      newRefundArr = newRefundArr.map((refund) => {
        if (refund.id === action.payload.id) {
          return action.payload;
        }
        return refund;
      });
      // @ts-ignore
      state.expensesMetaData.getAuthUserExpensesCreated.data = newRefundArr;
    },

    updateRefundMember: (state, action) => {
      const currentMembers = state.expensesUsers[action.payload.expenseId];
      const newMembers = currentMembers.map((member) => {
        if (member.id === action.payload.id) {
          const newMember = {...member};
          newMember.email = action.payload.email;
          return newMember;
        }
        return member;
      });
      state.expensesUsers[action.payload.expenseId] = [...newMembers];
    },

    updateKontributeMember: (state, action) => {
      let currentMembers = state.userGroupsUsers[action.payload.groupId];
      currentMembers = currentMembers.map((member) => {
        if (member.id === action.payload.id) {
          const newMember = {...member};
          newMember.email = action.payload.email;
          return newMember;
        }
        return member;
      });
      state.userGroupsUsers[action.payload.groupId] = [...currentMembers];
    },

    addCategory: (state, action) => {
      state.categories?.push(action.payload.data);
    },
    deleteCategory: (state, action) => {
      const newCates = state.categories?.filter((item) => item.id !== action.payload.categoryId);
      state.categories = newCates || null;
    },

    updateCategory: (state, action) => {
      const updatedCate = state.categories?.map((category) => {
        if (category.id === action.payload.data.id) {
          return action.payload.data
        }
        return category;
      })
      state.categories = updatedCate || null;
    },

    addCategories: (state, action) => {
      state.categories = action.payload;
    },
    
    addSubCategories: (state, action) => {
      const newCategories = state.categories?.map((category) => {
        if (category.id === action.payload.categoryId) {
          category.subCategories = action.payload.data
        }
        return category;
      })
      const newSubCatObj = {...state.subCategoryObj}
      newSubCatObj[action.payload.categoryId] = action.payload.data;
      state.subCategoryObj = newSubCatObj;
      state.categories = newCategories || null;
    },

    updateSubCategory: (state, action) => {
      const newSubCatObj = state.subCategoryObj;
      let newCatSubCates = newSubCatObj[action.payload.categoryId];
      newCatSubCates = newCatSubCates.map((subCat) => {
        if (subCat.id === action.payload.data.id) {
          return action.payload.data;
        }
        return subCat;
      })
      state.subCategoryObj[action.payload.categoryId] = newCatSubCates;
    },

    deleteSubCategory: (state, action) => {
      let newSubCates = [...state.subCategoryObj[action.payload.categoryId]];
      newSubCates = newSubCates?.filter((item) => item.id !== action.payload.subCategoryId)
      state.subCategoryObj[action.payload.categoryId] = newSubCates;
    },

    addUserGroup: (state, action) => {
      // @ts-ignore
      state.userGroups?.getAuthUserGroupsCreated?.data.push(action.payload);
    },
    addUserGroups: (state, action) => {
      state.userGroups = action.payload;
    },
    addOpenUserGroups: (state, action) => {
      state.openUserGroups = action.payload;
    },
    addParticipantToGroup: (state, action) => {
      if (state.userGroupsUsers[action.payload.groupId]) {
        state.userGroupsUsers[action.payload.groupId].push(action.payload);
      } else {
        state.userGroupsUsers[action.payload.groupId] = [action.payload];
      }
    },
    removeParticipantToGroup: (state) => {
      state = {...state};
    },
    addExpenseMembers: (state, action) => {
      state.expensesUsers[action.payload.expenseId] = action.payload.members; 
    },
    addUserGroupMembers: (state, action) => {
      state.userGroupsUsers[action.payload.groupId] = action.payload.members;
    },
    updateExpenseBalance: (state, action) => {
      state.expenseBalanceObj[action.payload.expenseId] = {
        payed: action.payload.data["Total Amount Payed"],
        balance: action.payload.data.Balance,
      };
    },
    updateGroupBalance: (state, action) => {
      state.userGroupBalanceObj[action.payload.groupId] = {
        payed: action.payload.data["Total Amount Payed"],
        balance: action.payload.data.Balance,
      };
    },
    updateIssue: (state, action) => {
      if (state.issues) {
        // @ts-ignore
        state.issues.data.push(action.payload.data)
      } else {
        state.issues = [action.payload.data]
      }
    },
    addIssues: (state, action) => {
      state.issues = action.payload.data;
    },
    updateKontribute: (state, action) => {
      // @ts-ignore
      let newKontrbuteArr = state.userGroups?.getAuthUserGroupsCreated.data;
      newKontrbuteArr = newKontrbuteArr.map((kont) => {
        if (kont.id === action.payload.id) {
          return action.payload;
        }
        return kont;
      });
      // @ts-ignore
      state.userGroups.getAuthUserGroupsCreated.data = newKontrbuteArr
    },
    toggleSideNav: (state, action) => {
      state.showNav = action.payload;
    },
    getAjos: (state, action) => {
      state.ajo = action.payload;
    },
    getAjoInvitations: (state, action) => {
      state.ajoInvitation = action.payload;
    },
    setDraftRefund: (state, action) => {
      state.draftRefund = action.payload;
    },
    setDraftKontribute: (state, action) => {
      state.draftKontribute = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state = {...initialState};
      return state;
    })
  }
})

export const {
  toggleSideNav,
  addExpenses,
  addExpense,
  addSubCategory,
  deleteCategory,
  addUserToExpense,
  removeUserFromExpense,
  deleteExpense,
  deleteGroup,
  updateExpense,
  addCategories,
  addCategory,
  updateCategory,
  addSubCategories,
  updateSubCategory,
  deleteSubCategory,
  addUserGroup,
  addUserGroups,
  addOpenUserGroups,
  addParticipantToGroup,
  removeParticipantToGroup,
  addSplitFormula,
  addUsers,
  addUser,
  updateExpensesMetaData,
  addExpenseMembers,
  addUserGroupMembers,
  updateExpenseBalance,
  updateGroupBalance,
  updateIssue,
  addIssues,
  updateKontribute,
  updateRefundMember,
  updateKontributeMember,
  getAjos,
  getAjoInvitations,
  setDraftKontribute,
  setDraftRefund,
} = custodianSlice.actions;

export default custodianSlice.reducer;
