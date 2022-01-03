import { Field, Form, Formik } from 'formik';
import { IconCheck } from 'hds-react';
import React from 'react';

import Button from '../../../common/components/button/Button';
import TextInputField from '../../../common/components/formFields/TextInputField';
import TextInput from '../../../common/components/textInput/TextInput';
import {
  CreateUserMutationInput,
  useCreateUserMutation,
} from '../../../generated/graphql';
import Container from '../../app/layout/Container';
import PageWrapper from '../../app/layout/PageWrapper';
import { reportError } from '../../app/sentry/utils';
import useEventServerErrors from '../../event/hooks/useEventServerErrors';
import FieldColumn from '../../event/layout/FieldColumn';
import FieldRow from '../../event/layout/FieldRow';
import Section from '../../event/layout/Section';
import { USER_FIELDS, USER_INITIAL_VALUES } from '../../user/constants';
import { UserFormFields } from '../../user/types';
import styles from './createUserPage.module.scss';
const CreateUserPage: React.FC = () => {
  const [createUserMutation] = useCreateUserMutation();
  const { serverErrorItems, setServerErrorItems, showServerErrors } =
    useEventServerErrors();

  const createUser = async (formValues: UserFormFields) => {
    const payload = getUserPayload(formValues);
    try {
      const data = await createUserMutation({
        variables: { input: payload },
      });

      return data.data?.createUser.username as string;
    } catch (error) /* istanbul ignore next */ {
      console.log('Error happened, idk');
      // showServerErrors({ error, eventType: values.type });
      // Report error to Sentry
      // reportError({
      //   data: {
      //     error,
      //     payload,
      //     payloadAsString: JSON.stringify(payload),
      //   },
      //   location,
      //   message: 'Failed to create event',
      //   user,
      // });
    }
  };

  const getUserPayload = (
    formValues: UserFormFields
  ): CreateUserMutationInput => {
    const { username } = formValues;

    return {
      username,
    };
  };

  const initialValues = {
    ...USER_INITIAL_VALUES,
  };
  return (
    <PageWrapper
      description="helpPage.pageDescriptionInstructions"
      keywords={['keywords.support', 'keywords.help', 'keywords.instructions']}
      title="helpPage.pageTitleInstructions"
    >
      <h1>Lisää uusi käyttäjä</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={/* istanbul ignore next */ () => undefined}
      >
        {({ values }) => {
          const handleSubmit = async (
            event?: React.FormEvent<HTMLFormElement>
          ) => {
            console.log('HANDLE SUBMIT');
            event?.preventDefault();
            await createUser(values);
          };
          return (
            <Form onSubmit={(event) => handleSubmit(event)}>
              {/* <TextInput
                id="new-some-link-input"
                // className={styles.newLinkField}
                // disabled
                // hideLabel={true}
                name={USER_FIELDS.USERNAME}
                label="Käyttäjätunnus"
                // placeholder="Placeholder"
              /> */}

              <FieldRow>
                <FieldColumn>
                  <Field
                    label="Käyttäjänimi"
                    name={USER_FIELDS.USERNAME}
                    component={TextInputField}
                  />
                </FieldColumn>
              </FieldRow>

              <Container contentWrapperClassName={styles.saveButtonContainer}>
                <Button
                  // className={styles.ctaButton}
                  fullWidth={false}
                  iconLeft={<IconCheck aria-hidden={true} />}
                  // onClick={() => handleSubmit}
                  type="submit"
                  variant="primary"
                >
                  Tallenna
                </Button>
              </Container>
            </Form>
          );
        }}
      </Formik>
    </PageWrapper>
  );
};

export default CreateUserPage;
