import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Board from "./components/Board";
import Login from "./components/Login";
import Register from "./components/Register";
import { auth } from "./firebase";

function App() {
  const user = auth.currentUser;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            user == null ? (
              <Navigate to="/login" />
            ) : (
              <Board /* user={user} */ />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
