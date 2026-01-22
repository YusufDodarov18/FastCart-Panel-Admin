import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowDown, ArrowUp, Search, Table } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FadeLoader } from "react-spinners";
import CloseIcon from "@mui/icons-material/Close";
import {
  darkOnlyInputSx,
  darkOnlySelectSx,
} from "../../app/others/theme/muiTheme";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../app/others/theme/themeContext";
import {
  clearOrder,
  deleteOrder,
  getOrders,
} from "../../provider/reducers/Orders/order";
import NotOrders from "../../app/components/ui/notOrders";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const { darkMode } = useTheme();
  const [searchOrders, setSearchOrders] = useState("");
  const [filterOrder, setFilterOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const handleOpenDialog = () => setDialog(true);
  const handleCloseDialog = () => setDialog(false);

  const orders = useSelector((store) => store.orders.orders);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    dispatch(getOrders()).finally(() => setLoading(false));
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Order", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "surName", headerName: "SurName", width: 130 },
    {
      field: "phone",
      headerName: "Phone",
      width: 110,
    },
    {
      field: "address",
      headerName: "address",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    { field: "total", headerName: "total", width: 130 },
    { field: "date_of_order", headerName: "date", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <DeleteIcon
          style={{ cursor: "pointer", color: "red" }}
          onClick={(e) => {
            e.stopPropagation(); 
            dispatch(deleteOrder({ id: Number(params.id) })); 
          }}
        />
      ),
    },
  ];

  const rows = orders.map((user) => ({
    id: user.userId,
    name: user.name,
    surName: user.surName,
    phone: user.phone,
    address: user.address,
    total: `$${user.total}`,
    date_of_order: user.date_of_order,
  }));

  const filter = rows
    .filter((elem) =>elem.name.toLowerCase().includes(searchOrders.toLowerCase().trim()) ||elem.surName.toLowerCase().includes(searchOrders.toLowerCase().trim()))
    .sort((el1, el2) => {
      if (filterOrder == "Smail")
        return parseFloat(el1.total.replace("$", ""))-parseFloat(el2.total.replace("$", ""))
      if (filterOrder == "Big")
        return parseFloat(el2.total.replace("$", ""))-parseFloat(el1.total.replace("$", ""))
      return 0;
    });

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div>
      <header className="flex justify-between px-2 items-center gap-3 flex-col md:flex-row">
        <Box className="flex justify-center gap-3 flex-col md:flex-row ">
          <TextField
            fullWidth
            value={searchOrders}
            onChange={(e) => setSearchOrders(e.target.value)}
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
          <FormControl
            sx={{ minWidth: 200, width: "100%", md: { width: 250 } }}
          >
            <InputLabel id="Filter">Filter</InputLabel>
            <Select
              labelId="Filter"
              value={filterOrder}
              onChange={(e) => setFilterOrder(e.target.value)}
              label="Filter"
              sx={darkOnlySelectSx}
            >
              <MenuItem value={"All"}>
                <span className="flex items-center gap-3">
                  <Table className="text-[12px]" />
                  All Purchases
                </span>
              </MenuItem>
              <MenuItem value={"Smail"}>
                <span className="flex items-center gap-3">
                  <ArrowDown className="text-[12px]" />
                  Small Purchases
                </span>
              </MenuItem>
              <MenuItem value={"Big"}>
                <span className="flex items-center gap-3">
                  <ArrowUp className="text-[12px]" />
                  Big Purchases
                </span>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          className="flex gap-2 justify-center items-center "
          sx={{ backgroundColor: "red", color: "white" }}
          variant="contained"
          onClick={() => handleOpenDialog()}
          disabled={orders.length === 0}
        >
          Clear <DeleteIcon />
        </Button>
      </header>
      <main className="flex justify-center items-center pt-10">
        {loading ? (
          <FadeLoader
            color={darkMode === "light" ? "#8B5CF6" : "black"}
            className="mt-10"
          />
        ) : rows.length === 0 ? (
          <Box>
            <NotOrders />
          </Box>
        ) : (
          <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={filter}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{
                border: 0,
                "& .MuiDataGrid-row": {
                  cursor: "pointer",
                },
              }}
              onRowClick={(params) => {
                navigate(`/dashboard/getOrderById/${params.id}`);
              }}
            />
          </Paper>
        )}
      </main>
      <Dialog
        open={dialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box className="flex justify-between flex-col pr-5 pb-3">
          <Box className="flex justify-between items-center ">
            <DialogTitle id="alert-dialog-title">Delete All Orders</DialogTitle>
            <CloseIcon className="cursor-pointer" onClick={handleCloseDialog} />
          </Box>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography
                sx={{ color: darkMode == "light" ? "black" : "white" }}
              >
                To delete the entries, click the red button. <br /> Do you
                really want to delete all orders?
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} variant="contained">
              Cancel
            </Button>
            <Button
              color="error"
              onClick={() => {
                dispatch(clearOrder());
                handleCloseDialog();
              }}
              variant="outlined"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
