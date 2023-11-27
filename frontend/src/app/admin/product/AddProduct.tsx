import { Form, Input, Select } from "antd";
import FormContainer from "../../../components/forms/FormContainer";
import FormGeneric from "../../../components/forms/FormGeneric";
import Dashboard from "../../../components/main-layout/Dashboard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { postProduct } from "../../../features/products/productSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const { Option } = Select;
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { userToken } = useAppSelector((state) => state.auth);
  const { isLoading, isSuccess } = useAppSelector((state) => state.products);
  const [categories, setCategories] = useState({
    data: [],
  });

  const onFinish = (values: any) => {
    console.log("Success:", values);
    dispatch(postProduct(values));

    isSuccess && navigate("/admin/product");
  };

  const getCategory = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await axios.get(
      "http://localhost:5506/api/category",
      config
    );

    const { data } = response;
    setCategories({
      data,
    });
    return response;
  };

  useEffect(() => {
    getCategory();
  }, []);

  console.log(categories);

  return (
    <Dashboard>
      <FormContainer title="Tambah Data Produk">
        <FormGeneric
          goBackPathname="/admin/product"
          onFinish={onFinish}
          isSubmitting={isLoading}
        >
          <Form.Item name="plu" label="PLU" rules={[{ required: true }]}>
            <Input placeholder="Masukan PLU" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Nama Produk"
            rules={[{ required: true }]}
          >
            <Input placeholder="Masukan Nama Produk" />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Jenis Kategori"
            rules={[{ required: true }]}
          >
            <Select placeholder="Pilih Jenis Kategori">
              {categories?.data?.map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </FormGeneric>
      </FormContainer>
    </Dashboard>
  );
}
