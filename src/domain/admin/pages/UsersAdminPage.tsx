import React from 'react';

import useLocale from '../../../hooks/useLocale';
import { Language } from '../../../types';
import PageWrapper from '../../app/layout/PageWrapper';

const UsersAdminPage: React.FC = () => {
  const locale = useLocale();

  const getContent = (locale: Language) => {
    switch (locale) {
      case 'en':
        return (
          <>
            <h1>Users</h1>
            <p>This is users page</p>
          </>
        );
      case 'fi':
        return (
          <>
            <h1>Käyttäjät</h1>
            <p>Tämä on käyttäjäsivu</p>
          </>
        );
      case 'sv':
        return (
          <>
            <h1>Användare</h1>
            <p>Detta är användare.. sak?</p>
          </>
        );
    }
  };
  return (
    <PageWrapper
      description="helpPage.pageDescriptionInstructions"
      keywords={['keywords.support', 'keywords.help', 'keywords.instructions']}
      title="helpPage.pageTitleInstructions"
    >
      {getContent(locale)}
    </PageWrapper>
  );
};

export default UsersAdminPage;
