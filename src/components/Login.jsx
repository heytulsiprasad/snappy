import { useState } from "react";
import { Input, Button, Loader, Text, Box, Title } from "@mantine/core";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { login } from "../features/auth/authSlice";
import { notifications } from "@mantine/notifications";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        axios.defaults.headers.common["x-auth-token"] = token;
        const res = await axios.get("/api/user/info");
        dispatch(login({ currentUser: res.data.user }));
      } catch (e) {
        console.error(e);
      }
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/api/auth/login", body, config);
      localStorage.setItem("token", res.data.token);

      if (res.data.token) {
        await getUserInfo();
      } else {
        console.log("no token");
      }
    } catch (err) {
      notifications.show({
        title: "Error",
        message: err.response.data.msg,
        color: "red",
      });

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: "1rem 2rem" }}>
      <Title order={1}>Login</Title>
      <Box
        sx={{
          padding: "2rem 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <form
          noValidate
          onSubmit={onSubmitHandler}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Input.Wrapper
            id="input-email"
            withAsterisk
            label="Your Email"
            sx={{ marginBottom: "1rem" }}
          >
            <Input
              id="input-email"
              icon={<MdAlternateEmail />}
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ minWidth: "20rem" }}
            />
          </Input.Wrapper>

          <Input.Wrapper id="input-password" withAsterisk label="Your Password">
            <Input
              icon={<RiLockPasswordLine />}
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ minWidth: "20rem" }}
            />
          </Input.Wrapper>

          <Button
            sx={{
              width: "40%",
              textAlign: "center",
              margin: "2rem 0",
            }}
            type="submit"
            onClick={onSubmitHandler}
          >
            {loading ? <Loader color="#fff" size="sm" /> : "Login"}
          </Button>
        </form>
        <Text sx={{ textAlign: "center", fontSize: "0.9rem" }}>
          Dont have an account?{" "}
          <Link style={{ textDecoration: "underline" }} to="/register">
            Register
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
