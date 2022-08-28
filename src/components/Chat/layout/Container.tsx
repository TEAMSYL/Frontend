import { Stack } from "@mui/material";
import React from "react";

interface ISectionProps {
  children: React.ReactNode;
}
const Container: React.FC<ISectionProps> = ({ children }: ISectionProps) => {
  return (
    <Stack
      sx={{
        padding: "20px 30px",
      }}
      direction="column"
      alignItems="stretch"
      flex={1}
    >
      {children}
    </Stack>
  );
};
export default Container;
