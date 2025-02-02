import { css } from '@emotion/css';
import classNames from 'classnames';
import {
  IconAngleDown,
  IconAngleUp,
  IconClock,
  IconLocation,
  IconPhoto,
  IconTicket,
  IconUser,
} from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { EventFieldsFragment } from '../../../generated/graphql';
import useIsMobile from '../../../hooks/useIsMobile';
import useLocale from '../../../hooks/useLocale';
import IconFlag from '../../../icons/IconFlag';
import { useTheme } from '../../app/theme/Theme';
import useEventLocation from '../../event/hooks/useEventLocation';
import StatusTag from '../../event/tags/StatusTag';
import SuperEventTypeTag from '../../event/tags/SuperEventTypeTag';
import { getEventFields } from '../../event/utils';
import {
  addParamsToEventQueryString,
  getEventItemId,
} from '../../eventSearch/utils';
import { getPlaceFields } from '../../place/utils';
import { addExpandedEvent, removeExpandedEvent } from '../actions';
import ActionsDropdown from '../actionsDropdown/ActionsDropdown';
import { expandedEventsSelector } from '../selectors';
import AudienceAgeText from './AudienceAgeText';
import DateText from './DateText';
import styles from './eventCard.module.scss';
import PriceText from './PriceText';
import PublisherName from './PublisherName';
import SubEventCards from './SubEventCards';
import TextWithIcon from './TextWithIcon';

export const testIds = {
  image: 'event-card-image',
};

interface Props {
  event: EventFieldsFragment;
  level?: number;
}

const EventCard: React.FC<Props> = ({ event, level = 0 }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const locale = useLocale();
  const { pathname, search } = useLocation();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const expandedEvents = useSelector(expandedEventsSelector);

  const { location } = useEventLocation(event);

  const {
    audienceMaxAge,
    audienceMinAge,
    endTime,
    eventStatus,
    eventUrl,
    freeEvent,
    id,
    imageUrl,
    inLanguage,
    name,
    offers,
    publisher,
    publicationStatus,
    startTime,
    subEventAtIds,
    superEventType,
  } = getEventFields(event, locale);
  const {
    addressLocality,
    name: locationName,
    streetAddress,
  } = location
    ? getPlaceFields(location, locale)
    : { addressLocality: '', name: '', streetAddress: '' };

  const queryString = addParamsToEventQueryString(search, {
    returnPath: pathname,
  });
  const eventUrlWithReturnPath = `${eventUrl}${queryString}`;

  const open = expandedEvents.includes(id);

  const inLanguageText = inLanguage.join(', ') || '-';

  const locationText =
    [locationName, streetAddress, addressLocality]
      .filter((e) => e)
      .join(', ') || '-';

  const toggle = () => {
    if (open) {
      dispatch(removeExpandedEvent(id));
    } else {
      dispatch(addExpandedEvent(id));
    }
  };

  return (
    <>
      <div
        className={styles.eventCardWrapper}
        id={getEventItemId(id)}
        data-testid={event.id}
        style={{
          marginLeft: `calc(${level} * var(--spacing-l))`,
          marginRight: `calc(0px - ${level} * var(--spacing-l))`,
        }}
      >
        <Link
          aria-label={name}
          className={classNames(styles.eventCard, css(theme.eventCard))}
          to={eventUrlWithReturnPath}
        >
          <div className={styles.imageWrapper}>
            {/* Placeholder image */}
            <div className={styles.placeholderImage}>
              <IconPhoto size={isMobile ? 'xl' : 'l'} />
            </div>
            {/* Event image is hiding placeholder image when it's loaded */}
            <div
              data-testid={testIds.image}
              className={styles.image}
              style={{
                backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
              }}
            />
            {/* Super event type tag is the topmost element at image wrapper */}
            <SuperEventTypeTag
              className={styles.tag}
              superEventType={superEventType}
            />
          </div>
          <div className={styles.eventInfoWrapper}>
            <ActionsDropdown className={styles.actionButtons} event={event} />
            <div className={styles.nameRow}>
              <h2>{name}</h2>
            </div>
            <div className={styles.dateRow}>
              <TextWithIcon
                icon={<IconClock aria-hidden={true} className={styles.icon} />}
                text={<DateText endTime={endTime} startTime={startTime} />}
              />
              <TextWithIcon
                icon={<IconFlag aria-hidden={true} className={styles.icon} />}
                text={inLanguageText}
              />
            </div>

            <div className={styles.publisherRow}>
              <div className={styles.publisherColumn}>
                <div className={styles.publisherName}>
                  {publisher ? <PublisherName id={publisher} /> : '-'}
                </div>
                <TextWithIcon
                  icon={
                    <IconLocation aria-hidden={true} className={styles.icon} />
                  }
                  text={locationText}
                />
              </div>
              <div className={styles.ticketColumn}>
                <TextWithIcon
                  icon={
                    <IconTicket aria-hidden={true} className={styles.icon} />
                  }
                  text={<PriceText freeEvent={freeEvent} offers={offers} />}
                />
                <TextWithIcon
                  icon={<IconUser aria-hidden={true} className={styles.icon} />}
                  text={
                    <AudienceAgeText
                      maxAge={audienceMaxAge}
                      minAge={audienceMinAge}
                    />
                  }
                />
                <div className={styles.eventStatusTagWrapper}>
                  <StatusTag
                    eventStatus={eventStatus}
                    publicationStatus={publicationStatus}
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
        {!!subEventAtIds.length && (
          <button className={styles.toggleButton} onClick={toggle}>
            {open ? (
              <IconAngleUp aria-hidden={true} size="s" />
            ) : (
              <IconAngleDown aria-hidden={true} size="s" />
            )}
            <span>
              {open
                ? t('eventsPage.eventCard.hideSubEvents')
                : t('eventsPage.eventCard.showSubEvents', {
                    count: subEventAtIds.length,
                  })}
            </span>
          </button>
        )}
      </div>
      {!!subEventAtIds.length && open && (
        <SubEventCards eventId={id} level={level + 1} />
      )}
    </>
  );
};

export default EventCard;
