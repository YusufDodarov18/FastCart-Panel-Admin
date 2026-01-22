import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Plus, Search, Table } from "lucide-react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  darkOnlyInputSx,
  darkOnlySelectSx,
} from "../../app/others/theme/muiTheme";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCategories } from "../../provider/reducers/Category/category";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import EmptyProducts from "../../app/components/ui/emptyProducts";
import {
  deleteProduct,
  getProduct,
} from "../../provider/reducers/Products/products";
import { FadeLoader } from "react-spinners";
import { useTheme } from "../../app/others/theme/themeContext";

const paginationModel = { page: 0, pageSize: 5 };

const Products = () => {
  const categories = useSelector((store) => store.category.categories);
  const products = useSelector((store) => store.product.products);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterProduct, setFilterProduct] = useState("");
  const { darkMode } = useTheme();

  useEffect(() => {
    setLoading(true);
    dispatch(getCategories()).finally(() => setLoading(false));
    dispatch(getProduct());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    { field: "productName", headerName: "Product", width: 140 },
    { field: "category", headerName: "Category", width: 140 },
    {
      field: "count",
      headerName: "Quantity",
      type: "number",
      width: 120,
    },
    {
      field: "brand",
      headerName: "Brand",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "date",
      headerName: "date",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "actions",
      headerName: "Actions",
      description: "This column used deletes and updating products",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <Box className="flex gap-2 items-center ">
          <Link to={`/dashboard/editProduct/${params.row.id}`}>
            <EditSquareIcon
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{ cursor: "pointer", color: "#2563EB" }}
            />
          </Link>
          <DeleteIcon
            onClick={(e) => {
              dispatch(deleteProduct({ id: params.row.id })),
                e.stopPropagation();
            }}
            style={{ cursor: "pointer", color: "red" }}
          />
        </Box>
      ),
    },
  ];

  const filter = products
    .filter((product) =>
      product.productName.toLowerCase().includes(search.toLowerCase().trim())
    )
    .filter((product) =>
      filterProduct && filterProduct !== "All"
        ? product.category === filterProduct
        : true
    );

  const rows = products.map((product, i) => ({
    id: product.id,
    productName: product.productName,
    category: product.category,
    quantity: product.count,
    brand: product.brand,
    date: new Date(product.date).toLocaleDateString(),
  }));

  return (
    <Box>
      <Box className="flex justify-between gap-3 items-center flex-wrap">
        <Box className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
          <TextField
            fullWidth
            placeholder="search..."
            sx={darkOnlyInputSx}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <Search className="absolute right-5" />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FormControl
            sx={{ minWidth: 200, width: "100%", md: { width: 250 } }}
          >
            <InputLabel id="Filter">Filter</InputLabel>
            <Select
              labelId="Filter"
              value={filterProduct}
              onChange={(e) => setFilterProduct(e.target.value)}
              label="Filter"
              sx={darkOnlySelectSx}
            >
              <MenuItem value={"All"}>
                <span className="flex items-center gap-3">
                  <Table className="text-[12px]" />
                  All
                </span>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem value={cat.categoryName} key={cat.id}>
                  <Box className="flex items-center gap-3">
                    <img src={cat.image} width={17} alt="" />
                    <span>{cat.categoryName}</span>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Link to={`/dashboard/addProduct`}>
            <Button variant="contained">
              <Plus />
              Add Product
            </Button>
          </Link>
        </Box>
      </Box>
      <Box className="flex justify-center items-center px-1 py-5">
        {loading ? (
          <FadeLoader
            color={darkMode === "light" ? "#8B5CF6" : "black"}
            className="mt-10"
          />
        ) : rows.length === 0 ? (
          <EmptyProducts />
        ) : (
          <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={filter}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Products;
