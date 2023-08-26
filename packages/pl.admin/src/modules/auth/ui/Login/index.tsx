import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AuthViewModel } from "../../view_model/AuthVM";
import { useVM } from "../../../../ui/hooks/useVM";
import { useRouter } from "react-router5";
import Paper from "@mui/material/Paper";
// import { theme } from '../../../../config/theme';
import { LoginBackdrop } from "./components/LoginBackdrop";

export default function SignIn() {
  const authVM = useVM<AuthViewModel>(AuthViewModel);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await authVM.authenticate(
      {
        email: data.get("email")?.toString() || "",
        password: data.get("password")?.toString() || "a",
      },
      router,
    );
  };

  return (
    <LoginBackdrop>
      <Container component="main" maxWidth="xs">
        <Paper
          sx={{
            marginTop: 8,
            padding: (theme) => theme.spacing(4),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sing-Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              variant="standard"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              variant="standard"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </LoginBackdrop>
  );
}
