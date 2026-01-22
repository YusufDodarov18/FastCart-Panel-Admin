import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../provider/reducers/Products/products";
import { Box } from "@mui/material";
import { useTheme } from "../../others/theme/themeContext";

const TopSellingProducts = () => {
  const products = useSelector((store) => store.product.products);
  const dispatch = useDispatch();
  const {darkMode}=useTheme()

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return <div>
    {products?.length>0?(
			products.map(el=>{
				return <Box key={el.id} className={`${darkMode=="light"?"bg-white":"bg-gray-800"} flex items-center gap-4 p-3 rounded shadow-sm hover:shadow-md transition`}>
					<img src={el.images[0].base64} alt={el.productName}  className='w-10 h-10 object-cover rounded' />
						<Box className='flex flex-col flex-1'>
							<h3 className='font-semibold '>
								{el.productName}
							</h3>
							<p className='text-sm text-gray-500'>{el.categoryName}</p>
							<p className='text-sm text-green-600'>
								In Stock: {el.count}
							</p>
						</Box>
						<div className='font-bold '>${el.price}</div>
				</Box>
				})
	  ) :
		  <p className='text-gray-500'>No products available</p>}
  </div>;
};

export default TopSellingProducts;
