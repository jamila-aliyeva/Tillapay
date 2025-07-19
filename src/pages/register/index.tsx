import React from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import "./index.css";

const { Title } = Typography;

const RegisterPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Submitted values:", values);
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
            name="confirm"
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
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
