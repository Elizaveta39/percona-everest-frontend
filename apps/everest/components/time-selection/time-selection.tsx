import { Alert, Box, MenuItem } from '@mui/material';
import { SelectInput } from '@percona/ui-lib.form.inputs.select';
import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { HoursField } from './fields/hours-field';
import { MonthsField } from './fields/months-field';
import { TimeFields } from './fields/time-fields';
import { WeeksField } from './fields/weeks-field';
import { Messages } from './time-selection.messages';
import {
  TimeSelectionProps,
  TimeValue,
  timeValueHumanized,
} from './time-selection.types';
import { getTimeText } from './time-selection.utils';

export const TimeSelection = ({
  showInfoAlert,
  sx,
  sxTimeFields,
}: TimeSelectionProps) => {
  const { watch } = useFormContext();
  const selectedTime: TimeValue = watch('selectedTime');
  const minute: number = watch('minute');
  const hour: number = watch('hour');
  const amPm: string = watch('amPm');
  const weekDay: string = watch('weekDay');
  const onDay: number = watch('onDay');

  const timeInfoText = useMemo(
    () =>
      showInfoAlert
        ? getTimeText(selectedTime, hour, minute, amPm, weekDay, onDay)
        : '',
    [selectedTime, hour, minute, amPm, weekDay, onDay, showInfoAlert]
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 2,
          ...sx,
        }}
      >
        <SelectInput
          name="selectedTime"
          selectFieldProps={{
            sx: { minWidth: '120px' },
          }}
        >
          {Object.values(TimeValue).map((value) => (
            <MenuItem key={value} value={value}>
              {timeValueHumanized[value]}
            </MenuItem>
          ))}
        </SelectInput>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
            ...sxTimeFields,
          }}
        >
          {selectedTime === TimeValue.hours && <HoursField />}
          {selectedTime === TimeValue.weeks && <WeeksField />}
          {selectedTime === TimeValue.months && <MonthsField />}
          {(selectedTime === TimeValue.days ||
            selectedTime === TimeValue.weeks ||
            selectedTime === TimeValue.months) && <TimeFields />}
        </Box>
      </Box>
      {showInfoAlert && (
        <Alert severity="info">{Messages.infoText(timeInfoText)}</Alert>
      )}
    </>
  );
};
