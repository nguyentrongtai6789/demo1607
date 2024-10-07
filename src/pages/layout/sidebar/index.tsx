import { Menu, MenuProps } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default () => {
  type MenuItem = Required<MenuProps>["items"][number];

  // const menu = JSON.parse(localStorage.getItem("userInfo") || "[]").menu;

  const [menu, setMenu] = useState<any[]>([]);

  const [selectedKey, setSelectedKey] = useState<string>("");

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setMenu(userInfo.menu);
    }
  }, [userInfo]);

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
      for (let j = 0; j <= menu[i]?.children?.length - 1; j++) {
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
