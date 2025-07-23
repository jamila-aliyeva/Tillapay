import React, { useState, useEffect } from "react";
import { InputNumber, Button, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { createPayment, clearPayment } from "../../store/paymentSlice";
import "./index.css";

const { Title } = Typography;

const PaymentPage: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, paymentUrl, error } = useSelector(
    (state: RootState) => state.payment
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.warning("Avval tizimga kiring.");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (paymentUrl) {
      window.open(paymentUrl, "_blank");
      dispatch(clearPayment());
    }
  }, [paymentUrl, dispatch]);

  const handlePayment = () => {
    if (amount <= 0) {
      message.error("Miqdor 0 dan katta bo‘lishi kerak");
      return;
    }
    dispatch(createPayment(amount));
  };

  return (
    <div className="payment-content">
      <Title className="payment-title">Payment</Title>
      <p className="payment-pr">
        Hisobingizni to'ldirish uchun miqdorni kiriting:
      </p>

      <InputNumber
        className="payment-input"
        min={1000}
        placeholder="Tolov miqdori (UZS)"
        value={amount}
        onChange={(val) => setAmount(Number(val))}
      />
      <Button
        onClick={handlePayment}
        style={{ marginLeft: 12 }}
        loading={loading}
        className="payment-btn"
      >
        To‘lov qilish
      </Button>

      {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
    </div>
  );
};

export default PaymentPage;
