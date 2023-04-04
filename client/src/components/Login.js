import React from "react";
import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/auth";
import { LOGIN_USER } from "../utils/queries";
import { useForm } from "../utils/hooks";
import {
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Box,
} from "@mui/material";
import { Alert } from "@mui/material";

function Login() {
  const [error, setError] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { formData, onChange, onSubmit } = useForm(
    {
      username: "",
      password: "",
    },
    loginCallBack
  );

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }) {
      login(userData);
      navigate("/");
    },
    onError(err) {
      setError(err?.graphQLErrors[0]?.extensions?.errors);
    },
    variables: formData,
  });

  function loginCallBack() {
    return loginUser();
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            placeholder="Username"
            name="username"
            type="text"
            error={!!error?.username}
            value={formData?.username}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            error={!!error?.password}
            value={formData?.password}
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          {error && !!Object.keys(error)?.length && (
            <Alert severity="error">
              <ul>
                {Object.values(error)?.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </Alert>
          )}
        </Box>
        <Box sx={{ mt: 2 }}>
  <Typography variant="body2" color="text.secondary">
    Don't have an account?{" "}
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        navigate("/register");
      }}
      color="secondary"
    >
      Sign up here
    </Link>
  </Typography>
</Box>

      </Box>
    </Container>
  );
}

export default Login;
