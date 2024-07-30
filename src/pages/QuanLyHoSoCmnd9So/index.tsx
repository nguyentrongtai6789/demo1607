import { useTranslation } from "react-i18next";
import { SearchForm } from "./components/SearchForm";
import TableResults from "./components/TableResults";
import ButtonCustom from "../../customAntd/ButtonCustom";
import { Space } from "antd";
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default () => {
  const { t } = useTranslation(["dictionnary"]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="title-page">quản lý hồ sơ cmnd 9 số</div>
      <SearchForm />
      <TableResults />
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Slide in alert dialog
        </Button>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          TransitionComponent={Transition}
        >
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <div className="button-bottom-wrapper">
        <Space size={10}>
          <ButtonCustom>Thêm mới</ButtonCustom>
          <ButtonCustom>Cập nhật</ButtonCustom>
          <ButtonCustom>Xoá</ButtonCustom>
        </Space>
      </div>
    </div>
  );
};
