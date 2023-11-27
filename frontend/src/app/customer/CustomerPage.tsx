import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import axios from "axios";
const { Header, Content } = Layout;

export default function CustomerPage() {
  const [current, setCurrent] = useState("/");
  const [products, setProucts] = useState({
    data: [],
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuProps["items"] = [
    {
      label: "Produk",
      key: "/",
      icon: <AppstoreOutlined />,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const getCategory = async () => {
    const response = await axios.get(
      "http://localhost:5506/api/products/public"
    );

    const { data } = response;
    setProucts({
      data,
    });
    return response;
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Layout className="layout" style={{ background: "#FFF" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          background: "#FFF",
        }}
      >
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          style={{ width: "100%" }}
        />
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
            padding: 8,
          }}
        >
          <div style={{ display: "flex", gap: 16 }}>
            {products?.data?.map((item: any) => (
              <div style={{ padding: 8, background: "#f9f9f9" }}>
                <p>{item.name}</p>
                <p>{item.plu}</p>
                <p>{item.category.name}</p>
                <p>{item.category.active && "Aktif"}</p>
              </div>
            ))}
          </div>
        </div>
      </Content>
    </Layout>
  );
}
