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
import { FirstStep } from './first/first-step';
import { SecondStep } from './second/second-step';
// import { ThirdStep } from './third/third-step';
import { AdvancedConfigurations } from './advanced-configurations/advanced-configurations';
import { FifthStep } from './fifth/fifth-step';

// TODO re-add steps after API is ready
export const steps = [FirstStep, SecondStep, AdvancedConfigurations, FifthStep];
