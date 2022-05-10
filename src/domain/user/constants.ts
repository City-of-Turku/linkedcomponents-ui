import { UserFormFields } from './types';

export enum USER_FIELDS {
  USERNAME = 'username',
}

export const USER_INITIAL_VALUES: UserFormFields = {
  [USER_FIELDS.USERNAME]: '',
};
