import { Grid, Menu } from "antd";
import React, { useEffect, useState } from "react";
import {
  HomeOutlined,
  ProjectOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = {
  pathname: string;
  title: string;
  icon?: React.ReactNode;
  subMenus?: Array<MenuItem>;
};

const MENU_ITEMS: Array<MenuItem> = [
  {
    icon: <HomeOutlined />,
    title: "Dashboard",
    pathname: "/admin",
  },
  {
    icon: <ProjectOutlined />,
    title: "Produk",
    pathname: "/admin/product",
  },
  {
    icon: <AppstoreOutlined />,
    title: "Produk Kategori",
    pathname: "/admin/category",
  },
];

export default function SiderMenu({
  isCollapsed,
  setIsDrawerOpen,
}: {
  isCollapsed: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
}) {
  const { SubMenu } = Menu;

  const { md, lg } = Grid.useBreakpoint();
  const isMediumScreen = md && !lg;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [selectedKeys, setSelectedKeys] = useState([MENU_ITEMS[0].pathname]);
  const [openKeys, setOpenKeys] = useState<string[] | null>(null);
  const splittedCurrPathname = pathname.toLowerCase().split("/");

  const isPathnameActive = (item: MenuItem, isSubPath = false): boolean => {
    const currPathMenus = splittedCurrPathname;
    const itemPathMenus = item.pathname.split("/");
    const compareIndex = isSubPath ? 3 : 2;

    return currPathMenus?.[compareIndex] === itemPathMenus?.[compareIndex];
  };

  const findActivePathname = (
    menus: MenuItem[],
    isSubPath = false
  ): [string, string | null] => {
    for (const item of menus) {
      if (item.subMenus) {
        const [activePathname] = findActivePathname(item.subMenus, true);

        if (activePathname) {
          return [activePathname, item.pathname];
        }
      }

      if (isPathnameActive(item, isSubPath)) {
        return [item.pathname, null];
      }
    }

    return ["", null];
  };

  useEffect(() => {
    const [activePathname, parentPathname] = findActivePathname(MENU_ITEMS);

    setSelectedKeys([activePathname]);
    setOpenKeys(parentPathname ? [parentPathname] : null);

    // if (parentPathname && !openKeys?.includes(parentPathname)) {
    // 	setOpenKeys((prevState) => [...(prevState || []), parentPathname]);
    // }
  }, [pathname]);

  return (
    <Menu
      style={{ height: "100%", padding: 4 }}
      {...(openKeys && isCollapsed && !isMediumScreen && { openKeys })}
      theme="light"
      mode="inline"
      selectedKeys={selectedKeys}
      onSelect={({ key: pathname }) => {
        setSelectedKeys([pathname]);
        navigate(pathname);
        if (!md) setTimeout(() => setIsDrawerOpen(false), 300);
      }}
      onOpenChange={(openKeys) => {
        setOpenKeys(openKeys);
      }}
    >
      {MENU_ITEMS.map(({ pathname, title, icon, subMenus }) =>
        subMenus ? (
          <SubMenu key={pathname} title={title} icon={icon}>
            {subMenus.map(
              ({ pathname: subPathname, title: subTitle, icon: subIcon }) => (
                <Menu.Item key={subPathname} icon={subIcon}>
                  {subTitle}
                </Menu.Item>
              )
            )}
          </SubMenu>
        ) : (
          <Menu.Item key={pathname} icon={icon}>
            {title}
          </Menu.Item>
        )
      )}
    </Menu>
  );
}
