import { Menu, MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { isEmpty } from "lodash";

export default () => {
  type MenuItem = Required<MenuProps>["items"][number];

  const { t } = useTranslation("translation");

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const menu = JSON.parse(localStorage.getItem("userInfo") || "[]").menu;

  const [selectedKey, setSelectedKey] = useState<string>("");

  const items: MenuItem[] = !isEmpty(menu)
    ? menu.map((item: any) => ({
        key: String(item.key),
        label: item.name,
        children: item.children.map((item2: any) => ({
          key: String(item2.key),
          label: (
            <Link to={`${process.env.PUBLIC_URL}${item2.path}`}>
              {item2.name}
            </Link>
          ),
        })),
      }))
    : [];

  const baseUrl = useLocation().pathname;

  const checkOpenKey = () => {
    if (isEmpty(menu)) return;
    for (let i = 0; i <= menu.length - 1; i++) {
      for (let j = 0; j <= menu[i].children.length - 1; j++) {
        if (baseUrl.includes(menu[i].children[j].path)) {
          setSelectedKey(String(menu[i].children[j].key));
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

  if (isEmpty(menu)) {
    return <></>;
  }

  useEffect(() => {
    console.log(selectedKey);
  }, [selectedKey]);

  return (
    <>
      <div className="side-bar-custom">
        <Menu
          selectedKeys={[selectedKey]}
          mode="inline"
          theme="light"
          items={items}
          triggerSubMenuAction={"hover"}
          onClick={onClick}
        />
      </div>
    </>
  );
};
