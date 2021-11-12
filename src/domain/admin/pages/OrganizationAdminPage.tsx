import React from 'react';

import useLocale from '../../../hooks/useLocale';
import { Language } from '../../../types';
import PageWrapper from '../../app/layout/PageWrapper';

const OrganizationAdminPage: React.FC = () => {
  const locale = useLocale();

  const getContent = (locale: Language) => {
    switch (locale) {
      case 'en':
        return (
          <>
            <h1>Organizations</h1>
            <p>This is organization page</p>
          </>
        );
      case 'fi':
        return (
          <>
            <h1>Organisaatiot</h1>
            <p>Tämä on organisaatiosivu</p>
          </>
        );
      case 'sv':
        return (
          <>
            <h1>Organisationer</h1>
            <p>Detta är organisation.. sak?</p>
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

export default OrganizationAdminPage;
