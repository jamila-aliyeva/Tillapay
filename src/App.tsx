import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./component/layout";
import Homepage from "./pages/home";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
