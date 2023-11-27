import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export const CustomerRoute = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (user !== null) {
    if (user?.role !== "OPERATOR") {
      return (
        <Suspense fallback={<div>Loading</div>}>
          <Outlet />
        </Suspense>
      );
    } else if (user.role === "OPERATOR") {
      return <Navigate to={"/admin"} />;
    }
  } else {
    return <Navigate to={"/login"} />;
  }
};

export const AdminRoute = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (user !== null && user?.role === "OPERATOR") {
    return (
      <Suspense fallback={<div>Loading</div>}>
        <Outlet />
      </Suspense>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};

export const GuestRoute = () => {
  const { user } = useAppSelector((state) => state.auth);
  return user === null ? (
    <Suspense fallback={<div>Loading</div>}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to={"/"} />
  );
};
