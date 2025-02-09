import { InputAdornment, OutlinedInput } from '@mui/material';
import React from 'react';
import { InputProps } from './input.types';

export function Input({
  value,
  setValue,
  units,
  dataTestId,
  ...props
}: InputProps) {
  return (
    <OutlinedInput
      sx={{
        '& .MuiInputBase-input': {
          textAlign: 'center',
        },
      }}
      inputProps={{
        min: 0,
        'data-testid': dataTestId,
      }}
      type="number"
      value={value ? value.toString() : value} // solve the leading zero problem from mui (https://github.com/mui/material-ui/issues/8380)
      onChange={(e) => setValue(Number(e.target.value))}
      endAdornment={<InputAdornment position="end">{units}</InputAdornment>}
      {...props}
    />
  );
}
