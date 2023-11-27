import { Form, Input, Select } from "antd";
import FormContainer from "../../../components/forms/FormContainer";
import FormGeneric from "../../../components/forms/FormGeneric";
import Dashboard from "../../../components/main-layout/Dashboard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  editProduct,
  fetchProductById,
  postProduct,
} from "../../../features/products/productSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { Option } = Select;
  const navigate = useNavigate();
  const { id } = useParams();
  const uuid = id as string;

  const dispatch = useAppDispatch();
  const { userToken } = useAppSelector((state) => state.auth);
  const { isLoading, isSuccess, product } = useAppSelector(
    (state) => state.products
  );
  const [categories, setCategories] = useState({
    data: [],
  });

  const onFinish = (values: any) => {
    console.log("Success:", values);
    dispatch(
      editProduct({
        uuid: id as string,
        values,
      })
    );

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
    dispatch(fetchProductById(uuid));
    getCategory();
  }, [dispatch, id]);

  console.log(product);

  return (
    <Dashboard>
      <FormContainer title="Ubah Data Produk">
        {isLoading ? (
          "Loading"
        ) : (
          <FormGeneric
            goBackPathname="/admin/product"
            onFinish={onFinish}
            isSubmitting={isLoading}
          >
            <Form.Item name="plu" label="PLU" initialValue={product?.plu}>
              <Input placeholder="Masukan PLU" />
            </Form.Item>
            <Form.Item
              name="name"
              label="Nama Produk"
              initialValue={product?.name}
            >
              <Input placeholder="Masukan Nama Produk" />
            </Form.Item>
            <Form.Item
              initialValue={product?.category.id}
              name="categoryId"
              label="Jenis Kategori"
            >
              <Select
                placeholder="Pilih Jenis Kategori"
                defaultValue={product?.category.name}
              >
                {categories?.data?.map((item: any) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </FormGeneric>
        )}
      </FormContainer>
    </Dashboard>
  );
}
