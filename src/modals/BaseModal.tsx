import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const footerStyle = {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  marginTop: 35,
};

type TAddSectionModal = {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitDisabled?: boolean;
};

export default function BaseModal({
  visible,
  onClose,
  children,
  title,
  onSubmit,
  submitDisabled = false,
}: TAddSectionModal) {
  return (
    <Modal open={visible} onClose={onClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        {children}

        {onSubmit && typeof onSubmit === "function" && (
          <Box style={footerStyle}>
            <Button
              disabled={submitDisabled}
              variant="contained"
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
