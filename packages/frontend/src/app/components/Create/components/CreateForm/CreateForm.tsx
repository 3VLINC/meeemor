import { Button } from '@mui/material';
import { Formik, Form, Field, FormikProps } from 'formik';
import { BountyAmount } from './components/BountyAmount';
import { PoapAutocomplete } from './components/PoapAutocomplete';
import { CreateProps } from './CreateForm.interface';
import styled from 'styled-components';
import { useConfig } from '../../../../shared/Config/Config';
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi';
import { ethers } from 'ethers';
import { useDebounce } from 'use-debounce';

const StyledForm = styled(Form)`
  width: 100%;
  max-width: 640px;
`;

const StyledField = styled.div`
  margin: 2rem 0;
`;
const initialValues: CreateProps = {
  poapAddr: '',
  bounty: 0,
};

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
  const [debouncedValues] = useDebounce(values, 500);
  const { contracts } = useConfig();
  const { config } = usePrepareSendTransaction({
    request: {
      to: contracts.meeemor.address,
      value: debouncedValues.bounty
        ? ethers.utils.parseEther(debouncedValues.bounty.toString())
        : undefined,
    },
  });

  const { isLoading, sendTransaction } = useSendTransaction(config);

  const handleSubmit = () => {
    // TODO: send transaction
    // sendTransaction?.();
  };

  return (
    <StyledForm>
      <StyledField>
        <Field name="poapAddr" component={PoapAutocomplete} />
      </StyledField>
      <StyledField>
        <Field name="bounty" component={BountyAmount} />
      </StyledField>
      <Button disabled={isLoading} type="submit" onSubmit={handleSubmit}>
        Submit
      </Button>
    </StyledForm>
  );
};
