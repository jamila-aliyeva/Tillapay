import React, { useEffect, useState } from "react";
import { Card, Typography, Spin, message } from "antd";
import axios from "axios";
import "./index.css";

const { Title, Text } = Typography;

interface CurrencyData {
  id: number;
  name: string;
  code: string;
  buy_price: string;
  sell_price: string;
}

const CurrencyRatesPage: React.FC = () => {
  const [currency, setCurrency] = useState<CurrencyData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCurrency = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://tech-awards.codearch.uz/api/currency"
        );
        if (res.data?.success) {
          setCurrency(res.data.result);
        } else {
          message.error("Valyuta ma'lumotlarini olishda xatolik");
        }
      } catch {
        message.error("Server bilan bog'lanishda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrency();
  }, []);

  return (
    <div className="currency-container">
      <Title level={2} className="currency-title">
        Current Gold Rates
      </Title>

      {loading ? (
        <div className="spinner-wrapper">
          <Spin size="large" />
        </div>
      ) : currency ? (
        <Card className="currency-card">
          <p>
            <Text className="currency-label">Currency:</Text>{" "}
            <span className="currency-value">
              {currency.name} ({currency.code})
            </span>
          </p>
          <p>
            <Text className="currency-label">Buy Price:</Text>{" "}
            <span className="currency-price">{currency.buy_price} UZS</span>
          </p>
          <p>
            <Text className="currency-label">Sell Price:</Text>{" "}
            <span className="currency-price">{currency.sell_price} UZS</span>
          </p>
        </Card>
      ) : (
        <Text className="no-data">No currency data available.</Text>
      )}
    </div>
  );
};

export default CurrencyRatesPage;
