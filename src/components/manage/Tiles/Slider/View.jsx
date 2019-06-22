/**
 * View slider tile.
 * @module components/manage/Tiles/Slider/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import redraft from 'redraft';
import cx from 'classnames';
import { settings } from '~/config';
import { flattenToAppURL } from '@plone/volto/helpers';

/**
 * View slider tile class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <div
    className={cx('tile slider', {
      centered: data.align === 'center' || data.align === undefined,
      full: data.align === 'full',
      'centered-text': data.centeredText,
    })}
  >
    <Slider
      customPaging={dot => <div />}
      dots
      dotsClass="slick-dots slick-thumb"
      infinite
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      arrows={false}
    >
      {data.cards.map((card, index) => (
        <div key={card.id}>
          <div
            className={`slide slide-${index + 1}`}
            style={{
              background: `linear-gradient(to bottom, rgba(8, 7, 7, 0.57) 0%, rgba(238, 238, 238, 0) 35%, transparent 100%), url(${
                card.url.startsWith(settings.apiPath)
                  ? `${flattenToAppURL(card.url)}/@@images/image`
                  : card.url
              }) no-repeat`,
              backgroundSize: 'cover',
            }}
          >
            <div className="slide-body-text">
              {card.text &&
                redraft(
                  card.text,
                  settings.ToHTMLRenderers,
                  settings.ToHTMLOptions,
                )}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
