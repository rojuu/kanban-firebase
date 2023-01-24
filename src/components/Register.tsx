import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // createUser().then((data) => {
    //   props.setToken(data.access_token);
    //   localStorage.setItem("token", JSON.stringify(data.access_token));
    //   navigate("/");
    // });
    navigate("/");
  };

  const createUser = async () => {
    const formData = {
      username,
      password,
    };

    const response = await fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return await response.json();
  };

  return (
    <div className="flex items-center justify-center">
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <p>
            UserName{" "}
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </p>
          <p>
            Password{" "}
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </p>
          <p>
            <button>Register</button>
          </p>
          <p>
            Already have an account? <br />
            <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
