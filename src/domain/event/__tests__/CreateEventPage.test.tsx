/* eslint-disable no-console */

import { MockedResponse } from '@apollo/client/testing';
import { FormikState } from 'formik';
import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';

import { FORM_NAMES } from '../../../constants';
import { fakeAuthenticatedStoreState } from '../../../utils/mockStoreUtils';
import {
  configure,
  getMockReduxStore,
  loadingSpinnerIsNotInDocument,
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../utils/testUtils';
import translations from '../../app/i18n/fi.json';
import {
  eventValues,
  imageAtId,
  imageDetails,
  keywordAtId,
  keywordName,
  mockedAudienceKeywordSetResponse,
  mockedCreateDraftEventResponse,
  mockedCreatePublicEventResponse,
  mockedCreateSubEventsResponse,
  mockedFilteredPlacesResponse,
  mockedImageResponse,
  mockedImagesResponse,
  mockedInvalidCreateDraftEventResponse,
  mockedKeywordResponse,
  mockedKeywordsResponse,
  mockedLanguagesResponse,
  mockedOrganizationResponse,
  mockedOrganizationsResponse,
  mockedPlaceResponse,
  mockedPlacesResponse,
  mockedTopicsKeywordSetResponse,
  mockedUmbrellaEventsResponse,
  mockedUpdateImageResponse,
  mockedUserResponse,
  organizationId,
  placeAtId,
} from '../__mocks__/createEventPage';
import {
  EMPTY_MULTI_LANGUAGE_OBJECT,
  EVENT_FIELDS,
  EVENT_INFO_LANGUAGES,
  EVENT_INITIAL_VALUES,
} from '../constants';
import CreateEventPage from '../CreateEventPage';
import { EventFormFields } from '../types';

configure({ defaultHidden: true });

const defaultMocks = [
  mockedImagesResponse,
  mockedImageResponse,
  mockedKeywordResponse,
  mockedKeywordsResponse,
  mockedUmbrellaEventsResponse,
  mockedAudienceKeywordSetResponse,
  mockedTopicsKeywordSetResponse,
  mockedLanguagesResponse,
  mockedPlaceResponse,
  mockedPlacesResponse,
  // PlaceSelector component requires second mock. https://github.com/apollographql/react-apollo/issues/617
  mockedFilteredPlacesResponse,
  mockedFilteredPlacesResponse,
  mockedOrganizationResponse,
  mockedOrganizationsResponse,
  mockedUserResponse,
];

const state = fakeAuthenticatedStoreState();
const store = getMockReduxStore(state);

const renderComponent = (mocks: MockedResponse[] = defaultMocks) =>
  render(<CreateEventPage />, { mocks, store });

beforeEach(() => {
  // values stored with FormikPersist will also be available in other tests unless you run
  sessionStorage.clear();
});

afterAll(() => {
  // Clear system time
  clear();
});

const setFormValues = (values: EventFormFields) => {
  const state: FormikState<EventFormFields> = {
    errors: {},
    isSubmitting: false,
    isValidating: false,
    submitCount: 0,
    touched: {},
    values,
  };

  jest.spyOn(sessionStorage, 'getItem').mockImplementation((key: string) => {
    switch (key) {
      case FORM_NAMES.EVENT_FORM:
        return JSON.stringify(state);
      default:
        return '';
    }
  });
};

const getElement = (
  key:
    | 'description'
    | 'keyword'
    | 'name'
    | 'publish'
    | 'saveDraft'
    | 'superEvent'
) => {
  switch (key) {
    case 'description':
      return screen.getByRole('textbox', {
        name: /tapahtuman kuvaus suomeksi/i,
      });
    case 'keyword':
      return screen.getByRole('checkbox', { name: keywordName });
    case 'name':
      return screen.getByRole('textbox', {
        name: /tapahtuman otsikko suomeksi/i,
      });
    case 'publish':
      return screen.getByRole('button', {
        name: translations.event.form.buttonPublish.general,
      });
    case 'saveDraft':
      return screen.getByRole('button', {
        name: translations.event.form.buttonSaveDraft,
      });
    case 'superEvent':
      return screen.getByRole('combobox', {
        name: new RegExp(translations.event.form.labelUmbrellaEvent),
      });
  }
};

const findElement = (key: 'nameSv') => {
  switch (key) {
    case 'nameSv':
      return screen.findByRole('textbox', {
        name: /tapahtuman otsikko ruotsiksi/i,
      });
  }
};

test('should focus to first validation error when trying to save draft event', async () => {
  renderComponent();

  await loadingSpinnerIsNotInDocument();

  const nameTextbox = getElement('name');
  const saveDraftButton = getElement('saveDraft');

  userEvent.click(saveDraftButton);

  await waitFor(() => expect(nameTextbox).toHaveFocus());
});

test('should focus to validation error of swedish name when trying to save draft event', async () => {
  setFormValues({
    ...EVENT_INITIAL_VALUES,
    [EVENT_FIELDS.EVENT_INFO_LANGUAGES]: [
      EVENT_INFO_LANGUAGES.FI,
      EVENT_INFO_LANGUAGES.SV,
    ],
    name: { ...EMPTY_MULTI_LANGUAGE_OBJECT, fi: eventValues.name },
  });
  renderComponent();

  await loadingSpinnerIsNotInDocument();

  const saveDraftButton = getElement('saveDraft');
  userEvent.click(saveDraftButton);

  const nameSvTextbox = await findElement('nameSv');
  await waitFor(() => expect(nameSvTextbox).toHaveFocus());
});

test('should focus to select component in case of validation error', async () => {
  setFormValues({
    ...EVENT_INITIAL_VALUES,
    hasUmbrella: true,
  });
  renderComponent();

  await loadingSpinnerIsNotInDocument();

  const superEventSelect = getElement('superEvent');

  const publishButton = getElement('publish');

  userEvent.click(publishButton);

  await waitFor(() => expect(superEventSelect).toHaveFocus());
});

test('should focus to text editor component in case of validation error', async () => {
  setFormValues({
    ...EVENT_INITIAL_VALUES,
    name: { ...EMPTY_MULTI_LANGUAGE_OBJECT, fi: eventValues.name },
    shortDescription: {
      ...EMPTY_MULTI_LANGUAGE_OBJECT,
      fi: eventValues.shortDescription,
    },
  });
  renderComponent();

  await loadingSpinnerIsNotInDocument();

  const descriptionTextbox = getElement('description');

  const publishButton = getElement('publish');

  userEvent.click(publishButton);

  await waitFor(() => expect(descriptionTextbox).toHaveFocus());
});

test('should focus to event times error if none event time exists', async () => {
  setFormValues({
    ...EVENT_INITIAL_VALUES,
    publisher: organizationId,
    description: {
      ...EMPTY_MULTI_LANGUAGE_OBJECT,
      fi: eventValues.description,
    },
    eventTimes: [],
    name: { ...EMPTY_MULTI_LANGUAGE_OBJECT, fi: eventValues.name },
    shortDescription: {
      ...EMPTY_MULTI_LANGUAGE_OBJECT,
      fi: eventValues.shortDescription,
    },
  });
  renderComponent();

  await loadingSpinnerIsNotInDocument();

  const publishButton = getElement('publish');

  userEvent.click(publishButton);

  const error = await screen.findByText(/vähintään 1 ajankohta vaaditaan/i);
  expect(error).toHaveFocus();
});

test('should focus to first main category checkbox if none main category is selected', async () => {
  advanceTo('2020-12-20');

  setFormValues({
    ...EVENT_INITIAL_VALUES,
    publisher: organizationId,
    description: {
      ...EMPTY_MULTI_LANGUAGE_OBJECT,
      fi: eventValues.description,
    },
    eventTimes: [eventValues.eventTimes[0]],
    images: [imageAtId],
    imageDetails,
    isVerified: true,
    keywords: [],
    location: placeAtId,
    name: { ...EMPTY_MULTI_LANGUAGE_OBJECT, fi: eventValues.name },
    shortDescription: {
      ...EMPTY_MULTI_LANGUAGE_OBJECT,
      fi: eventValues.shortDescription,
    },
  });

  const mocks: MockedResponse[] = [
    ...defaultMocks,
    mockedCreateSubEventsResponse,
    mockedCreatePublicEventResponse,
    mockedUpdateImageResponse,
  ];
  renderComponent(mocks);

  await loadingSpinnerIsNotInDocument();

  const publishButton = getElement('publish');
  userEvent.click(publishButton);

  const keywordCheckbox = getElement('keyword');

  await waitFor(() => expect(keywordCheckbox).toHaveFocus());
});

test('should show server errors', async () => {
  setFormValues({
    ...EVENT_INITIAL_VALUES,
    eventTimes: [eventValues.eventTimes[0]],
    isVerified: true,
    name: { ...EMPTY_MULTI_LANGUAGE_OBJECT, fi: eventValues.name },
  });

  const mocks = [...defaultMocks, mockedInvalidCreateDraftEventResponse];
  renderComponent(mocks);

  await loadingSpinnerIsNotInDocument();

  const saveDraftButton = getElement('saveDraft');
  userEvent.click(saveDraftButton);

  await screen.findByText(/lomakkeella on seuraavat virheet/i);
  screen.getByText(/lopetusaika ei voi olla menneisyydessä./i);
});

test('should route to event completed page after saving draft event', async () => {
  setFormValues({
    ...EVENT_INITIAL_VALUES,
    eventTimes: [eventValues.eventTimes[0]],
    isVerified: true,
    name: { ...EMPTY_MULTI_LANGUAGE_OBJECT, fi: eventValues.name },
  });

  const mocks = [...defaultMocks, mockedCreateDraftEventResponse];
  const { history } = renderComponent(mocks);

  await loadingSpinnerIsNotInDocument();

  const saveDraftButton = getElement('saveDraft');

  userEvent.click(saveDraftButton);

  await waitFor(() =>
    expect(history.location.pathname).toBe(
      `/fi/events/completed/${eventValues.id}`
    )
  );
});

test('should route to event completed page after publishing event', async () => {
  advanceTo('2020-12-20');

  setFormValues({
    ...EVENT_INITIAL_VALUES,
    publisher: organizationId,
    description: {
      ...EMPTY_MULTI_LANGUAGE_OBJECT,
      fi: eventValues.description,
    },
    eventTimes: eventValues.eventTimes,
    images: [imageAtId],
    imageDetails,
    isVerified: true,
    keywords: [keywordAtId],
    location: placeAtId,
    name: { ...EMPTY_MULTI_LANGUAGE_OBJECT, fi: eventValues.name },
    shortDescription: {
      ...EMPTY_MULTI_LANGUAGE_OBJECT,
      fi: eventValues.shortDescription,
    },
  });

  const mocks: MockedResponse[] = [
    ...defaultMocks,
    mockedCreateSubEventsResponse,
    mockedCreatePublicEventResponse,
    mockedUpdateImageResponse,
  ];
  const { history } = renderComponent(mocks);

  await loadingSpinnerIsNotInDocument();

  const publishButton = getElement('publish');
  userEvent.click(publishButton);

  await waitFor(
    () =>
      expect(history.location.pathname).toBe(
        `/fi/events/completed/${eventValues.id}`
      ),
    { timeout: 10000 }
  );
});
