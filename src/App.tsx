import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./component/layout";
import Homepage from "./pages/home";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import PrivateRoute from "./component/PrivateRoute";

import PaymentTransactionsPage from "./pages/transactions";
import ConvertationListPage from "./pages/convertation";
import GoldConverter from "./pages/goldConvertation";
import Contact from "./pages/contact";
import CurrencyRatesPage from "./pages/currecyRate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />

          <Route path="/transactions" element={<PaymentTransactionsPage />} />
          <Route path="/convertationlist" element={<ConvertationListPage />} />
          <Route path="/convertation" element={<GoldConverter />} />
          <Route path="/currency" element={<CurrencyRatesPage />} />

          <Route path="/contact" element={<Contact />} />
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
