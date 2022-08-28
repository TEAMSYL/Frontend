import React from "react";
import { Paper, PaperProps, SxProps, Theme } from "@mui/material";

const defaultSectionSx: SxProps<Theme> = {
  overflowX: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  padding: "30px",
  border: "1px solid",
  borderColor: "lightGray",
  borderRadius: "3px",
};

const Section: React.FC<PaperProps> = ({ sx, children }: PaperProps) => {
  const overrideSx = { ...defaultSectionSx, ...sx };

  return (
    <Paper elevation={0} sx={overrideSx}>
      {children}
    </Paper>
  );
};

export default Section;
