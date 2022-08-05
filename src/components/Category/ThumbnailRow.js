import { Fragment, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { MEDIA_BASE_URI } from '../../support/consts';

function ThumbnailRow({ items = [], categoryKey }) {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="flex flex-row justify-start items-center rounded p-1 m-1">
      {items.map((i, index) => {
        if (!i.thumbnail) {
          return (
            <div
              key={`${index}-item-box`}
              className="mx-2 rounded p-0.5 overflow-hidden whitespace-nowrap overflow-ellipsis"
              style={{
                width: '70px',
                height: 'auto'
              }}
            >
              {i.title}
            </div>
          );
        }
        return (
          <Fragment key={`${categoryKey}-summary-${i.key}-thumbnail`}>
            <img
              data-tip={i.title}
              id={`${categoryKey}-summary-${i.key}-thumbnail`}
              className="mx-2 rounded p-0.5"
              height="auto"
              width={70}
              src={`${MEDIA_BASE_URI}thumbs/${i.thumbnail.src}`}
              alt={i.thumbnail.alt || i.title}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => {
                setShowTooltip(false);
                setTimeout(() => setShowTooltip(true), 30);
              }}
            />
            {showTooltip && <ReactTooltip effect="solid" />}
          </Fragment>
        );
      })}
    </div>
  );
}

export default ThumbnailRow;
