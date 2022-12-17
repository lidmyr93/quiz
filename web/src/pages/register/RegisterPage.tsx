import { useState } from "react";
import Input from "@/components/input/Input";
import { useNavigate } from "react-router-dom";
import { RegisterLayout } from "./RegisterPage.styled";

export default function RegisterPage(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log({ username, password, email });
    const resp = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify({ username, password, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await resp.json();
    console.log("result", result);
  };

  return (
    <RegisterLayout>
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
        <Input
          type="text"
          name="email"
          onChange={(e: React.FormEvent<HTMLInputElement>): void =>
            setEmail(e.currentTarget.value)
          }
          label="Email"
          value={email}
        />
        <button type="submit">register</button>
        <button onClick={() => navigate("/")}>Already have an account?</button>
      </form>
    </RegisterLayout>
  );
}
