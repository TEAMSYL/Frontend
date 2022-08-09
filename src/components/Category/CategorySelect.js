import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CATEGORY } from "./CategoryInfo";
export default function CategorySelect({ category, setCategory }) {
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, maxWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel size="small">카테고리</InputLabel>
        <Select
          size="small"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          {CATEGORY.map((category) => (
            <MenuItem size="small" key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
