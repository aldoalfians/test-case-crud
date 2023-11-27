import React, { useEffect, useState } from "react";
import { MenuFoldOutlined } from "@ant-design/icons";
import {
  Layout,
  Button,
  theme,
  ConfigProvider,
  Grid,
  Drawer,
  Row,
  Col,
} from "antd";
import idID from "antd/lib/locale/id_ID";
import SiderMenu from "./SiderMenu";
import BrandLogo from "./BrandLogo";

const { Header, Sider, Content } = Layout;

type Props = {
  children: React.ReactNode;
};

export default function Dashboard({ children }: Props) {
  const {
    token: { colorWhite, colorBgBase, colorBgContainer },
  } = theme.useToken();

  const { md, lg } = Grid.useBreakpoint();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (!lg && !isCollapsed) {
      setIsCollapsed(true);
    } else if (lg && isCollapsed) {
      setIsCollapsed(false);
    }
  }, [lg]);

  const onTriggerClick = () => {
    if (md) {
      setIsCollapsed(!isCollapsed);
      return;
    }

    setIsDrawerOpen(true);
  };

  const _SiderContent = (
    <>
      <BrandLogo isCollapsed={isCollapsed} />
      <SiderMenu isCollapsed={isCollapsed} setIsDrawerOpen={setIsDrawerOpen} />
    </>
  );

  return (
    <ConfigProvider locale={idID}>
      <Layout hasSider>
        {md ? (
          <Sider
            style={{ background: colorWhite }}
            className={`AppRoute__sider ${
              isCollapsed ? "AppRoute__sider--collapsed" : ""
            }`}
            collapsed={isCollapsed}
            collapsible
            trigger={null}
          >
            {_SiderContent}
          </Sider>
        ) : (
          <Drawer
            style={{ background: colorBgBase }}
            className="AppRoute__drawer"
            placement="left"
            visible={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            {_SiderContent}
          </Drawer>
        )}
        <Layout
          className="AppRoute__layout-content"
          style={{
            ...(!md && { marginLeft: 0 }),
            background: colorBgContainer,
          }}
        >
          <Header className="AppRoute__header">
            <Row justify="space-between" align="middle">
              <Col>
                <Button
                  type="text"
                  icon={<MenuFoldOutlined />}
                  onClick={onTriggerClick}
                />
              </Col>
            </Row>
          </Header>
          <Content
            style={{ background: colorBgContainer }}
            className="AppRoute__content"
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
