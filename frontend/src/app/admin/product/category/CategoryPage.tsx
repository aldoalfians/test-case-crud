/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import Dashboard from "../../../../components/main-layout/Dashboard";
import TableGenric from "../../../../components/table/TableGeneric";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchCategories } from "../../../../features/products/categorySlice";

export default function CategoryPage() {
  const dispatch = useAppDispatch();
  const { categories, isLoading } = useAppSelector((state) => state.category);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "category",
      key: "category",
      render: (_, records) => (
        <span>{records.active !== false ? "Aktif" : "Tidak Aktif"}</span>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Dashboard>
      {isLoading ? (
        "Loading"
      ) : (
        <TableGenric
          columns={columns}
          dataSource={categories}
          loading={isLoading}
          loadingButton={isLoading}
        />
      )}
    </Dashboard>
  );
}
