import { Menu, MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import { Link } from "react-router-dom";

export default () => {
  type MenuItem = Required<MenuProps>["items"][number];

  const { t } = useTranslation("sidebarMenu");

  const danhSachChucNang = JSON.parse(
    localStorage.getItem("danhSachChucNang") || "[]"
  );

  const itemsDemo: MenuItem[] = danhSachChucNang.map((item: any) => ({
    key: item.key,
    label: item.title,
    children: item.children.map((item: any) => ({
      key: item.key,
      label: (
        <Link to={`${process.env.PUBLIC_URL}${item.url}`}>{item.title}</Link>
      ),
    })),
  }));

  return (
    <>
      <div className="side-bar-custom">
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
          items={itemsDemo}
          triggerSubMenuAction={"click"}
        />
      </div>
    </>
  );
};
