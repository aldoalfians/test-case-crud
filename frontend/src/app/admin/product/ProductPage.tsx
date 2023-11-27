/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import Dashboard from "../../../components/main-layout/Dashboard";
import TableGenric from "../../../components/table/TableGeneric";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  deleteProduct,
  fetchProducts,
} from "../../../features/products/productSlice";

export default function ProductPage() {
  const dispatch = useAppDispatch();
  const { products, isLoading, isDelete } = useAppSelector(
    (state) => state.products
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "PLU",
      dataIndex: "plu",
      key: "plu",
    },
    {
      title: "Kategori makanan",
      dataIndex: "category",
      key: "category",
      render: (_, records) => <span>{records.category.name}</span>,
    },
    {
      title: "Status",
      dataIndex: "category",
      key: "category",
      render: (_, records) => (
        <span>
          {records.category.active !== false ? "Aktif" : "Tidak Aktif"}
        </span>
      ),
    },
  ];

  useEffect(() => {
    if (isDelete) {
      dispatch(fetchProducts());
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, isDelete]);

  const deleteRecord = (records: any) => {
    const uuid = records?.uuid as string;

    dispatch(deleteProduct(uuid));
  };

  console.log(products);

  return (
    <Dashboard>
      {isLoading ? (
        "Loading"
      ) : (
        <TableGenric
          columns={columns}
          dataSource={products}
          loading={isLoading}
          loadingButton={isLoading}
          onClick={deleteRecord}
        />
      )}
    </Dashboard>
  );
}
