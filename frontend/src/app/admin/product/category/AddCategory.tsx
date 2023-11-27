import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { postCategory } from "../../../../features/products/categorySlice";
import Dashboard from "../../../../components/main-layout/Dashboard";
import FormContainer from "../../../../components/forms/FormContainer";
import FormGeneric from "../../../../components/forms/FormGeneric";

export default function AddCategory() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useAppSelector((state) => state.category);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    dispatch(postCategory(values));

    isSuccess && navigate("/admin/category");
  };

  return (
    <Dashboard>
      <FormContainer title="Tambah Data Produk">
        <FormGeneric
          goBackPathname="/admin/category"
          onFinish={onFinish}
          isSubmitting={isLoading}
        >
          <Form.Item
            name="name"
            label="Nama Kategori"
            rules={[{ required: true }]}
          >
            <Input placeholder="Masukan Nama Kategori" />
          </Form.Item>
        </FormGeneric>
      </FormContainer>
    </Dashboard>
  );
}
