import React, { useEffect, useState } from "react";
import { Layout, Menu, Typography, Descriptions, Spin, message } from "antd";
import { UserOutlined, LogoutOutlined, EditOutlined } from "@ant-design/icons";
import ProfileEditModal from "../../component/ProfileEditModal";
import axios from "axios";
import "./index.css";
import { Link } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title } = Typography;

type ProfileData = {
  id: number;
  name: string;
  email: string;
  balance: string;
};

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        message.error("Please log in first.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://tech-awards.codearch.uz/api/user/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setProfile(response.data.result);
          localStorage.setItem("user", JSON.stringify(response.data.result));
        } else {
          const localUser = localStorage.getItem("user");
          if (localUser) {
            setProfile(JSON.parse(localUser));
            message.info("Loaded offline data.");
          } else {
            message.error("Failed to load profile data.");
          }
        }
      } catch {
        const localUser = localStorage.getItem("user");
        if (localUser) {
          setProfile(JSON.parse(localUser));
          message.info("Server unavailable. Loaded local data.");
        } else {
          message.error("Error connecting to the server.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (updatedValues: {
    name?: string;
    email?: string;
    balance?: string;
    password?: string;
  }) => {
    const token = localStorage.getItem("token");

    const payload = { ...updatedValues };
    if (!payload.password) {
      delete payload.password;
    }

    try {
      const response = await axios.put(
        "https://tech-awards.codearch.uz/api/user/update",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        message.success("Profile updated successfully!");

        const updatedProfile = {
          ...profile!,
          ...payload,
        };

        setProfile(updatedProfile);
        localStorage.setItem("user", JSON.stringify(updatedProfile));
        setIsModalOpen(false);
      } else {
        message.error("Update failed.");
      }
    } catch {
      message.error("Server connection error.");
      console.error("Update error");
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      message.warning("You are not logged in.");
      return;
    }

    try {
      await axios.post(
        "https://tech-awards.codearch.uz/api/user/logout",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("You have been logged out.");
    } catch {
      message.error("Logout failed.");
      console.error("Logout error");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  return (
    <Layout className="profile-layout">
      <Sider width={250} className="profile-sidebar">
        <div className="profile-logo">
          <Link to="/">TillaPay</Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="profile-menu"
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            My Profile
          </Menu.Item>

          <Menu.Item
            key="6"
            icon={<LogoutOutlined />}
            danger
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content className="profile-content">
          <Title level={3} className="profile-title">
            My Profile
          </Title>

          {loading ? (
            <Spin tip="Loading..." />
          ) : profile ? (
            <Descriptions
              layout="vertical"
              column={2}
              bordered
              className="profile-descriptions"
            >
              <Descriptions.Item label="User ID">
                {profile.id}
              </Descriptions.Item>
              <Descriptions.Item label="Full Name">
                {profile.name}
                <EditOutlined
                  onClick={() => setIsModalOpen(true)}
                  style={{ marginLeft: 8, cursor: "pointer", color: "#1890ff" }}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {profile.email}
              </Descriptions.Item>
              <Descriptions.Item label="Account Balance">
                {new Intl.NumberFormat("uz-UZ", {
                  style: "currency",
                  currency: "UZS",
                  minimumFractionDigits: 0,
                }).format(Number(profile.balance))}
                <EditOutlined
                  onClick={() => setIsModalOpen(true)}
                  style={{ marginLeft: 8, cursor: "pointer", color: "#1890ff" }}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Password">
                <p>Change password</p>
                <EditOutlined
                  onClick={() => setIsModalOpen(true)}
                  style={{ marginLeft: 8, cursor: "pointer", color: "#1890ff" }}
                />
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <p>No profile data found.</p>
          )}
        </Content>

        {profile && (
          <ProfileEditModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleUpdate}
            initialValues={{
              name: profile.name,
              email: profile.email,
              balance: profile.balance,
            }}
          />
        )}
      </Layout>
    </Layout>
  );
};

export default ProfilePage;
