import { useEffect } from "react";
import { Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchConvertationList } from "../../store/convertationSlice";

const { Title } = Typography;

const ConvertationListPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { convertations, loading } = useSelector(
    (state: RootState) => state.convertation
  );

  useEffect(() => {
    dispatch(fetchConvertationList());
  }, [dispatch]);

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      render: (t: string) => (t === "buy" ? "Buy" : "Sell"),
    },
    { title: "Amount", dataIndex: "amount" },
    { title: "Result", dataIndex: "converted_amount" },
    {
      title: "Status",
      dataIndex: "status",
      render: (s: number) => ["Process", "Done", "Cancel"][s],
    },
  ];

  return (
    <div className="p-4">
      <Title level={3} style={{ textAlign: "center", margin: "20px" }}>
        Convertation
      </Title>
      <Table
        columns={columns}
        dataSource={convertations}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default ConvertationListPage;
