import { Button, FormControlLabel, RadioGroup } from '@mui/material';
import { Formik, Form, Field, FormikProps } from 'formik';
import { BountyAmount } from './components/BountyAmount';
import { CreateProps } from './CreateForm.interface';
import styled from 'styled-components';
import { useConfig } from '../../../../shared/Config/Config';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useDebounce } from 'use-debounce';
import { ExistingPoap } from './components/ExistingPoap/ExistingPoap';
import { NewPoap } from './components/NewPoap';
import { Mode } from './components/Mode';
import { useMemo } from 'react';
import { parseEther } from 'ethers/lib/utils';

const StyledForm = styled(Form)`
  width: 100%;
  max-width: 640px;
`;

const StyledField = styled.div`
  margin: 2rem 0;
`;
const initialValues: CreateProps = {
  mode: 'new',
  poapAddr: '',
  bounty: 0,
  eventName: '',
};

const StyledRadioGroup = styled(RadioGroup)`
  display: flex;
  flex-direction: row;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  flex: 1;
`;

export const CreateForm = () => {
  const {
    bounty: { defaultValue },
  } = useConfig();
  const handleSubmit = (values: CreateProps) => {
    //TODO: submit to contract
  };

  const handleValidation = ({ bounty, poapAddr }: CreateProps) => {
    return {};
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      validate={handleValidation}
      initialValues={{ ...initialValues, bounty: defaultValue }}
      component={Inside}
    />
  );
};

const Inside: React.FC<FormikProps<CreateProps>> = ({ values }) => {
  const { contracts } = useConfig();

  const debouncedEventName = useDebounce(values.eventName, 500);
  const debouncedBounty = useDebounce(values.bounty, 500);

  const ethStr = debouncedBounty[0].toString();
  const bountyInGwei = useMemo(() => parseEther(ethStr), [ethStr]);
  const name = debouncedEventName[0];
  const eventName = useMemo(() => name, [name]);
  const abi = contracts.meeemor.abi;

  const { config } = usePrepareContractWrite({
    address: contracts.meeemor.address,
    abi,
    functionName: 'initialize',
    overrides: {
      value: bountyInGwei,
    },
    args: [eventName],
    enabled:
      contracts.meeemor.address !== '0x' && eventName && bountyInGwei
        ? true
        : false,
    onSettled: () => {
      // handleReset();
    },
  });
  console.log('rendering');
  const { write, data, error, status } = useContractWrite(config);
  const {
    isLoading,
    isSuccess,
    data: receipt,
  } = useWaitForTransaction({
    hash: data?.hash,
  });
  console.log('receipt is', receipt);
  console.log('data', data);
  console.log('error', error);
  console.log('status', status);

  const handleSubmit = () => {
    console.log('submitting');
    write?.();
  };
  const modeFields =
    values.mode === 'existing' ? <ExistingPoap /> : <NewPoap />;

  return (
    <StyledForm>
      <StyledField>
        <StyledRadioGroup>
          <StyledFormControlLabel
            control={
              <Field type="radio" name="mode" value="new" component={Mode} />
            }
            label="New POAP"
          />
          <StyledFormControlLabel
            control={
              <Field
                type="radio"
                name="mode"
                value="existing"
                component={Mode}
              />
            }
            label="Existing POAP"
          />
        </StyledRadioGroup>
      </StyledField>
      <StyledField>{modeFields}</StyledField>
      <StyledField>
        <Field name="bounty" component={BountyAmount} />
      </StyledField>
      <Button
        disabled={isLoading || !write}
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </StyledForm>
  );
};
