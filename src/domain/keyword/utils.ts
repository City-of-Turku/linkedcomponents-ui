import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import {
  Keyword,
  KeywordDocument,
  KeywordQuery,
  KeywordQueryVariables,
  KeywordsQueryVariables,
} from '../../generated/graphql';
import { PathBuilderProps } from '../../types';
import getPathBuilder from '../../utils/getPathBuilder';
import queryBuilder from '../../utils/queryBuilder';

export const keywordPathBuilder = ({
  args,
}: PathBuilderProps<KeywordQueryVariables>): string => {
  const { id } = args;

  return `/keyword/${id}/`;
};

export const keywordsPathBuilder = ({
  args,
}: PathBuilderProps<KeywordsQueryVariables>): string => {
  const {
    dataSource,
    freeText,
    hasUpcomingEvents,
    page,
    pageSize,
    showAllKeywords,
    sort,
    text,
  } = args;
  const variableToKeyItems = [
    { key: 'data_source', value: dataSource },
    { key: 'free_text', value: freeText },
    { key: 'has_upcoming_events', value: hasUpcomingEvents },
    { key: 'page', value: page },
    { key: 'page_size', value: pageSize },
    { key: 'show_all_keywords', value: showAllKeywords },
    { key: 'sort', value: sort },
    { key: 'text', value: text },
  ];

  const query = queryBuilder(variableToKeyItems);

  return `/keyword/${query}`;
};

export const getKeywordQueryResult = async (
  id: string,
  apolloClient: ApolloClient<NormalizedCacheObject>
): Promise<Keyword | null> => {
  try {
    const { data: keywordData } = await apolloClient.query<KeywordQuery>({
      query: KeywordDocument,
      variables: {
        id,
        createPath: getPathBuilder(keywordPathBuilder),
      },
    });

    return keywordData.keyword;
  } catch (e) /* istanbul ignore next */ {
    return null;
  }
};
