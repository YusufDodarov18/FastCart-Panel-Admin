import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "../../app/others/theme/themeContext";
import {
  darkOnlyInputSx,
  darkOnlySelectSx,
} from "../../app/others/theme/muiTheme";
import UploadImage from "../../app/components/ui/uploadImage";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  getProduct,
} from "../../provider/reducers/Products/products";
import { getCategories } from "../../provider/reducers/Category/category";
import { getBrands } from "../../provider/reducers/Brands/brands";

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

function EditProduct() {
  const products = useSelector((store) => store.product.products);

  const { id } = useParams();

  const [colorName, setColorName] = useState("");
  const [dataColors, setDataColors] = useState([]);
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [colorInput, setColorInput] = useState("#000000");
  const [images, setImages] = useState([]);
  const { darkMode } = useTheme();
  const [newProductName, setNewProductName] = useState("");
  const [newCode, setNewCode] = useState(null);
  const [newDescription, setNewDescription] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newPrice, setNewPrice] = useState(null);
  const [newDisCount, setNewDisCount] = useState(null);
  const [newQuantity, setNewQuantity] = useState(null);
  const handleClickOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      const findId = products.find((e) => e.id === id);
      if (findId) {
        setNewProductName(findId.productName);
        setNewCode(findId.code);
        setNewDescription(findId.description);
        setNewBrand(findId.brand);
        setNewCategory(findId.category);
        setNewPrice(findId.price);
        setNewDisCount(findId.disCount);
        setNewQuantity(findId.count);

        setImages(
          Array.isArray(findId.images) ? findId.images : [findId.images],
        );
        setColors(
          Array.isArray(findId.colors) ? findId.colors : [findId.colors],
        );
      }
    }
  }, [id, products]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearForm = () => {
    setNewProductName("");
    setNewCode("");
    setNewDescription("");
    setNewBrand("");
    setNewCategory("");
    setNewPrice(null);
    setNewDisCount(null);
    setNewQuantity(null);
  };
  const EditFormProduct = async () => {
    if (
      !newProductName ||
      !newCode ||
      !newBrand ||
      !newCategory ||
      !newPrice ||
      !newQuantity ||
      images.length == 0 ||
      colors.length == 0
    ) {
      toast.error("Please fill in all required fields.", { autoClose: 2000 });
      return;
    }

    const newFormData = new FormData();
    newFormData.append("productName", newProductName);
    newFormData.append("code", newCode || uuidv4());
    newFormData.append("description", newDescription);
    newFormData.append("count", newQuantity);
    newFormData.append("disCount", newDisCount || 0);
    newFormData.append("brand", newBrand);
    newFormData.append("category", newCategory);
    newFormData.append("price", newPrice);
    newFormData.append("colors", JSON.stringify(colors));
    newFormData.append("images", JSON.stringify(images));

    try {
      setLoading(true);
      await dispatch(editProduct({ id: id, newFormData: newFormData }));
      navigate("/dashboard/products");
      clearForm();
    } catch (error) {
      console.error("EditProduct error:", error);
      toast.error("Failed to edit product.", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const brands = useSelector((store) => store.brands.brands);
  const categories = useSelector((store) => store.category.categories);

  useEffect(() => {
    const saved = localStorage.getItem("Colors");
    if (saved) setDataColors(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("Colors", JSON.stringify(dataColors));
  }, [dataColors]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
    dispatch(getProduct());
  }, [dispatch]);
  console.log(images);
  return (
    <Box className="p-6">
      <header className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <Typography
          variant="h5"
          className="text-2xl font-bold flex gap-3 items-center"
        >
          <Link to="/dashboard/products">
            <span className="text-blue-600 hover:underline">Products</span>
          </Link>
          <span>/ Edit Product</span>
        </Typography>
        <Box className="flex gap-3">
          <Link to={`/dashboard/products`}>
            <Button
              variant="outlined"
              sx={{ backgroundColor: darkMode === "light" ? "" : "#1e293b" }}
            >
              Cancel
            </Button>
          </Link>
          <Button
            variant="contained"
            onClick={EditFormProduct}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </Box>
      </header>

      <main className="flex flex-col md:flex-row gap-8">
        {/* LEFT SIDE */}
        <Box className="md:w-[60%] space-y-6">
          <section>
            <Typography variant="h5" className="text-lg font-semibold mb-2">
              New Information
            </Typography>
            <Box className="flex gap-4 mt-7 flex-col md:flex-row">
              <TextField
                className="w-full border px-3 py-1 rounded"
                placeholder="Product Name"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                sx={darkOnlyInputSx}
              />
              <TextField
                type="number"
                sx={darkOnlyInputSx}
                className="md:w-100 md:w-[30%] border px-3 py-2 rounded"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="code"
              />
            </Box>
            <textarea
              className="w-full border-1 border-gray-400  outline-blue-500 px-3 py-2 mt-4 rounded h-32 resize-none"
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              style={{ backgroundColor: darkMode == "light" ? "" : "#1e293b" }}
            />
          </section>
          <section>
            <Box className="flex gap-4 flex-col md:flex-row">
              <FormControl sx={{ m: 1, width: 250 }}>
                <InputLabel id="Filter">Filter</InputLabel>
                <Select
                  labelId="Filter"
                  label="Filter"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  sx={darkOnlySelectSx}
                >
                  {categories.map((cat) => (
                    <MenuItem value={cat.categoryName} key={cat.id}>
                      <div className="flex items-center gap-2">
                        <img src={cat.image} width={20} alt="" />
                        <span>{cat.categoryName}</span>
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="category-label">Brands</InputLabel>
                <Select
                  labelId="category-label"
                  label="Brands"
                  sx={darkOnlySelectSx}
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                >
                  {brands.length === 0 ? (
                    <MenuItem value="Not Brand">Not Brand</MenuItem>
                  ) : (
                    brands.map((brand) => (
                      <MenuItem value={brand.brandname} key={brand.id}>
                        {brand.brandname}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Box>
          </section>
          <Typography variant="h6" className="text-lg font-semibold mb-2">
            Price
          </Typography>
          <Box className="flex gap-4 flex-col md:flex-row">
            <TextField
              sx={darkOnlyInputSx}
              type="number"
              placeholder="Product Price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
            <TextField
              sx={darkOnlyInputSx}
              type="number"
              placeholder="Discount"
              value={newDisCount}
              onChange={(e) => setNewDisCount(e.target.value)}
            />
            <TextField
              sx={darkOnlyInputSx}
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              type="number"
              placeholder="Count"
            />
          </Box>
        </Box>
        <Box>
          <Box className="border-1 border-gray-300 px-4 py-5">
            <header className="flex justify-between items-center ">
              <Typography variant="h" className="font-black">
                Add a new color:
              </Typography>
              <Button
                onClick={handleClickOpen}
                sx={{ color: darkMode == "light" ? "" : "#236ee7" }}
              >
                Create New
              </Button>
            </header>
            <Box className="flex gap-3 py-4 ">
              {dataColors.map((el) => (
                <Box
                  sx={{
                    backgroundColor: el.color,
                    border: activeColor[el.id] ? `3px solid #2563EB` : "",
                  }}
                  key={el.id}
                  className="relative group w-10 h-10 rounded-[50%] cursor-pointer"
                  onClick={() => {
                    const alreadyexist = colors.some(
                      (c) => c.colorId === el.id,
                    );
                    if (alreadyexist) {
                      setColors((prev) =>
                        prev.filter((c) => c.colorId !== el.id),
                      );
                      setActiveColor((prev) => {
                        const copy = { ...prev };
                        delete copy[el.id];
                        return copy;
                      });
                      toast.info("Color removed from list", {
                        autoClose: 1000,
                      });
                    } else {
                      setColors((prev) => [
                        ...prev,
                        { colorId: el.id, color: el.color },
                      ]);
                      setActiveColor((prev) => ({ ...prev, [el.id]: true }));
                      toast.success("Color added to list", { autoClose: 1000 });
                    }
                  }}
                >
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.success(
                        "The color was successfully removed from the list.",
                        { autoClose: 1000 },
                      );
                      setDataColors((prevDataColor) =>
                        prevDataColor.filter((elem) => elem.id !== el.id),
                      );
                    }}
                    className="absolute -top-1 -right-1 hidden group-hover:flex w-5 h-5 bg-white text-red-500 rounded-full items-center justify-centertext-xs font-bold shadow"
                  >
                    <CloseIcon />
                  </span>
                </Box>
              ))}
            </Box>
          </Box>
          <Box className="flex flex-col gap-4 mt-4">
            <Typography variant="h" className="font-black">
              New Images
            </Typography>
            <UploadImage
              images={images}
              setImages={setImages}
              darkMode={darkMode}
            />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 250 }} aria-label="simple table">
                <TableHead>
                  <TableRow
                    className={`${darkMode === "light" ? "bg-[#F5F5F5]" : ""}`}
                  >
                    <TableCell className="color-[#5A607F]">Image</TableCell>
                    <TableCell className="color-[#5A607F]">File Name</TableCell>
                    <TableCell className="color-[#5A607F]">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {images.map((img) => (
                    <TableRow key={img.id}>
                      <TableCell className="indent-2">
                        <img
                          src={img.base64}
                          alt="preview"
                          className="w-14 h-14 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="indent-2">s3jdewl2k3</TableCell>
                      <TableCell className="indent-3">
                        <DeleteIcon
                          onClick={() =>
                            setImages((prev) =>
                              prev.filter((file) => img.id !== file.id),
                            )
                          }
                          className="text-[#7E84A3] cursor-pointer"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </main>
      <Dialog open={openDialog} onClose={handleClose}>
        <Box className="flex flex-col px-7 py-7">
          <header className="flex justify-between py-3">
            <Typography variant="h6">New Color</Typography>
            <CloseIcon className="cursor-pointer" onClick={handleClose} />
          </header>
          <main className="flex gap-5">
            <TextField
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
              placeholder="Color Name"
              type="text"
            />
            <Box className="w-30 h-14 flex items-center justify-evenly border-1 border-gray-300">
              <input
                type="color"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                className="cursor-pointer w-10 h-10 rounded-[14px]"
              />
              <span className="text-sm text-gray-600">{colorInput}</span>
            </Box>
          </main>
          <Box className="pt-5 flex gap-4 justify-end">
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                toast.success("The color was successfully added to the list", {
                  autoClose: 1000,
                });
                if (colorName.trim() !== "") {
                  setDataColors([
                    ...dataColors,
                    { id: Date.now(), color: colorInput, name: colorName },
                  ]);
                  handleClose();
                  setColorInput("#000000");
                  setColorName("");
                }
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
export default EditProduct;
