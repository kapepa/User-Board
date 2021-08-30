import axios from '../../utility/axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const searchUsers = createAsyncThunk('users/search', async (obj) => {
  const merge = Object.assign({word: "",page: 1, fields: "", sort: null,},obj)
    const response = await axios.post(`/api/users/search`,merge).then(res => res.data);
    return response
  }
)

export const addUsers = createAsyncThunk('users/add', async (obj) => {
    const response = await axios.put(`/api/users/add`,obj).then(res => res.data);
    return response
  }
)

export const deleteUsers = createAsyncThunk('users/delete', async (key) => {
    const response = await axios.delete(`/api/users/${key}`).then(res => res.data);
    return response
  }
)