// percona-everest-frontend
// Copyright (C) 2023 Percona LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { getResourceNames } from './second-step.utils';

export const Messages = {
  pageTitle: 'Resources',
  pageDescription:
    'Configure the resources your new database will have access to.',
  labels: {
    numberOfNodes: 'Number of nodes',
    resourceSizePerNode: 'Resource size per node',
    cpu: 'CPU',
    memory: 'memory',
    disk: 'disk',
    standalone: 'Standalone \n 1 node',
    sourceReplica: 'Source Replica \n 2 nodes',
    sourceReplicaReplica: 'Source Replica Replica \n 3 nodes',
  },
  alerts: {
    resourcesCapacityExceeding: (names: string[]) =>
      `The resources you have specified exceed the available ${getResourceNames(
        names
      )} capacity of the cluster node. Database creation might fail.`,
  },
};