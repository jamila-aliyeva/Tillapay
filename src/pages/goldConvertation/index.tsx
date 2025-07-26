import React, { useEffect, useState } from "react";
import {
  Typography,
  InputNumber,
  Input,
  Button,
  Tabs,
  message,
  Space,
  Spin,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { buyGold, sellGold } from "../../store/convertationSlice";
import { fetchCurrency } from "../../store/currencySlice";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const GoldConverter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading } = useSelector((state: RootState) => state.convertation);
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState<number>(0);
  const [cardNumber, setCardNumber] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("0");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const currencyData = localStorage.getItem("currency_prices");
    const now = Math.floor(Date.now() / 1000);

    if (currencyData) {
      const parsed = JSON.parse(currencyData);
      if (parsed.expiresAt > now) {
        console.log(" Narxlar localStorage'dan olindi");
        return;
      }
    }

    dispatch(fetchCurrency());
  }, [dispatch]);

  useEffect(() => {
    const data = localStorage.getItem("currency_prices");
    if (!data) return;

    const parsed = JSON.parse(data);
    const price =
      mode === "buy"
        ? parseFloat(parsed.buy_price)
        : parseFloat(parsed.sell_price);

    if (!price || amount <= 0) {
      setConvertedAmount("0");
      return;
    }

    const result =
      mode === "buy"
        ? (amount / price).toFixed(2)
        : (amount * price).toFixed(2);

    setConvertedAmount(result);
  }, [amount, mode]);

  const handleConvert = async () => {
    if (!token) return message.warning("Avval tizimga kiring");
    if (amount < 10000 || isNaN(amount)) {
      return message.warning("Miqdor 10000 dan kam bo'lmasligi kerak");
    }

    if (mode === "buy") {
      const res = await dispatch(buyGold({ amount }));
      const redirectUrl = res?.payload?.result?.redirect_url;

      if (buyGold.fulfilled.match(res) && redirectUrl) {
        message.success("To'lov sahifasiga yo‘naltirilmoqda");
        window.open(redirectUrl, "_blank");
      } else {
        message.error(res.payload?.message || "Tilla sotib olishda xatolik");
      }
    } else {
      const cleanedCard = cardNumber.replace(/\D/g, "");
      if (!cleanedCard || cleanedCard.length < 16) {
        return message.warning("Karta raqamini to'g'ri kiriting");
      }

      const res = await dispatch(
        sellGold({ amount, card_number: cleanedCard })
      );

      if (sellGold.fulfilled.match(res) && res.payload?.result) {
        message.success("So‘rov yuborildi. Admin tasdiqlashi kutilmoqda.");
        navigate("/convertation");
      } else {
        message.error(
          res.payload?.message || "Tilla sotishda xatolik yuz berdi"
        );
      }
    }
  };

  const onTabChange = (key: string) => {
    setMode(key as "buy" | "sell");
    setAmount(0);
    setCardNumber("");
    setConvertedAmount("0");
  };

  const formattedResult = () => {
    const value = Number(convertedAmount).toLocaleString("uz-UZ", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return mode === "buy" ? `${value} g` : `${value} so'm`;
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
      <Tabs
        defaultActiveKey="buy"
        onChange={onTabChange}
        centered
        items={[
          { key: "buy", label: "Buy" },
          { key: "sell", label: "Sell" },
        ]}
      />

      <Title level={3} style={{ textAlign: "center" }}>
        {mode === "buy" ? "UZS → GOLD" : "GOLD → UZS"}
      </Title>

      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div>
          <Text>Amount</Text>
          <InputNumber
            style={{ width: "100%" }}
            step={1000}
            value={amount}
            min={10000}
            onChange={(val) => setAmount(Number(val))}
            placeholder={mode === "buy" ? "1500000" : "2.5"}
          />
        </div>

        {mode === "sell" && (
          <div>
            <Text>Card Number</Text>
            <Input
              maxLength={19}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="8600 xxxx xxxx xxxx"
            />
          </div>
        )}

        <div style={{ textAlign: "center" }}>
          <Text style={{ fontSize: 24 }}>↓</Text>
        </div>

        <Input readOnly value={formattedResult()} />

        <Button
          type="primary"
          block
          onClick={handleConvert}
          disabled={amount <= 0 || (mode === "sell" && !cardNumber)}
        >
          {loading ? <Spin /> : "Convert"}
        </Button>
      </Space>
    </div>
  );
};

export default GoldConverter;
