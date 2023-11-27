import { Button, Card, Col, Input, Row, Form, Typography } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "./hooks";
import { LoginUser } from "../features/users/authSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { isLoading, user, userToken } = useAppSelector((state) => state.auth);

  const onFinish = (values: never) => {
    console.log("Success:", values);
    dispatch(LoginUser(values));
  };

  return (
    <div className="LoginRoute__container">
      <Card className="LoginRoute__card">
        <Row gutter={[16, 24]}>
          <Col span={24} style={{ textAlign: "center" }}>
            <Typography.Title level={2} style={{ margin: 0 }}>
              Superindo
            </Typography.Title>
          </Col>
          <Col span={24}>
            <Form onFinish={onFinish}>
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Masukan Username!" }]}
                style={{ marginBottom: 8 }}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  className="LoginRoute__input"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Masukan Password!" }]}
                style={{ marginBottom: 16 }}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  className="LoginRoute__input"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="LoginRoute__button"
                loading={isLoading}
              >
                Masuk
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
