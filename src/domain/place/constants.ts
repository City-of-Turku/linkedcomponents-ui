export enum PLACES_SORT_ORDER {
  NAME = 'name',
  POSTAL_CODE = 'postal_code',
  STREET_ADDRESS = 'street_address',
}

export const INTERNET_PLACE_ID =
  process.env.REACT_APP_INTERNET_PLACE_ID || 'helsinki:internet';
