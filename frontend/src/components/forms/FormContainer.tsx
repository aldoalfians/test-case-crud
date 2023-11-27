import { Col, Row, Typography } from "antd";
import { PropsWithChildren } from "react";

type Props = {
  title?: string;
};

export default function FormContainer({
  children,
  title,
}: PropsWithChildren<Props>) {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "var(--border-radius-base)",
            padding: "24px 16px",
            minHeight: "calc(100vh - 150px)",
          }}
        >
          {title && (
            <>
              <Typography.Title level={4}>{title}</Typography.Title>
              <br />
            </>
          )}
          {children}
        </div>
      </Col>
    </Row>
  );
}
