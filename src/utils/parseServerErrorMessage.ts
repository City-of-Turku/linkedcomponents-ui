// LE returns always error message in a single language, so use i18n to translate

import { TFunction } from 'i18next';

import { LEServerError } from '../types';

// error message to used UI language
const parseServerErrorMessage = ({
  error,
  t,
}: {
  error: LEServerError;
  t: TFunction;
}): string => {
  let errorStr = '';
  if (Array.isArray(error)) {
    const e =
      typeof error[0] === 'object'
        ? Object.values(error[0]).find((item) => item)
        : error[0];
    errorStr = Array.isArray(e) ? e[0] : e;
  } else {
    const e = Object.values(error).find((item) => item);
    errorStr = Array.isArray(e) ? e[0] : e;
  }

  switch (errorStr) {
    case 'Arvo saa olla enintään 255 merkkiä pitkä.':
      return t(`serverError.maxLength255`);
    case 'Could not find all objects to update.':
      return t(`serverError.notFoundAllObjects`);
    case 'End time cannot be in the past. Please set a future end time.':
      return t(`serverError.endTimeInPast`);
    case 'Price info must be specified before an event is published.':
      return t(`serverError.offersIsRequired`);
    case 'Short description length must be 160 characters or less':
      return t(`serverError.shortDescriptionTooLong`);
    case 'Syötä oikea URL-osoite.':
      return t(`serverError.invalidUrl`);
    case 'The name must be specified.':
      return t(`serverError.nameIsRequired`);
    case 'This field must be specified before an event is published.':
      return t(`serverError.requiredWhenPublishing`);
    case 'Tämä kenttä ei voi olla tyhjä.':
      return t(`serverError.required`);
    case 'Tämän luvun on oltava vähintään 0.':
      return t(`serverError.min0`);
    default:
      return errorStr;
  }
};
export default parseServerErrorMessage;
