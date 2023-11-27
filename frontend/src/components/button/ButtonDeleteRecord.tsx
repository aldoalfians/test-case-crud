import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

type Props = { onClick: any; loading: boolean };

function ButtonDeleteRecord({ onClick, loading }: Props) {
  return (
    <Button
      shape="circle"
      type="text"
      htmlType="button"
      danger
      icon={<DeleteOutlined />}
      onClick={onClick}
      loading={loading}
    />
  );
}

export default ButtonDeleteRecord;
