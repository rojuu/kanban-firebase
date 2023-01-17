import { NavigateFunction, useNavigate } from "react-router-dom";

const logoutUser = (navigate: NavigateFunction) => {
  localStorage.removeItem("token");
  navigate("/login");
};

const Logout = () => {
  const navigate = useNavigate();
  return <button onClick={() => logoutUser(navigate)}>Log out</button>;
};

export default Logout;
