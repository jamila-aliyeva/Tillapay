import React, { useEffect, useState } from "react";
import { Layout, Menu, Typography, Descriptions, Spin, message } from "antd";
import {
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons";
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
        message.error("Avval tizimga kiring.");
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
            message.info("Offline ma'lumotlar yuklandi.");
          } else {
            message.error("Foydalanuvchi ma'lumotlarini olishda xatolik");
          }
        }
      } catch (error) {
        const localUser = localStorage.getItem("user");
        if (localUser) {
          setProfile(JSON.parse(localUser));
          message.info("Server javob bermadi, local ma'lumot yuklandi.");
        } else {
          message.error("Serverga murojaatda xatolik yuz berdi");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (updatedValues: any) => {
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
        message.success("Ma'lumotlar yangilandi!");

        const updatedProfile = {
          ...profile!,
          ...payload,
        };

        setProfile(updatedProfile);

        localStorage.setItem("user", JSON.stringify(updatedProfile));

        setIsModalOpen(false);
      } else {
        message.error("Yangilashda xatolik");
      }
    } catch (error) {
      message.error("Server bilan ulanishda xatolik");
      console.error(error);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      message.warning("Siz tizimga kirmagansiz.");
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

      message.success("Tizimdan chiqdingiz!");
    } catch (error) {
      message.error("Chiqishda xatolik yuz berdi");
      console.error("Logout error:", error);
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
            Mening profilim
          </Menu.Item>
          <Menu.Item key="2" icon={<BellOutlined />}>
            Xabarnomalar
          </Menu.Item>
          <Menu.Item
            key="6"
            icon={<LogoutOutlined />}
            danger
            onClick={handleLogout}
          >
            Chiqish
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content className="profile-content">
          <Title level={3} className="profile-title">
            Mening profilim
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
              <Descriptions.Item label="ID">{profile.id}</Descriptions.Item>
              <Descriptions.Item label="F.I.Sh.">
                {profile.name}
                <EditOutlined
                  onClick={() => setIsModalOpen(true)}
                  style={{ marginLeft: 8, cursor: "pointer", color: "#1890ff" }}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {profile.email}
              </Descriptions.Item>
              <Descriptions.Item label="Hisob balansi">
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
              <Descriptions.Item label="Parol">
                <p>Parolni o'zgartirish</p>
                <EditOutlined
                  onClick={() => setIsModalOpen(true)}
                  style={{ marginLeft: 8, cursor: "pointer", color: "#1890ff" }}
                />
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <p>Ma'lumot topilmadi</p>
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
