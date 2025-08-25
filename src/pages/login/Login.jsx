import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import { toast } from "react-toastify";

function Login({ onLoginSuccess }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login === "Avazbek" && password === "1985") {
      toast.success("Muvaffaqiyatli o'tdingiz");
      onLoginSuccess(); // UserList sahifasiga o‘tadi
    } else {
      toast.error("Qaytadan urinib ko‘ring");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
        px: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: isSmallScreen ? "100%" : 400,
          width: "100%",
          p: isSmallScreen ? 2 : 4,
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <CardContent>
          <Typography
            variant={isSmallScreen ? "h6" : "h5"}
            align="center"
            gutterBottom
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Login"
              variant="outlined"
              fullWidth
              margin="normal"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <TextField
              label="Parol"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                py: isSmallScreen ? 1 : 1.5,
                fontSize: isSmallScreen ? "14px" : "16px",
              }}
            >
              Kirish
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
