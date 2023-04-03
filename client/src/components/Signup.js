import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { REGISTER_USER } from "../utils/graphqlQueries";
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

function Register() {
    const [error, setError] = useState({});
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false); // Add this line

    const { formData, onChange, onSubmit } = useForm(
        {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        registerCallBack
    );

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { register } }) {
            login(register);
            navigate("/");
            setSuccess(true); // Set success state to true on successful registration
        },
        onError(err) {
            setError(err.graphQLErrors[0]?.extensions.errors);
        },
        variables: formData,
    });

    function registerCallBack() {
        return registerUser();
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
                    Register
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
                        label="Email"
                        placeholder="Email"
                        name="email"
                        type="email"
                        error={!!error?.email}
                        value={formData?.email}
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
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        error={!!error?.confirmPassword}
                        value={formData?.confirmPassword}
                        onChange={onChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                    {error &&
                        !!Object.keys(error)?.length && (
                            <Alert severity="error">
                                <ul>
                                    {Object.values(error)?.map((value, index) => (
                                        <li key={index}>{value}</li>
                                    ))}
                                </ul>
                            </Alert>
                        )}
                    {success && (
                        <Alert severity="success">
                            Account created successfully. You are now logged in.
                        </Alert>
                    )}
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Already have an account?{" "}
                        <Link
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/login");
                            }}
                            color="secondary"
                        >
                            Click here
                        </Link>
                    </Typography>
                </Box>

            </Box>
        </Container>
    );
}

export default Register;