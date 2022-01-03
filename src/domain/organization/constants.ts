import { OrganizationFormFields } from './types';

export enum ORGANIZATION_FIELDS {
  NAME = 'name',
}

export const ORGANIZATION_INITIAL_VALUES: OrganizationFormFields = {
  [ORGANIZATION_FIELDS.NAME]: '',
};
