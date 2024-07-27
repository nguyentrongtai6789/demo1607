import { useTranslation } from "react-i18next";
import "./styles.scss";

export default () => {
  const { t } = useTranslation("dictionnary");

  return (
    <div className="page-404">
      <div>
        <div style={{ fontSize: "100px", fontWeight: "500" }}>404</div>
        <div
          style={{ fontSize: "30px", fontWeight: "500", fontStyle: "italic" }}
        >
          {t("Not Found")}
        </div>
      </div>
    </div>
  );
};
