import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Box
} from "@material-ui/core";

function Input ({label, value, type, onChange}){
  return (
    <Box my={2}>
      <TextField
        fullWidth
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        inputProps={{ maxLength: 200 }}
      />
    </Box>
  );
}

export { Input };
