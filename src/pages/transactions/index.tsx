import React, { useEffect, useState } from "react";
import { Table, Typography, message } from "antd";
import axiosInstance from "../../api/axiosInstance";
import "./index.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

type Transaction = {
  id: string;
  amount: string;
  state: string;
  user: {
    id: number;
    name: string;
    email: string;
    balance: string;
  };
};

const PaymentTransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      message.warning("Avval tizimga kiring.");
      navigate("/login");
      return;
    }

    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance.get("/payment/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setTransactions(response.data.result);
        } else {
          message.error("Tranzaksiyalarni olishda xatolik");
        }
      } catch (error) {
        console.error(error);
        message.error("Server bilan ulanishda xatolik");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [navigate]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Foydalanuvchi",
      dataIndex: ["user", "name"],
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
    },
    {
      title: "Miqdor",
      dataIndex: "amount",
      render: (amount: string) =>
        new Intl.NumberFormat("uz-UZ", {
          style: "currency",
          currency: "UZS",
          minimumFractionDigits: 0,
        }).format(Number(amount)),
    },
    {
      title: "Holati",
      dataIndex: "state",
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>To‘lovlar tarixi</Title>
      <Table
        dataSource={transactions}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default PaymentTransactionsPage;
