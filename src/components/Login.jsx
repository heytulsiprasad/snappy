import { useState } from "react";
import { Input, Button, Loader } from "@mantine/core";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
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
          onSubmit={onSubmitHandler}
        >
          {loading ? <Loader color="#fff" size="sm" /> : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
