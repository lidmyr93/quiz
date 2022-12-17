import { useState } from "react";
import Input from "@/components/input/Input";
import { useNavigate } from "react-router-dom";
import { LoginLayout } from "./LoginPage.styled";

export default function LoginPage(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log({ username, password });
    const resp = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await resp.json();
    console.log("result", result);
  };

  return (
    <LoginLayout>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          onChange={(e: React.FormEvent<HTMLInputElement>): void =>
            setUsername(e.currentTarget.value)
          }
          label="Username"
          value={username}
        />
        <Input
          type="text"
          name="password"
          onChange={(e: React.FormEvent<HTMLInputElement>): void =>
            setPassword(e.currentTarget.value)
          }
          label="Password"
          value={password}
        />
        <button type="submit">Login</button>
        <button onClick={() => navigate("/register")}>register</button>
      </form>
    </LoginLayout>
  );
}
