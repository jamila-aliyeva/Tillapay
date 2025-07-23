import React from "react";
import { Form, Input, Button, Typography, Card, message } from "antd";
import "./index.css";
import { registerUser } from "../../store/authSlice";
import type { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const onFinish = async (values: RegisterFormValues) => {
    console.log("yuborilayotgan value:", values);

    const result = await dispatch(registerUser(values));
    if (registerUser.fulfilled.match(result)) {
      message.success("Ro'yxatdan muvaffaqiyatli o'tildi!");
      localStorage.setItem(
        "registeredUser",
        JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );
      navigate("/profile");
    } else {
      message.error(result.payload || "Xatolik yuz berdi");
    }
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <Title level={3} className="register-title">
          Create Account
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
            className="custom-yellow-input"
          >
            <Input placeholder="Your full name" />
          </Form.Item>

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
            rules={[{ required: true, message: "Please enter a password!" }]}
            hasFeedback
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="password_confirmation"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-button"
              loading={loading}
            >
              Register
            </Button>
            <p style={{ marginTop: "20px", textAlign: "center" }}>
              if you registered,{" "}
              <Link
                to="/login"
                style={{
                  color: "#c28812",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Login
              </Link>
            </p>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
