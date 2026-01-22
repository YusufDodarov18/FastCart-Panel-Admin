import { Box, Button, Typography } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../provider/reducers/Orders/order";

const GetOrderById = () => {
  const { id } = useParams();
  const navigate=useNavigate()
  
  const order=useSelector(store=>store.orders.orders)
  const dispatch=useDispatch()
  
  const findById=order.find(el=>el?.userId===id)
  useEffect(()=>{
    dispatch(getOrders())
  },[id,dispatch])

  return (
    <div>
        <main className="flex flex-col lg:flex-row gap-8 mt-8 px-4">
               <Box key={findById?.userId} className="w-full lg:w-1/2 bg-white text-black rounded-xl shadow p-4" >
                      <Box className="flex justify-between items-center flex-col md:flex-row gap-2">
                         <Link to={"/dashboard/orders"}>
                            <Button variant="contained" sx={{ color: "white" }}><ArrowLeft />Back</Button>
                         </Link>
                        <Typography className="font-semibold mb-2">User: {id}</Typography>
                      </Box>
                      <img src={"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"} alt="user avatar" className="w-28 h-28 rounded-full object-cover my-4" />
                      <ul className="space-y-1 text-lg">
                            <li><b>Name:</b> {findById?.name}</li>
                            <li><b>SurName:</b> {findById?.surName}</li>
                            <li><b>Phone:</b> {findById?.phone}</li>
                            <li><b>Address:</b> {findById?.address}</li>
                            <li><b>Date:</b> {`${new Date(findById?.date_of_order).getDate()}-${new Date(findById?.date_of_order).getMonth() + 1}-${new Date(findById?.date_of_order).getFullYear()}`}</li>
                      </ul>
                      <fieldset className="mt-4 border rounded p-3 text-sm overflow-y-auto">
                          <legend className="px-2">Message</legend>
                          <p>{findById?.message}</p>
                       </fieldset>
               </Box>

               <Box className="w-full lg:w-1/2 bg-white text-black rounded-xl shadow p-4">
                    <Box className="flex justify-between items-center flex-col md:flex-row gap-2">
                      <Typography className="font-semibold mb-3" variant="h">Total Price: ${findById?.total}</Typography>
                        <Button
                          onClick={()=>{
                            dispatch(deleteOrder({id:findById?.userId}))
                            navigate("/dashboard/orders")
                          }} 
                            variant="contained" color="error" 
                            className="flex justify-center items-center gap-2">
                            Delete User <DeleteIcon />
                        </Button>
                    </Box>
                    <TableContainer component={Paper} className="mt-2">
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Count</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                                {findById?.order_user?.map(product=>(
                                  <TableRow>
                                     <TableCell className="flex items-center gap-2">
                                         <img src={product?.product?.images[0]?.base64} alt="order photo" className="w-8 h-8 rounded-full"/>
                                         <Typography variant="body2">s{product?.product.productName}</Typography>
                                      </TableCell>
                                      <TableCell>${product?.product.price}</TableCell>
                                      <TableCell>{product?.quantity}</TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                    </TableContainer>
               </Box>
        </main>
    </div>
  );
};

export default GetOrderById;
