import { defaultReducerState as defaultAuthReducerState } from './domain/auth/constants';
import { defaultReducerState as defaultEventsReducerState } from './domain/events/constants';
import { StoreState } from './types';

export const BREAKPOINTS = {
  XS: 576,
  SM: 768,
  MD: 1024,
  LG: 1200,
  XLG: 1600,
};

export enum ROUTES {
  CALLBACK = '/callback',
  CREATE_EVENT = '/events/create',
  EDIT_EVENT = '/events/edit/:id',
  EVENT_SAVED = '/events/completed/:id',
  EVENTS = '/events',
  FEATURES = '/help/features',
  HELP = '/help',
  HOME = '/',
  INSTRUCTIONS = '/help/instructions',
  INSTRUCTIONS_CONTROL_PANEL = '/help/instructions/control-panel',
  INSTRUCTIONS_FAQ = '/help/instructions/faq',
  INSTRUCTIONS_GENERAL = '/help/instructions/general',
  INSTRUCTIONS_PLATFORM = '/help/instructions/platform',
  LOGOUT = '/logout',
  SEARCH = '/search',
  SILENT_CALLBACK = '/silent-callback',
  SUPPORT = '/help/support',
  SUPPORT_CONTACT = '/help/support/contact',
  SUPPORT_TERMS_OF_USE = '/help/support/terms-of-use',
  TECHNOLOGY = '/help/technology',
  TECHNOLOGY_API = '/help/technology/api',
  TECHNOLOGY_DOCUMENTATION = '/help/technology/documentation',
  TECHNOLOGY_GENERAL = '/help/technology/general',
  TECHNOLOGY_IMAGE_RIGHTS = '/help/technology/image-rights',
  TECHNOLOGY_SOURCE_CODE = '/help/technology/source-code',
}

export const OIDC_API_TOKEN_ENDPOINT = `${process.env.REACT_APP_OIDC_AUTHORITY}/api-tokens/`;

// Supported languages
export enum SUPPORTED_LANGUAGES {
  FI = 'fi',
  // TODO: Add Swedish to supported languages when UI texts has been translated
  // SV = 'sv',
  EN = 'en',
}

export enum CHARACTER_LIMITS {
  SHORT_STRING = 160,
  MEDIUM_STRING = 320,
  LONG_STRING = 5000,
}

export enum INPUT_MAX_WIDTHS {
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export enum KEYWORD_SETS {
  AUDIENCES = 'helsinki:audiences',
  TOPICS = 'helsinki:topics',
}

export enum INCLUDE {
  KEYWORDS = 'keywords',
}

export enum WEEK_DAY {
  MON = 'mon',
  TUE = 'tue',
  WED = 'wed',
  THU = 'thu',
  FRI = 'fri',
  SAT = 'sat',
  SUN = 'sun',
}

export const DATE_FORMAT = 'dd.MM.yyyy';
export const DATETIME_FORMAT = `${DATE_FORMAT} HH.mm`;

export const EXTLINK = {
  EXTLINK_FACEBOOK: 'extlink_facebook',
  EXTLINK_INSTAGRAM: 'extlink_instagram',
  EXTLINK_TWITTER: 'extlink_twitter',
  EXTLINK_YOUTUBE: 'extlink_youtube',
};

export enum FORM_NAMES {
  EVENT_FORM = 'event-form',
}

export const defaultStoreState: StoreState = {
  authentication: defaultAuthReducerState,
  events: defaultEventsReducerState,
};

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/gif', 'image/png'];
export const MAX_IMAGE_SIZE_MB = 2;

export const MAX_PAGE_SIZE = 100;

export const NAVIGATION_ITEMS = [
  {
    labelKey: 'navigation.tabs.events',
    url: ROUTES.EVENTS,
  },
  {
    labelKey: 'navigation.tabs.help',
    url: ROUTES.HELP,
  },
];

export const PAGE_HEADER_ID = 'page-header';
export const MAIN_CONTENT_ID = 'maincontent';
