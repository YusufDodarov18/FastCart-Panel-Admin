import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest } from "../../../utils/axiosRequest";
import { toast } from "react-toastify";

export const getOrders=createAsyncThunk('/order/get-order-products',async()=>{
    try {
        const {data}=await axiosRequest.get('/order/get-order-products')
        return data
    } catch (error) {
        console.error(error)
        throw new Error("Orders not Found: ", error)
    }
})

export const deleteOrder=createAsyncThunk('/order/delete-order',async({id},{dispatch})=>{
    try {
        await axiosRequest.delete(`/order/delete-order/${id}`)
        dispatch(getOrders())
        toast.success("Order removed successfully", { autoClose: 2000 })
        return id
    } catch (error) {
        console.error(error.message)
        console.error(id)
    }
})

export const clearOrder=createAsyncThunk('/order/clear-order',async(_,{dispatch})=>{
    try {
        await axiosRequest.delete('/order/clear-order')
        return true
    } catch (error) {
        console.error(error)
        throw error
    }
})

export const orderSlice=createSlice({
        name:"orders",
        initialState:{orders:[]},
        reducers:{},
        extraReducers:builder=>{
            builder.addCase(getOrders.fulfilled,(state,action)=>{
                state.orders=action.payload
            }).addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter(elem=>elem.userId!==action.payload)
             }).addCase(clearOrder.fulfilled,(state)=>{
                state.orders=[]
             })
        }
})

export default orderSlice.reducer