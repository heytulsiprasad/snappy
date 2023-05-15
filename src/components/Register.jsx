import { useState } from "react";
import { Input, Button, Loader, Text } from "@mantine/core";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { notifications } from "@mantine/notifications";

import { login } from "../features/auth/authSlice";

const Register = () => {
  const [name, setName] = useState("");
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

    console.log("submit");

    setLoading(true);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("/api/auth/signup", body, config);
      localStorage.setItem("token", res.data.token);
      await getUserInfo();
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
    <div>
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
          id="input-name"
          withAsterisk
          label="Your Name"
          sx={{ marginBottom: "1rem" }}
        >
          <Input
            id="input-name"
            icon={<CgProfile />}
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ minWidth: "20rem" }}
          />
        </Input.Wrapper>

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
            margin: "2rem auto",
          }}
          type="submit"
          onClick={onSubmitHandler}
        >
          {loading ? <Loader color="#fff" size="sm" /> : "Register"}
        </Button>
      </form>
      <Text sx={{ textAlign: "center", fontSize: "0.9rem" }}>
        Already have an account?{" "}
        <Link style={{ textDecoration: "underline" }} to="/login">
          Login
        </Link>
      </Text>
    </div>
  );
};

export default Register;
