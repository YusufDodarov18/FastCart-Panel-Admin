import { Box, Button, Typography } from "@mui/material"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"
import addProductPhoto from "../../others/images/addProduct.png";

const EmptyProducts = () => {
  return (
      <Box className="flex justify-center flex-col items-center gap-2 h-[50vh]">
            <img src={addProductPhoto} width={100} alt="img" />
            <Typography variant="h6">Add new products</Typography>
            <Typography>Start making sales by adding your products. <br /> You can importand manage your products at any time.
            </Typography>
            <Link to={`/dashboard/addProduct`}>
                <Button variant="contained"><Plus /> Add Product</Button>
            </Link>
      </Box>
  )
}

export default EmptyProducts
