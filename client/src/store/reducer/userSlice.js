import { createSlice } from '@reduxjs/toolkit'
import { searchUsers, addUsers, deleteUsers } from '../action/userActions'

const initialState = {
  user: {
    name: "",
    surname: "",
    year: "",
    month: "",
    day: "",
    phone: "",
    email: "",
    update: 0,
    id: 0,
  },
  search: {
    list: [],
    pageAll: 1,
    page: 1,
  },
  loads: false,
  error: false,
  warning: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userForm: (state, action) => {
      state.user = action.payload
    },
    closeWarningPopup: (state, action) => {
      state.error = action.payload
    }
  },
  extraReducers: {
    [searchUsers.pending]: (state, action) => {
      state.loads = true;
    },
    [searchUsers.fulfilled]: (state, action) => {
      state.search = action.payload;
    },
    [addUsers.pending]: (state, action) => {
      state.loads = true;
      state.error = false;
    },
    [addUsers.fulfilled]: (state, action) => {
      state.loads = false;
      state.error = action.payload.alert;
      state.warning = action.payload.warning;
    },
    [deleteUsers.pending]: (state, action) => {
      state.loads = true;
      state.error = false;
    },
    [deleteUsers.fulfilled]: (state, action) => {
      state.loads = false;
      state.error = action.payload.alert;
      state.warning = action.payload.warning;
    },
  }
})

export const { userForm, closeWarningPopup } = userSlice.actions

export default userSlice.reducer