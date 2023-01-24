import { signOut } from "firebase/auth";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { auth } from "../firebase";

const logoutUser = (navigate: NavigateFunction) => {
  signOut(auth);
  navigate("/login");
};

function Logout(props: { className: string }) {
  const navigate = useNavigate();
  return (
    <button
      className={props.className}
      onClick={() => {
        logoutUser(navigate);
      }}
    >
      Log out
    </button>
  );
}

export default Logout;
