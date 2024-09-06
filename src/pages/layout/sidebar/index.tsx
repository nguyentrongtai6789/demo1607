import { Menu, MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default () => {
  type MenuItem = Required<MenuProps>["items"][number];

  const { t } = useTranslation("sidebarMenu");

  const danhSachChucNang = JSON.parse(
    localStorage.getItem("danhSachChucNang") || "[]"
  );

  const [selectedKey, setSelectedKey] = useState<string>("");

  const itemsDemo: MenuItem[] = danhSachChucNang.map((item: any) => ({
    key: item.key,
    label: item.title,
    children: item.children.map((item2: any) => ({
      key: item2.key,
      label: (
        <Link to={`${process.env.PUBLIC_URL}${item2.url}`}>{item2.title}</Link>
      ),
    })),
  }));

  const baseUrl = window.location.pathname;

  const checkOpenKey = () => {
    for (let i = 0; i <= danhSachChucNang.length - 1; i++) {
      for (let j = 0; j <= danhSachChucNang[i].children.length - 1; j++) {
        if (baseUrl.includes(danhSachChucNang[i].children[j].url)) {
          setSelectedKey(danhSachChucNang[i].children[j].key);
          return;
        }
      }
    }
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setSelectedKey(e.keyPath[0]);
  };

  useEffect(() => {
    checkOpenKey();
  }, []);

  return (
    <>
      <div className="side-bar-custom">
        <Menu
          selectedKeys={[selectedKey]}
          mode="inline"
          theme="light"
          items={itemsDemo}
          triggerSubMenuAction={"hover"}
          onClick={onClick}
        />
      </div>
    </>
  );
};
