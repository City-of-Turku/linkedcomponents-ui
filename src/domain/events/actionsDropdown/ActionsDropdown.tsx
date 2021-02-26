import { IconMenuDots } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import MenuDropdown from '../../../common/components/menuDropdown/MenuDropdown';
import { MenuItemOptionProps } from '../../../common/components/menuDropdown/MenuItem';
import { ROUTES } from '../../../constants';
import { EventFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { authenticatedSelector } from '../../auth/selectors';
import { EVENT_ACTIONS } from '../../event/constants';
import useEventOrganization from '../../event/hooks/useEventOrganizationAncestors';
import useEventUpdateActions, {
  MODALS,
} from '../../event/hooks/useEventUpdateActions';
import ConfirmCancelModal from '../../event/modals/ConfirmCancelModal';
import ConfirmDeleteModal from '../../event/modals/ConfirmDeleteModal';
import ConfirmPostponeModal from '../../event/modals/ConfirmPostponeModal';
import {
  copyEventToSessionStorage,
  getActionButtonProps,
  getEventFields,
} from '../../event/utils';
import useUser from '../../user/hooks/useUser';
import styles from './actionsDropdown.module.scss';

export interface ActionsDropdownProps {
  className?: string;
  event: EventFieldsFragment;
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({
  className,
  event,
}) => {
  const { t } = useTranslation();
  const authenticated = useSelector(authenticatedSelector);
  const locale = useLocale();
  const history = useHistory();
  const { id } = getEventFields(event, locale);

  const {
    cancelEvent,
    closeModal,
    deleteEvent,
    saving,
    openModal,
    postponeEvent,
    setOpenModal,
  } = useEventUpdateActions({ event });
  const { organizationAncestors } = useEventOrganization(event);
  const { user } = useUser();

  const onCancel = () => {
    cancelEvent();
  };

  const onDelete = () => {
    deleteEvent();
  };

  const onPostpone = () => {
    postponeEvent();
  };

  const goToEditEventPage = () => {
    history.push(`/${locale}${ROUTES.EDIT_EVENT.replace(':id', id)}`);
  };

  const copyEvent = async () => {
    await copyEventToSessionStorage(event);
    history.push(`/${locale}${ROUTES.CREATE_EVENT}`);
  };

  const getActionItemProps = ({
    action,
    onClick,
  }: {
    action: EVENT_ACTIONS;
    onClick: () => void;
  }): MenuItemOptionProps | null => {
    return getActionButtonProps({
      action,
      authenticated,
      event,
      onClick,
      organizationAncestors,
      t,
      user,
    });
  };

  const actionItems: MenuItemOptionProps[] = [
    getActionItemProps({
      action: EVENT_ACTIONS.EDIT,
      onClick: goToEditEventPage,
    }),
    getActionItemProps({
      action: EVENT_ACTIONS.COPY,
      onClick: copyEvent,
    }),
    getActionItemProps({
      action: EVENT_ACTIONS.POSTPONE,
      onClick: () => setOpenModal(MODALS.POSTPONE),
    }),
    getActionItemProps({
      action: EVENT_ACTIONS.CANCEL,
      onClick: () => setOpenModal(MODALS.CANCEL),
    }),
    getActionItemProps({
      action: EVENT_ACTIONS.DELETE,
      onClick: () => setOpenModal(MODALS.DELETE),
    }),
  ].filter((i) => i) as MenuItemOptionProps[];

  return (
    <>
      <ConfirmCancelModal
        event={event}
        isOpen={openModal === MODALS.CANCEL}
        isSaving={saving === MODALS.CANCEL}
        onCancel={onCancel}
        onClose={closeModal}
      />
      <ConfirmDeleteModal
        event={event}
        isOpen={openModal === MODALS.DELETE}
        isSaving={saving === MODALS.DELETE}
        onClose={closeModal}
        onDelete={onDelete}
      />
      <ConfirmPostponeModal
        event={event}
        isOpen={openModal === MODALS.POSTPONE}
        isSaving={saving === MODALS.POSTPONE}
        onClose={closeModal}
        onPostpone={onPostpone}
      />
      <MenuDropdown
        button={
          <button className={styles.toggleButton}>
            <IconMenuDots aria-hidden={true} />
          </button>
        }
        buttonLabel={t('event.form.buttonActions')}
        className={className}
        closeOnItemClick={true}
        fixedPosition={true}
        items={actionItems}
      />
    </>
  );
};

export default ActionsDropdown;
