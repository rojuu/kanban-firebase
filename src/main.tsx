import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/Auth";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // TODO: Enable strict mode. Turns out the react-beautiful-dnd library doesn't support strict mode on the current version.
  // See: https://github.com/atlassian/react-beautiful-dnd/issues/2407
  // <React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
  // </React.StrictMode>
);
