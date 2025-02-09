import { FormDialog } from '@percona/everest.form.form-dialog';
import { AutoCompleteInput } from '@percona/ui-lib.form.inputs.auto-complete';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import React, { useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

import { useBackupStorages } from '../../../hooks/api/backup-storages/useBackupStorages';
import {
  BACKUPS_QUERY_KEY,
  useCreateBackupOnDemand,
} from '../../../hooks/api/backups/useBackups';
import { Messages } from '../backups.messages';
import {
  BackupFields,
  BackupFormData,
  defaultValuesFc,
  OnDemandBackupModalProps,
  schema,
} from './on-demand-backup-modal.types';

export const OnDemandBackupModal = ({
  open,
  handleClose,
}: OnDemandBackupModalProps) => {
  const queryClient = useQueryClient();
  const { dbClusterName } = useParams();
  const { mutate: createBackupOnDemand } = useCreateBackupOnDemand(
    dbClusterName!
  );
  const { data: backupStorages = [], isFetching } = useBackupStorages();
  const handleSubmit = (data: BackupFormData) => {
    createBackupOnDemand(data, {
      onSuccess() {
        queryClient.invalidateQueries([BACKUPS_QUERY_KEY, dbClusterName]);
      },
    });
  };

  const defaultValues = useMemo(
    () => defaultValuesFc(dbClusterName),
    [dbClusterName]
  );

  return (
    <FormDialog
      isOpen={open}
      closeModal={handleClose}
      headerMessage={Messages.onDemandBackupModal.headerMessage}
      onSubmit={handleSubmit}
      submitMessage={Messages.onDemandBackupModal.submitMessage}
      schema={schema}
      defaultValues={defaultValues}
      size="XL"
      subHead={Messages.onDemandBackupModal.subHead}
    >
      <TextInput
        name={BackupFields.name}
        label={Messages.onDemandBackupModal.backupName}
        isRequired
      />
      <AutoCompleteInput
        name={BackupFields.storageLocation}
        label={Messages.onDemandBackupModal.backupStorage}
        loading={isFetching}
        options={backupStorages}
        autoCompleteProps={{
          isOptionEqualToValue: (option, value) => option.name === value.name,
          getOptionLabel: (option) =>
            typeof option === 'string' ? option : option.name,
        }}
        isRequired
      />
    </FormDialog>
  );
};
