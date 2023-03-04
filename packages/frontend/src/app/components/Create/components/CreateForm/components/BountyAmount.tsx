import { FieldProps } from 'formik';
import { Slider } from '@mui/material';
import { CreateProps } from '../CreateForm.interface';
import { ethers } from 'ethers';
import { useConfig } from '../../../../../shared/Config/Config';
import { isArray } from 'lodash';
export const BountyAmount: React.FC<FieldProps<CreateProps>> = ({
  field: { name, value },
  form: { setFieldValue },
}) => {
  const {
    bounty: { min, max, stepIncrement, defaultValue },
  } = useConfig();
  console.log(min, max);
  // console.log(ethers.formatEther(value.bounty || 0));

  const handleChange = (event: Event, value: number | number[]) => {
    console.log('value', value);
    if (isArray(value)) {
      setFieldValue(name, value[0]);
    } else {
      setFieldValue(name, value);
    }
  };

  const numberToTwoDecimals = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <Slider
      aria-label="Bounty Amount"
      defaultValue={defaultValue}
      step={stepIncrement}
      valueLabelDisplay="auto"
      onChange={handleChange}
      min={min}
      max={max}
      valueLabelFormat={(value) => `${numberToTwoDecimals(value)} ETH`}
    />
  );
};
