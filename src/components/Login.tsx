import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // loginUser().then((data) => {
    //   props.setToken(data.access_token);
    //   localStorage.setItem("token", JSON.stringify(data.access_token));
    //   navigate("/");
    // });
    navigate("/");
  };

  const loginUser = async () => {
    const searchParams = new URLSearchParams();
    searchParams.append("username", username);
    searchParams.append("password", password);

    const response = await fetch("/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: searchParams.toString(),
    });
    return await response.json();
  };

  return (
    <div className="flex items-center justify-center">
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <p>
            UserName{" "}
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
          </p>
          <p>
            Password{" "}
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          <p>
            <button>Login</button>
          </p>
          <p>
            Need an account?
            <br />
            <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
