import { USER_FIELDS } from "./constants";

export type UserFields = {
  adminOrganizations: string[];
  isStaff: boolean;
  organizationMemberships: string[];
};

export type UserFormFields = {
  [USER_FIELDS.USERNAME]: string | null;
}
