import { FieldProps } from 'formik';
import { Slider, FormLabel } from '@mui/material';
import { CreateProps } from '../CreateForm.interface';
import { useConfig } from '../../../../../shared/Config/Config';
import { isArray } from 'lodash';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SliderCell = styled.div`
  flex: 3;
  padding-right: 1rem;
`;

const BountyCell = styled.div`
  flex: 1;
  padding-left: 1rem;
`;

const BountySize = styled.p`
  font-size: 3rem;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
`;

export const BountyAmount: React.FC<FieldProps<CreateProps>> = ({
  field: { name },
  form: { setFieldValue, values },
}) => {
  const {
    bounty: { min, max, stepIncrement },
  } = useConfig();

  const handleChange = (event: Event, value: number | number[]) => {
    if (isArray(value)) {
      setFieldValue(name, value[0]);
    } else {
      setFieldValue(name, value);
    }
  };

  const numberToTwoDecimals = (value: number) => {
    return value.toFixed(2);
  };

  const formatValueLabel = (value = 0) => `${numberToTwoDecimals(value)}Ξ`;

  return (
    <Row>
      <SliderCell>
        <FormLabel>Bounty Amount</FormLabel>
        <StyledSlider
          aria-label="Bounty Amount"
          value={values.bounty}
          step={stepIncrement}
          valueLabelDisplay="auto"
          title="Bounty Amount"
          onChange={handleChange}
          min={min}
          max={max}
          valueLabelFormat={formatValueLabel}
        />
      </SliderCell>
      <BountyCell>
        <BountySize>{formatValueLabel(values.bounty)}</BountySize>
      </BountyCell>
    </Row>
  );
};
