import React from "react";
import {
  TextField,
  Box
} from "@material-ui/core";



function Input({ label, value, type, onChange, inputProps, error }) {
  return (
    <Box my={2}>
      <TextField
        fullWidth
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        inputProps={inputProps}
        error={error}
      />
    </Box>
  );
}

export { Input };
