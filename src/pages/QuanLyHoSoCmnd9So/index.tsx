import { useTranslation } from "react-i18next";
import { ISearchValues, SearchForm } from "./components/SearchForm";
import ButtonCustom from "../../customAntd/ButtonCustom";
import { Row, Space } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useAppDispatch } from "../../redux/store";
import { handleLoading, loadingCancel } from "../../redux/authSlice";
import httpMethod from "../../config/httpMethod";
import { timKiem } from "./api";
import TableResults from "./components/TableResults";

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
  const dispatch = useAppDispatch();

  //demoModal
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //tìm kiếm
  //giá trị tìm kiếm
  const [searchValues, setSearchValues] = useState<ISearchValues | null>(null);
  //dữ liệu trả về
  const [data, setData] = useState<any[]>([]);
  //handle
  const handleSearch = async (values: ISearchValues) => {
    dispatch(handleLoading());
    await httpMethod
      .post(timKiem, values)
      .then((res: any) => {
        if (res?.data?.code === 200) {
          setData(res?.data?.data);
          console.log("asd");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(loadingCancel());
        }, 2000);
      });
  };

  useEffect(() => {
    if (!searchValues) return;
    handleSearch(searchValues);
  }, [searchValues]);

  return (
    <Fragment>
      <div className="div-wrap-content">
        <div className="wrap-content-child">
          <div className="title-page">quản lý hồ sơ cmnd 9 số</div>
          <SearchForm setSearchValues={setSearchValues} />
          <TableResults data={data} />
          {/* <React.Fragment>
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
                  anonymous location data to Google, even when no apps are
                  running.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose}>Agree</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment> */}
          <div className="button-bottom-wrapper">
            <Space size={10} className="space-button">
              <ButtonCustom>Thêm mới</ButtonCustom>
              <ButtonCustom>Cập nhật</ButtonCustom>
              <ButtonCustom>Xoá</ButtonCustom>
            </Space>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
