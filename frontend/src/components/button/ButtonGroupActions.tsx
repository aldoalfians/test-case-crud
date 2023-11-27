import { Button, Col, Row, Space } from "antd";
import { useNavigate } from "react-router-dom";

type Props = {
  goBackPathname: string;
  isSubmitting?: boolean;
};

function ButtonGroupActions({ goBackPathname, isSubmitting }: Props) {
  const navigate = useNavigate();

  return (
    <Row justify="center">
      <Col>
        <Space>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Simpan
          </Button>
          <Button
            type="text"
            onClick={() => navigate(goBackPathname)}
            disabled={isSubmitting}
          >
            Batal
          </Button>
        </Space>
      </Col>
    </Row>
  );
}

export default ButtonGroupActions;
