import { ORGANIZATION_FIELDS } from "./constants";

export type OrganizationFields = {
  name: string;
};

export type OrganizationFormFields = {
  [ORGANIZATION_FIELDS.NAME]: string | undefined | null;
}
