import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
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

  const { t } = useTranslation("sidebarMenu");

  const items: MenuItem[] = [
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
          key: "11",
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
          key: "12",
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
          key: "13",
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
          key: "21",
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
          key: "22",
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
          key: "23",
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
          key: "3",
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
        {
          key: "3",
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
        {
          key: "3",
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
        {
          key: "3",
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
        {
          key: "3",
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
        {
          key: "3",
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
        {
          key: "3",
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
        {
          key: "3",
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
        {
          key: "3",
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
        {
          key: "3",
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
      <div className="side-bar-custom">
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
          triggerSubMenuAction={"click"}
        />
      </div>
    </>
  );
};
