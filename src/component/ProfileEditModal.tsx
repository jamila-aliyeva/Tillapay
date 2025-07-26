import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: {
    name?: string;
    email?: string;
    balance?: string;
    password?: string;
  }) => void;
  initialValues: {
    name: string;
    email: string;
    balance: string;
  };
};

const ProfileEditModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  return (
    <Modal
      open={open}
      title="Ma'lumotlarni tahrirlash"
      okText="Saqlash"
      cancelText="Bekor qilish"
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item name="name" label="F.I.Sh." rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>

        <Form.Item name="balance" label="Hisob balansi">
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Yangi parol"
          rules={[
            {
              min: 8,
              message: "password minimal langth is eight!",
            },
          ]}
        >
          <Input.Password placeholder="Enter if you want to make changes" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProfileEditModal;
