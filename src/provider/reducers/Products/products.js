import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest } from "../../../utils/axiosRequest";
import { toast } from "react-toastify";

export const getProduct=createAsyncThunk('/product/get-products',async()=>{
    try {
        const { data } = await axiosRequest.get('/product/get-products')
        return data
    } catch (error) {
        console.error(error)
        throw new Error("not found")
    }
})

export const addProduct=createAsyncThunk('/product/add-product',async(formData,{dispatch})=>{
    try {
        await axiosRequest.post("/product/add-product", formData);
        toast.success('Product added successfully', { autoClose: 2000 })
		dispatch(getProduct())
    } catch (error) {
        console.error(error)
    }
})

export const deleteProduct=createAsyncThunk('/product/delete-product',async({id},{dispatch})=>{
    try {
        await axiosRequest.delete(`/product/delete-product/${id}`)
		toast.success('Product deleted successfully', { autoClose: 1000 })
        dispatch(getProduct())
        return id
    } catch (error) {
        console.error(error)
    }
})

export const editProduct=createAsyncThunk("/product/update-product",async({id,newFormData},{dispatch})=>{
    try {
        const {data}=await axiosRequest.put(`/product/update-product/${id}`,newFormData)
        dispatch(getProduct())
		toast.success('Product updated successfully', {autoClose:1000})
        return data
    } catch (error) {
        console.error(error)
    }
})

export const Products=createSlice({
    name:"Products",
    initialState:{products:[]},
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(getProduct.fulfilled,(state,action)=>{
            state.products=action.payload
        }).addCase(deleteProduct.fulfilled, (state, action) => {
             state.products = state.products.filter(p => p.id !== action.payload)
         })
    }
})
export default Products.reducer