import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import {
  Place,
  PlaceDocument,
  PlaceFieldsFragment,
  PlaceQuery,
  PlaceQueryVariables,
  PlacesQueryVariables,
} from '../../generated/graphql';
import { Language, PathBuilderProps } from '../../types';
import getLocalisedString from '../../utils/getLocalisedString';
import getPathBuilder from '../../utils/getPathBuilder';
import queryBuilder from '../../utils/queryBuilder';
import { PlaceFields } from './types';

export const getPlaceFields = (
  place: PlaceFieldsFragment,
  locale: Language
): PlaceFields => {
  return {
    addressLocality: getLocalisedString(place.addressLocality, locale),
    atId: place.atId ?? '',
    dataSource: place.dataSource ?? '',
    id: place.id ?? '',
    name: getLocalisedString(place.name, locale),
    nEvents: place.nEvents ?? 0,
    streetAddress: getLocalisedString(place.streetAddress, locale),
  };
};

export const placePathBuilder = ({
  args,
}: PathBuilderProps<PlaceQueryVariables>): string => {
  const { id } = args;

  return `/place/${id}/`;
};

export const placesPathBuilder = ({
  args,
}: PathBuilderProps<PlacesQueryVariables>): string => {
  const {
    dataSource,
    division,
    hasUpcomingEvents,
    page,
    pageSize,
    showAllPlaces,
    sort,
    text,
  } = args;

  const variableToKeyItems = [
    { key: 'data_source', value: dataSource },
    { key: 'division', value: division },
    { key: 'has_upcoming_events', value: hasUpcomingEvents },
    { key: 'page', value: page },
    { key: 'page_size', value: pageSize },
    { key: 'show_all_places', value: showAllPlaces },
    { key: 'sort', value: sort },
    { key: 'text', value: text },
  ];

  const query = queryBuilder(variableToKeyItems);

  return `/place/${query}`;
};

export const getPlaceFromCache = (
  id: string,
  apolloClient: ApolloClient<NormalizedCacheObject>
): Place | null => {
  const data = apolloClient.readQuery<PlaceQuery>({
    query: PlaceDocument,
    variables: {
      id,
      createPath: getPathBuilder(placePathBuilder),
    },
  });

  return data?.place || /* istanbul ignore next */ null;
};

export const getPlaceQueryResult = async (
  id: string,
  apolloClient: ApolloClient<NormalizedCacheObject>
): Promise<Place | null> => {
  try {
    const { data: placeData } = await apolloClient.query<PlaceQuery>({
      query: PlaceDocument,
      variables: {
        id,
        createPath: getPathBuilder(placePathBuilder),
      },
    });

    return placeData.place;
  } catch (e) /* istanbul ignore next */ {
    return null;
  }
};
