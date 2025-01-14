import React, { ReactNode } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { DbType } from '@percona/ui-lib.db-toggle-card';
import { TestWrapper } from '../../../../utils/test';
import { FirstStep } from './first-step';
import { DbWizardFormFields } from '../../database-form.types';

jest.mock('./utils', () => ({
  generateShortUID: jest.fn(() => '123'),
}));

jest.mock('../../../../hooks/api/db-engines/useDbEngines');
jest.mock('../../../../hooks/api/kubernetesClusters/useKubernetesClusterInfo');

interface FormProviderWrapperProps {
  handleSubmit: jest.Mock<any, any>;
  children: ReactNode;
}
const FormProviderWrapper = ({
  children,
  handleSubmit,
}: FormProviderWrapperProps) => {
  const methods = useForm({
    defaultValues: {
      [DbWizardFormFields.dbType]: DbType.Postresql,
      [DbWizardFormFields.dbName]: 'postgresql-123',
      // [DbWizardFormFields.k8sNamespace]: '',
      // [DbWizardFormFields.dbEnvironment]: '',
      [DbWizardFormFields.dbVersion]: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>{children}</form>
    </FormProvider>
  );
};

describe('First Step', () => {
  it('should set default values', async () => {
    const handleSubmitMock = jest.fn();

    render(
      <TestWrapper>
        <FormProviderWrapper handleSubmit={handleSubmitMock}>
          <FirstStep />
          <button data-testid="submitButton" type="submit">
            submit
          </button>
        </FormProviderWrapper>
      </TestWrapper>
    );
    await waitFor(() => fireEvent.submit(screen.getByTestId('submitButton')));

    expect(handleSubmitMock).toHaveBeenCalledWith(
      expect.objectContaining({
        dbType: DbType.Postresql,
        dbName: 'postgresql-123',
      }),
      expect.anything()
    );
  });

  // TODO it should be disabled if monitoring instances list length <=0 or undefined
});
