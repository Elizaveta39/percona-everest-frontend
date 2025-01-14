import { DbClusterStatus } from '../../types/dbCluster.types';
import { BaseStatus } from '../status-field/status-field.types';

export const DB_CLUSTER_STATUS_TO_BASE_STATUS: Record<
  DbClusterStatus,
  BaseStatus
> = {
  [DbClusterStatus.initializing]: 'pending',
  [DbClusterStatus.error]: 'error',
  [DbClusterStatus.paused]: 'paused',
  [DbClusterStatus.pausing]: 'pending',
  [DbClusterStatus.ready]: 'success',
  [DbClusterStatus.stopping]: 'pending',
  [DbClusterStatus.unknown]: 'unknown',
};
