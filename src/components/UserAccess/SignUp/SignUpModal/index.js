import * as React from "react";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import Button from "@mui/material/Button";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  p: 2,
  px: 4,
  pb: 3,
};

export default function SignUpModal(props) {
  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={true}
        onClose={props.onClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <h2 id="unstyled-modal-title">Please read the following</h2>
          <p id="unstyled-modal-description">
            Something cool like "Don't be evil".
          </p>
          <Button variant="outlined" onClick={props.onSignUp}>
            Confirm Signup
          </Button>
        </Box>
      </StyledModal>
    </div>
  );
}
