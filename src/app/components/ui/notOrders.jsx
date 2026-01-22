import { Typography } from "@mui/material"
import notOrder from "../../others/images/norOrder.png"
const NotOrders = () => {
  return (
    <div className="flex justify-center flex-col items-center text-center pt-13">
         <img src={notOrder}  width={100} alt="img" />
         <Typography variant="h6">No Orders Yet</Typography>
         <p>All the upcoming orders from your store will be visible in this page. <br />You can add orders by yourself if you sell offline.</p>
    </div>
  )
}

export default NotOrders
