import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest } from "../../../utils/axiosRequest";
import { toast } from "react-toastify";

export const getBrands=createAsyncThunk('Brands/getBrands',async()=>{
    try {
        const {data}=await axiosRequest.get(`/Brands/get-brands`)
        return data.brands
    } catch (error) {
        console.error(error)
        return []
    }
})

export const addBrands=createAsyncThunk('/Brands/add-brand',async(newBrands,{dispatch})=>{
    try {
        await axiosRequest.post('/Brands/add-brand',newBrands)
        dispatch(getBrands())
        toast.success('Add Brands Successfully', { autoClose: 1000 })
        console.log(newBrands)
    } catch (error) {
		toast.error('Here Something Incorrect', { autoClose: 1000 })
        console.error(error)
    }
})

export const deleteBrands=createAsyncThunk('/Brands/delete-brand',async(id,{dispatch})=>{
    try {
        await axiosRequest.delete(`/Brands/delete-brand/${id}`)
        dispatch(getBrands())
        toast.success('Brands removed Successfully', { autoClose: 1000 })
        return id
    } catch (error) {
        console.error(error)
		toast.error('Here Something Incorrect', { autoClose: 1000 })
    }
})

export const editBrand=createAsyncThunk('/Brands/update-brand/',async({id,brandName},{dispatch})=>{
    try {
        await axiosRequest.put(`/Brands/update-brand/${id}`,{brandName})
        toast.success("Edit Brand Successfully",{autoClose:3000})
        dispatch(getBrands())
    } catch (error) {
        console.error(error)
		toast.error('Here Something Incorrect', { autoClose: 1000 })
    }
})

export const brandsSlice=createSlice({
    name:"brands",
    initialState:{brands:[]},
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(getBrands.fulfilled,(state,action)=>{
            state.brands=action.payload
        })
    }
})
export default brandsSlice.reducer