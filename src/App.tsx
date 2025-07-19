import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./component/layout";
import Homepage from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
