import { Space } from "antd";
import ButtonCustom from "../../../customAntd/ButtonCustom";
import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface IProps {}

export const Handle: React.FC<IProps> = ({}) => {
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
  const [openModalThemMoi, setOpenModalThemMoi] = useState<boolean>(false);

  return (
    <>
      <div className="button-bottom-wrapper">
        <Space size={10} className="space-button">
          <ButtonCustom
            onClick={() => {
              setOpenModalThemMoi(true);
            }}
          >
            Thêm mới
          </ButtonCustom>
          <ButtonCustom>Cập nhật</ButtonCustom>
          <ButtonCustom>Xoá</ButtonCustom>
        </Space>
      </div>
      {false && (
        <Dialog
          open={true}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpenModalThemMoi(false)}
          aria-describedby="alert-dialog-slide-description"
          maxWidth={"xl"}
          fullWidth={true}
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <div>Thêm mới hồ sơ CMND 9 số</div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModalThemMoi(false)}>Disagree</Button>
            <Button onClick={() => setOpenModalThemMoi(false)}>Agree</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
