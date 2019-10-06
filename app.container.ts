import 'reflect-metadata';
import { container } from 'inversify-props';

import IDataService from '@/services/IDataService';
import DataService from '@/services/impl/DataService';

export default function buildDependencyContainer(): void {
  container.addTransient<IDataService>(DataService);
}

