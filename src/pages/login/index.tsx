import { Form, Input, Button, Typography, Card } from "antd";
import "./index.css"; // CSS fayl nomi

const { Title } = Typography;

const LoginPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Login qiymatlari:", values);
    // Bu yerda login API chaqiriladi
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
            <Button type="primary" htmlType="submit" className="login-button">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
