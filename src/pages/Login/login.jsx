import Box from "@mui/material/Box";
import fastCart from "../../assets/fastCart.png";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { inputSx } from "../../app/others/theme/muiTheme";
import { useNavigate } from "react-router-dom";
import { axiosRequest } from "../../utils/axiosRequest";
import { useTheme } from "../../app/others/theme/themeContext";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("admin");
  const { darkMode } = useTheme();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate, token]);

  const CheckAdmin = async () => {
    if (!userName || !password) {
      toast.error("Please fill in both username and password.", {
        autoClose: 2000,
      });
      return;
    }

    setLoading(true);

    const admin = {
      userName: userName,
      password: password,
    };

    try {
      const { data } = await axiosRequest.post("/Account/login/admin", admin);

      if (data?.token) {
        localStorage.setItem("admin", data.token);
        toast.success("Login Successfully", { autoClose: 1500 });
        navigate("/dashboard");
      } else {
        toast.error("Invalid response from server.", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Login failed. Please check your credentials.", {
        autoClose: 2500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="min-h-screen flex flex-col md:flex-row md:bg-gradient-to-tr md:from-blue-600 md:via-purple-700 md:to-pink-600 bg-white">
      <section className="md:w-1/2 flex flex-col justify-center items-center p-10 bg-black bg-opacity-70 relative overflow-hidden">
        <img
          src={fastCart}
          alt="fastCart"
          className="w-36 md:w-48 mb-6 animate-fadeInScale"
          style={{ animationDelay: "0.3s" }}
        />
        <h2
          variant="h4"
          className="text-white text-4xl font-extrabold mb-2 text-center animate-fadeIn"
          style={{ animationDelay: "0.6s" }}
        >
          Welcome to Admin Panel User
        </h2>
        <p
          className="text-gray-300 text-lg max-w-md text-center leading-relaxed animate-fadeIn"
          style={{ animationDelay: "0.9s" }}
        >
          Please log in with your credentials to manage the dashboard.
        </p>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="w-72 h-72 bg-pink-500 rounded-full filter blur-3xl opacity-40 absolute -top-20 -left-20 animate-blob"></div>
          <div className="w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-30 absolute -bottom-20 -right-20 animate-blob animation-delay-4000"></div>
        </div>
      </section>
      <section className="md:w-1/2 flex justify-center items-center p-10 bg-white bg-opacity-90">
        <Box
          sx={{
            width: "100%",
            maxWidth: 420,
            p: 4,
            borderRadius: 3,
            backdropFilter: "blur(12px)",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(2,6,23,0.85)"
                : "rgba(255,255,255,0.9)",
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 20px 40px rgba(0,0,0,0.6)"
                : "0 20px 40px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
          }}
        >
          <h2
            className={`${darkMode == "light" ? "text-gray-800" : "text-white"}  text-3xl font-extrabold  mb-6 text-center select-none`}
          >
            Login
          </h2>
          <Box className="flex flex-col gap-3">
            <TextField
              fullWidth
              type="text"
              sx={inputSx}
              placeholder="UserName"
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={loading}
            />
            <TextField
              fullWidth
              type={"password"}
              placeholder="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              sx={inputSx}
              className="pointer-none:"
            />
          </Box>
          <Box className="flex justify-between items-center mt-2 mb-6">
            <Button
              onClick={() =>
                toast.info("Contact support to reset your password.", {
                  autoClose: 2000,
                })
              }
              disabled={loading}
            >
              Forgot password?
            </Button>
          </Box>
          <Button
            onClick={CheckAdmin}
            variant="contained"
            disabled={loading}
            className={`w-full text-white text-xl  transition-colors ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </Box>
      </section>
    </Box>
  );
}

export default Login;
