import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./components/Board";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              // !token ? <Navigate to="/login" /> : <Board token={token}/>
              <Board />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
