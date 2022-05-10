import React from 'react';

import TextInput from '../../../common/components/textInput/TextInput';
import PageWrapper from '../../app/layout/PageWrapper';
import styles from './editUserPage.module.scss';

const EditUserPage: React.FC = () => {
  return (
    <PageWrapper
      description="helpPage.pageDescriptionInstructions"
      keywords={['keywords.support', 'keywords.help', 'keywords.instructions']}
      title="helpPage.pageTitleInstructions"
    >
      <h1>EppuKau</h1>
      <p className={styles.text}>Käyttäjätiedot</p>
      <TextInput
        id="new-some-link-input"
        // className={styles.newLinkField}
        // disabled
        // hideLabel={true}
        label="Käyttäjätunnus"
        // placeholder="Placeholder"
      />
    </PageWrapper>
  );
};

export default EditUserPage;
