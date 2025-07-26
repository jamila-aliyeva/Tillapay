import { Form, Input, Button, Typography, Card } from "antd";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { loginUser } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const onFinish = async (values: any) => {
    console.log("yuborilayotgan values:", values);

    const result = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(result)) {
      toast.success("Muvaffaqiyatli tizimga kirildi!");
      const token = result.payload.token;
      localStorage.setItem("token", token);
      navigate("/profile");
    } else {
      toast.error(result.payload || "Xatolik yuz berdi");
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={3} className="login-title">
          Login
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
            className="custom-yellow-input"
          >
            <Input placeholder="example@gmail.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-button"
              loading={loading}
            >
              Login
            </Button>
            <p style={{ marginTop: "20px" }}>
              If you don't registered,
              <span>
                <Link
                  to="/register"
                  style={{ color: "#c28812", fontWeight: "600" }}
                >
                  Register
                </Link>
              </span>
            </p>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
