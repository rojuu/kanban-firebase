import { NavigateFunction, useNavigate } from "react-router-dom";

const logoutUser = (navigate: NavigateFunction) => {
  localStorage.removeItem("token");
  navigate("/login");
};

const Logout = (props: { className: string }) => {
  const navigate = useNavigate();
  return (
    <button className={props.className} onClick={() => logoutUser(navigate)}>
      Log out
    </button>
  );
};

export default Logout;
