import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./component/layout";
import Homepage from "./pages/home";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import PrivateRoute from "./component/PrivateRoute";
import PaymentPage from "./pages/payment";
import PaymentTransactionsPage from "./pages/transactions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/transactions" element={<PaymentTransactionsPage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
