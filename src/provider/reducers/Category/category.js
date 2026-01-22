import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {axiosRequest} from "../../../utils/axiosRequest"

export const getCategories=createAsyncThunk('category/get-category',async()=>{
    try {
        const {data}=await axiosRequest.get(`/Category/get-category`)
        return data.categories
    } catch (error) {
        console.error(error)
        return []
    }
})

export const addCategory=createAsyncThunk('category/add-category',async(category,{dispatch})=>{
    try {
        await axiosRequest.post('/Category/add-category',category)
        dispatch(getCategories())
		toast.success('Add Category Successfully', { autoClose: 1000 })
    } catch (error) {
        console.error(error)
		toast.error('Here Something Incorrect', { autoClose: 1000 })
    }
})

export const deleteCategory = createAsyncThunk('category/delete-category', async (id, { dispatch }) => {
    try {
        await axiosRequest.delete(`/Category/delete-category/${id}`)
        toast.success('Category removed Successfully', { autoClose: 1000 })
        dispatch(getCategories())
        return id
    } catch (error) {
        console.error(error)
        toast.error('Here Something Incorrect', { autoClose: 1000 })
    }
})

export const editCategory=createAsyncThunk('/Category/update-category',async({id,nameCategory,newImage},{dispatch})=>{
    try {
        await axiosRequest.put(`/Category/update-category/${id}`,{nameCategory,newImage})
        dispatch(getCategories());
        toast.success('Category updated successfully', { autoClose: 1000 });
    } catch (error) {
        console.error(error)
        toast.error('Here Something Incorrect', { autoClose: 1000 })
    }
})

export const category=createSlice({
    name:"category",
    initialState:{categories:[]},
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(getCategories.fulfilled,(state,action)=>{
            state.categories=action.payload
        }).addCase(deleteCategory.fulfilled, (state, action) => {
            state.categories=state.categories.filter(cat=>cat.id!==action.payload)
        })
    }
})

export default category.reducer