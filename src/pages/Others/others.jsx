import {
  Box,
  Button,
  Dialog,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "../../app/others/theme/themeContext";
import UploadImage from "../../app/components/ui/uploadImage";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { darkOnlyInputSx } from "../../app/others/theme/muiTheme";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from "../../provider/reducers/Category/category";
import EditIcon from "@mui/icons-material/Edit";
import {
  addBrands,
  deleteBrands,
  editBrand,
  getBrands,
} from "../../provider/reducers/Brands/brands";
import { FadeLoader } from "react-spinners";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  getProduct,
} from "../../provider/reducers/Products/products";
import EmptyProducts from "../../app/components/ui/emptyProducts";

const Others = () => {
  const { darkMode } = useTheme();
  const [value, setValue] = useState("1");
  const [images, setImages] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);
  const [dialogEditCategory, setDialogEditCategory] = useState(false);
  const handleClose = () => setDialog(false);
  const handleOpen = () => setDialog(true);
  const handleCloseEdit = () => setDialogEdit(false);
  const handleCloseDialogEditCategory = () => setDialogEditCategory(false);
  const handleOpenDialogEditCategory = () => setDialogEditCategory(true);
  const handleOpenEdit = () => setDialogEdit(true);
  const [newBrandName, setNewBrandName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [idx, setIdx] = useState(null);
  const [searchCategories, setSearchCategories] = useState("");
  const [searchProducts, setSearchProducts] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [idxCategory, setIdxCategory] = useState(null);
  const [newNameCategory, setNewNameCategory] = useState("");

  const categories = useSelector((store) => store.category.categories);
  const brands = useSelector((store) => store.brands.brands);
  const products = useSelector((store) => store.product.products);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setLoadingCategories(true);
    dispatch(getCategories()).finally(() => setLoadingCategories(false));
    dispatch(getBrands());
    dispatch(getProduct());
  }, [dispatch]);

  const filterCategories = categories.filter((cat) =>
    cat.categoryName
      .toLowerCase()
      .includes(searchCategories.toLowerCase().trim()),
  );

  const filterProducts = products.filter((product) =>
    product.productName
      .toLowerCase()
      .includes(searchProducts.toLowerCase().trim()),
  );

  return (
    <Box>
      <header className="flex justify-between items-center gap-2 flex-col md:flex-row">
        <Typography variant="h5">Others</Typography>
        <Button
          variant="contained"
          className="flex gap-2"
          sx={{
            backgroundColor: darkMode === "light" ? "" : "#8B5CF6",
            color: "white",
          }}
          onClick={handleOpen}
        >
          <Plus /> Add Category
        </Button>
      </header>
      <main className="mt-5">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  "& .MuiTabs-indicator": {
                    backgroundColor: darkMode === "light" ? "" : "#8B5CF6",
                  },
                }}
              >
                <Tab
                  sx={{
                    flex: 1,
                    "&.Mui-selected": {
                      color: darkMode === "light" ? "" : "#8B5CF6",
                    },
                  }}
                  label="CATEGORIES"
                  value="1"
                />
                <Tab
                  sx={{
                    flex: 1,
                    "&.Mui-selected": {
                      color: darkMode === "light" ? "" : "#8B5CF6",
                    },
                  }}
                  label="BRANDS"
                  value="2"
                />
                <Tab
                  sx={{
                    flex: 1,
                    "&.Mui-selected": {
                      color: darkMode === "light" ? "" : "#8B5CF6",
                    },
                  }}
                  label="PRODUCTS"
                  value="3"
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              {categories.length !== 0 && (
                <TextField
                  fullWidth
                  value={searchCategories}
                  onChange={(e) => setSearchCategories(e.target.value)}
                  placeholder=" search..."
                  sx={darkOnlyInputSx}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              <Box className="flex flex-wrap justify-evenly mt-3 items-center gap-4 pt-2">
                {loadingCategories ? (
                  <Box>
                    <FadeLoader
                      color={darkMode === "light" ? "#8B5CF6" : "black"}
                    />
                  </Box>
                ) : categories.length == 0 ? (
                  <Box>
                    <Typography variant="h5">
                      There are currently no categories. 0
                    </Typography>
                  </Box>
                ) : filterCategories.length === 0 ? (
                  <Typography variant="h5">
                    No results found for your search:
                    <span className="text-red-400"> {searchCategories}</span>
                  </Typography>
                ) : (
                  filterCategories.map((cat) => {
                    return (
                      <Box
                        key={cat.id}
                        className="flex flex-col items-start  border-1 px-7 py-5 pt-7 border-gray-300 gap-3 pt-2 justify-start"
                      >
                        <Box className="flex justify-center items-center gap-5 flex-col md:flex-row">
                          <Box>
                            <img
                              src={cat.image}
                              alt="image"
                              className="w-25 h-50 md:h-25 object-cover "
                            />
                          </Box>
                          <Box className="flex flex-col gap-1">
                            <EditIcon
                              onClick={() => {
                                handleOpenDialogEditCategory();
                                setIdxCategory(cat.id);
                                setNewNameCategory(cat.categoryName);
                              }}
                              className="cursor-pointer text-blue-500"
                            />
                            <DeleteIcon
                              onClick={() => dispatch(deleteCategory(cat.id))}
                              className="cursor-pointer text-red-500"
                            />
                          </Box>
                        </Box>
                        <Box>
                          <Typography variant="h" className="font-black">
                            {cat.categoryName}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })
                )}
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <Box className="flex items-start gap-4 flex-col md:flex-row">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 200 }} aria-label="simple table">
                    <TableHead>
                      <TableRow
                        className={`${darkMode === "light" ? "bg-[#F5F5F5]" : ""}`}
                      >
                        <TableCell
                          sx={{ width: "70%" }}
                          className="text-[#5A607F]"
                        >
                          Brands
                        </TableCell>
                        <TableCell
                          sx={{ width: "30%", textAlign: "left" }}
                          className="text-[#5A607F]"
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {brands.map((brand) => (
                        <TableRow key={brand.id}>
                          <TableCell>{brand.brandname}</TableCell>
                          <TableCell>
                            <Box className="flex gap-2 items-center justify-start">
                              <EditIcon
                                onClick={() => {
                                  handleOpenEdit();
                                  setNewBrandName(brand.brandname);
                                  setIdx(brand.id);
                                }}
                                className="cursor-pointer text-blue-500"
                              />
                              <DeleteIcon
                                onClick={() => dispatch(deleteBrands(brand.id))}
                                className="cursor-pointer text-red-500"
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box
                  className="border-1 border-gray-300 px-5 py-5  flex flex-col gap-2"
                  sx={{ width: { xs: "100%", sm: 400, md: 500 } }}
                >
                  <Typography variant="h6">Add new brand</Typography>
                  <TextField
                    sx={darkOnlyInputSx}
                    variant="outlined"
                    onChange={(e) => setBrandName(e.target.value)}
                    value={brandName}
                    placeholder="Brand name"
                  />
                  <Box className="flex justify-end mt-2">
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: darkMode === "light" ? "" : "#8B5CF6",
                        color: "white",
                      }}
                      onClick={() => {
                        if (brandName.trim() !== "") {
                          dispatch(
                            addBrands({ brandName: brandName }),
                            setBrandName(""),
                          );
                        }
                      }}
                    >
                      Create
                    </Button>
                  </Box>
                </Box>
              </Box>
            </TabPanel>
            {/* Products */}
            <TabPanel sx={{ overflowX: "hidden" }} value="3">
              {products.length !== 0 && (
                <Box className="pb-3">
                  <TextField
                    fullWidth
                    value={searchProducts}
                    onChange={(e) => setSearchProducts(e.target.value)}
                    placeholder=" search..."
                    sx={darkOnlyInputSx}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              )}
              <Box>
                {products.length === 0 ? (
                  <EmptyProducts />
                ) : filterProducts.length === 0 ? (
                  <Box className="flex justify-center items-center">
                    <Typography variant="h5">
                      No results found:
                      <span className="text-red-500">{searchProducts}</span>
                    </Typography>
                  </Box>
                ) : (
                  <Box className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {filterProducts.map((el) => (
                      <Box
                        key={el.id}
                        className="border border-gray-300 px-4 py-3"
                      >
                        <Box className="flex justify-center">
                          <img
                            src={el.images[0]?.base64}
                            alt={el.productName}
                            width={100}
                          />
                        </Box>
                        <Box className="pt-4 grid grid-cols-1 gap-1">
                          <Typography>{el.productName}</Typography>
                          <Typography>Category: {el.category}</Typography>
                          <Box className="flex flex-wrap gap-2 pt-2">
                            <Button
                              variant="contained"
                              sx={{ backgroundColor: "#2563EB" }}
                            >
                              <Link to={`/dashboard/editProduct/${el.id}`}>
                                <EditIcon className="cursor-pointer text-white" />
                              </Link>
                            </Button>
                            <Button
                              variant="contained"
                              sx={{ backgroundColor: "red" }}
                            >
                              <DeleteIcon
                                onClick={() =>
                                  dispatch(deleteProduct({ id: el.id }))
                                }
                                className="cursor-pointer text-white"
                              />
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </main>
      <Dialog open={dialog} onClose={handleClose}>
        <Box className="pt-6 px-10 flex flex-col gap-4 pb-4">
          <Box className="flex justify-between gap-5 items-center">
            <Typography variant="h6">Add category</Typography>
            <CloseIcon className="cursor-pointer" onClick={handleClose} />
          </Box>
          <Box>
            <TextField
              fullWidth
              placeholder="Category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Box>
          <Box>
            <UploadImage
              darkMode={darkMode}
              images={images}
              setImages={setImages}
            />
          </Box>
          <Box className="flex justify-end gap-3 pt-2">
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (categoryName.trim() !== "" && images.length !== 0) {
                  dispatch(
                    addCategory({
                      categoryName: categoryName,
                      images: [images[0].base64],
                    }),
                  );
                  handleClose();
                  setImages([]);
                  setCategoryName("");
                }
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Dialog open={dialogEdit} onClose={handleCloseEdit}>
        <Box className="pt-6 px-10 flex flex-col gap-4 pb-4">
          <Box className="flex justify-between gap-5 items-center">
            <Typography variant="h6">New Brand Name</Typography>
            <CloseIcon className="cursor-pointer" onClick={handleCloseEdit} />
          </Box>
          <Box>
            <TextField
              fullWidth
              placeholder="Brand name"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
            />
          </Box>
          <Box className="flex justify-end gap-3 pt-2">
            <Button onClick={handleCloseEdit} variant="outlined">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (newBrandName.trim() !== "") {
                  dispatch(editBrand({ id: idx, brandName: newBrandName }));
                  setNewBrandName("");
                  setIdx(null);
                  handleCloseEdit();
                  setImages([{ base64: category.image }]);
                }
              }}
            >
              Edit Brand
            </Button>
          </Box>
        </Box>
      </Dialog>
      {/* dialog edit category */}
      <Dialog open={dialogEditCategory} onClose={handleCloseDialogEditCategory}>
        <Box className="pt-6 px-10 flex flex-col gap-4 pb-4">
          <Box className="flex justify-between gap-5 items-center">
            <Typography variant="h6">Edit category</Typography>
            <CloseIcon
              className="cursor-pointer"
              onClick={handleCloseDialogEditCategory}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              placeholder="New Category name"
              value={newNameCategory}
              onChange={(e) => setNewNameCategory(e.target.value)}
            />
          </Box>
          <Box>
            <UploadImage
              darkMode={darkMode}
              images={images}
              setImages={setImages}
            />
          </Box>
          <Box className="flex justify-end gap-3 pt-2">
            <Button onClick={handleCloseDialogEditCategory} variant="outlined">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (newNameCategory.trim() !== "") {
                  dispatch(
                    editCategory({
                      id: idxCategory,
                      nameCategory: newNameCategory,
                      newImage: images[0]?.base64,
                    }),
                  );
                  handleCloseDialogEditCategory();
                  setImages([]);
                }
              }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Others;
