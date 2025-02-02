import { fakeKeyword } from '../../../utils/mockDataUtils';
import {
  getKeywordOption,
  keywordSetPathBuilder,
  keywordSetsPathBuilder,
} from '../utils';

describe('getKeywordOption function', () => {
  it('should return correct option', () => {
    const keyword = fakeKeyword({
      id: 'keyword:1',
      name: { fi: 'Keyword name' },
    });
    expect(
      getKeywordOption({
        keyword,
        locale: 'fi',
      })
    ).toEqual({
      label: 'Keyword name',
      value: keyword.atId,
    });
  });

  it('should return empty option if keyword is null', () => {
    expect(getKeywordOption({ keyword: null, locale: 'fi' })).toEqual({
      label: '',
      value: '',
    });
  });
});

describe('keywordSetPathBuilder function', () => {
  it('should build correct path', () => {
    expect(
      keywordSetPathBuilder({
        args: { id: 'hel:123', include: ['include1', 'include2'] },
      })
    ).toBe('/keyword_set/hel:123/?include=include1,include2');
  });
});

describe('keywordSetsPathBuilder function', () => {
  it('should build correct path', () => {
    expect(
      keywordSetsPathBuilder({
        args: { include: ['include1', 'include2'] },
      })
    ).toBe('/keyword_set/?include=include1,include2');
  });
});
