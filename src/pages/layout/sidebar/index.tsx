import {
  AppstoreOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps, Tooltip } from "antd";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import "./styles.scss";

export default () => {
  type MenuItem = Required<MenuProps>["items"][number];

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { t, i18n } = useTranslation("sidebarMenu");

  const items: MenuItem[] = [
    {
      key: "0",
      icon: collapsed ? (
        <MenuUnfoldOutlined onClick={toggleCollapsed} />
      ) : (
        <MenuFoldOutlined onClick={toggleCollapsed} />
      ),
      label: (
        <div onClick={toggleCollapsed}>
          {collapsed ? "Mở rộng menu" : "Thu gọn menu"}
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <Tooltip
          title={t("MANAGING BIOMETRIC MATCHING REQUESTS")}
          overlayStyle={{ textTransform: "uppercase" }}
          placement="topLeft"
        >
          {t("MANAGING BIOMETRIC MATCHING REQUESTS")}
        </Tooltip>
      ),
      icon: <MailOutlined />,
      children: [
        {
          key: "1",
          label: (
            <Tooltip
              title={t("Create a biometric match request")}
              placement="topLeft"
              overlayStyle={{ textTransform: "uppercase" }}
            >
              {t("Create a biometric match request")}
            </Tooltip>
          ),
        },
        {
          key: "2",
          label: (
            <Tooltip
              title={t("Get biometric match results")}
              placement="topLeft"
              overlayStyle={{ textTransform: "uppercase" }}
            >
              {t("Get biometric match results")}
            </Tooltip>
          ),
        },
        {
          key: "3",
          label: (
            <Tooltip
              placement="topLeft"
              overlayStyle={{ textTransform: "uppercase" }}
              title={t(
                "Send biometric matching results to digital document management and processing software"
              )}
            >
              {t(
                "Send biometric matching results to digital document management and processing software"
              )}
            </Tooltip>
          ),
        },
      ],
    },
    {
      key: "sub2",
      label: t("PROCESSING OF DOCUMENTS"),
      icon: <AppstoreOutlined />,
      children: [
        {
          key: "1",
          label: (
            <Tooltip
              placement="topLeft"
              overlayStyle={{ textTransform: "uppercase" }}
              title={t(
                "RECONTROLLING CITIZEN INFORMATION WITH THE CITIZEN IDENTIFICATION SYSTEM"
              )}
            >
              {t(
                "RECONTROLLING CITIZEN INFORMATION WITH THE CITIZEN IDENTIFICATION SYSTEM"
              )}
            </Tooltip>
          ),
        },
        {
          key: "2",
          label: (
            <Tooltip
              placement="topLeft"
              overlayStyle={{ textTransform: "uppercase" }}
              title={t(
                "CONTROL OF SUBJECT INFORMATION WITH THE CITIZEN IDENTIFICATION SYSTEM"
              )}
            >
              {t(
                "CONTROL OF SUBJECT INFORMATION WITH THE CITIZEN IDENTIFICATION SYSTEM"
              )}
            </Tooltip>
          ),
        },
        {
          key: "3",
          label: (
            <Tooltip
              placement="topLeft"
              overlayStyle={{ textTransform: "uppercase" }}
              title={t(
                "CONTROL CITIZEN INFORMATION WITH THE NATIONAL POPULATION DATABASE SYSTEM"
              )}
            >
              {t(
                "CONTROL CITIZEN INFORMATION WITH THE NATIONAL POPULATION DATABASE SYSTEM"
              )}
            </Tooltip>
          ),
        },
        {
          key: "4",
          label: (
            <Tooltip
              placement="topLeft"
              overlayStyle={{ textTransform: "uppercase" }}
              title={t(
                "SENDING 9-NUMBER ID CARD PROFILE AFTER APPROVAL OF CONSOLIDATION TO DATA MINING SOFTWARE"
              )}
            >
              {t(
                "SENDING 9-NUMBER ID CARD PROFILE AFTER APPROVAL OF CONSOLIDATION TO DATA MINING SOFTWARE"
              )}
            </Tooltip>
          ),
        },
      ],
    },
  ];
  return (
    <>
      <div className="sider-bar-custom">
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
    </>
  );
};
