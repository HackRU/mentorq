import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Box
} from "@material-ui/core";



function Input ({label, value, type, onChange,inputProps,error}){
  
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
        inputProps={{ maxLength: 255 }}
      />
    </Box>
  );
}

export { Input };
