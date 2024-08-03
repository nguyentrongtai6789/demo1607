import { Space } from "antd";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonCustom from "../../customAntd/ButtonCustom";
import { ISearchValues, SearchForm } from "./components/SearchForm";
import TableResults from "./components/TableResults";

export default () => {
  const { t } = useTranslation(["dictionnary"]);
  const [searchValues, setSearchValues] = useState<ISearchValues | null>(null);
  // const handleSearch = async (values: ISearchValues) => {
  //   dispatch(handleLoading());
  //   await httpMethod
  //     .post(timKiem, values)
  //     .then((res: any) => {
  //       if (res?.data?.code === 200) {
  //         setData(res?.data?.data);
  //         console.log("asd");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       setTimeout(() => {
  //         dispatch(loadingCancel());
  //       }, 2000);
  //     });
  // };

  return (
    <Fragment>
      <div className="div-wrap-content">
        <div className="wrap-content-child">
          <div className="title-page">quản lý hồ sơ cmnd 9 số</div>
          <SearchForm setSearchValues={setSearchValues} />
          <TableResults searchValues={searchValues} />
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
