import { MockedResponse } from '@apollo/client/testing';
import range from 'lodash/range';
import React from 'react';

import {
  PlaceDocument,
  PlacesDocument,
} from '../../../../../generated/graphql';
import { fakePlaces } from '../../../../../utils/mockDataUtils';
import {
  configure,
  render,
  screen,
  userEvent,
} from '../../../../../utils/testUtils';
import { PLACES_SORT_ORDER } from '../../../../place/constants';
import PlaceSelector, { PlaceSelectorProps } from '../PlaceSelector';

configure({ defaultHidden: true });

const placeOverrides = range(1, 5).map((i) => ({
  id: `place:${i}`,
  name: `Place name ${i}`,
}));
const places = fakePlaces(
  placeOverrides.length,
  placeOverrides.map(({ id, name }) => ({ id, name: { fi: name } }))
);
const placesVariables = {
  createPath: undefined,
  sort: PLACES_SORT_ORDER.NAME,
  text: '',
};
const placesResponse = { data: { places } };
const mockedPlacesResponse: MockedResponse = {
  request: {
    query: PlacesDocument,
    variables: placesVariables,
  },
  result: placesResponse,
};

const place = places.data[0];
const placeId = place.id;
const placeVariables = {
  id: placeId,
  createPath: undefined,
};
const placeResponse = { data: { place } };
const mockedPlaceResponse: MockedResponse = {
  request: {
    query: PlaceDocument,
    variables: placeVariables,
  },
  result: placeResponse,
};

const mocks = [mockedPlacesResponse, mockedPlaceResponse];

const toggleButtonLabel = 'Select place';

const defaultProps: PlaceSelectorProps = {
  onChange: jest.fn(),
  toggleButtonLabel,
  value: [] as string[],
};

const renderComponent = (props?: Partial<PlaceSelectorProps>) =>
  render(<PlaceSelector {...defaultProps} {...props} />, { mocks });

const getElement = (key: 'toggleButton') => {
  switch (key) {
    case 'toggleButton':
      return screen.getByRole('button', { name: toggleButtonLabel });
  }
};
test('should render place selector', async () => {
  renderComponent({ value: [placeId] });

  await screen.findByText(place.name.fi);

  const toggleButton = getElement('toggleButton');
  userEvent.click(toggleButton);

  for (const { name } of placeOverrides) {
    await screen.findByRole('checkbox', { name });
  }
});
