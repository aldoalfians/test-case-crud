import { Button, Col, Grid, Row, Space, Table, TableProps, theme } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import ButtonDeleteRecord from "../button/ButtonDeleteRecord";

interface Props<T> extends TableProps<T> {
  columns: ColumnsType<T>;
  dataSource?: T[];
  onClick?: any;
  loading: boolean;
  loadingButton?: boolean;
}

export default function TableGenric<T extends { uuid?: string }>({
  columns,
  dataSource,
  loading,
  onClick,
  loadingButton,
}: Props<T>) {
  const navigate = useNavigate();
  const { sm } = Grid.useBreakpoint();

  console.log(dataSource);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={[8, 8]} justify="end">
          <Col>
            <Button
              {...(!sm && { size: "small" })}
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => navigate("./add")}
            >
              Tambah
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Table
          loading={loading}
          scroll={{ x: true }}
          size="middle"
          columns={[
            {
              width: 56,
              title: "No",
              dataIndex: "no",
              key: "no",
              onCell: () => ({ style: { textAlign: "center" } }),
              onHeaderCell: () => ({ style: { textAlign: "center" } }),
              render(_, __, index) {
                ++index;
                return index;
              },
            },
            ...columns,
            {
              width: 88,
              key: "action",
              fixed: "right",
              render: (_, records) => (
                <Space>
                  <Button
                    shape="circle"
                    type="text"
                    onClick={() => navigate(`./${records.uuid}`)}
                    icon={<EditOutlined />}
                  />
                  <ButtonDeleteRecord
                    onClick={() => onClick(records)}
                    loading={loadingButton}
                  />
                </Space>
              ),
            },
          ]}
          dataSource={dataSource}
          style={{ marginTop: "16px" }}
        />
      </Col>
    </Row>
  );
}
