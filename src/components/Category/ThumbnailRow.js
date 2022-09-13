import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { MEDIA_BASE_URI } from '../../support/consts';

function ThumbnailRow({ items = [], categoryKey, onItemClick }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-start items-center rounded p-1 m-1">
      {items.map((i, index) => {
        const clickHandler = onItemClick
          ? () => onItemClick(i)
          : (() => navigate(`/category/${categoryKey}/item/${i.key}`));
        if (!i.thumbnail || !i.thumbnail.src) {
          // console.log(i.thumbnail);
          return (
            <div
              key={`${index}-item-box`}
              className="mx-2 rounded p-0.5 overflow-hidden whitespace-nowrap overflow-ellipsis bg-blue-500 bg-opacity-30"
              role="presentation"
              onClick={clickHandler}
              style={{
                width: '70px',
                height: '70px'
              }}
            >
              {i.title}
            </div>
          );
        }
        const { src } = i.thumbnail;
        const thumbsrc = src.endsWith('.png') ? src : `${src}.png`;

        return (
          <div
            key={`${categoryKey}-summary-${i.key}-thumbnail`}
            style={{
              height: '70px',
              width: '70px'
            }}
            className="mx-2 bg-blue-500 bg-opacity-30"
            role="presentation"
            onClick={clickHandler}
          >
            <img
              data-tip={i.title}
              id={`${categoryKey}-summary-${i.key}-thumbnail`}
              className="rounded p-0.5"
              height="auto"
              width={70}
              src={`${MEDIA_BASE_URI}thumbs/${thumbsrc}`}
              alt={i.thumbnail.alt || i.title}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => {
                setShowTooltip(false);
                setTimeout(() => setShowTooltip(true), 30);
              }}
            />
            {showTooltip && <ReactTooltip effect="solid" />}
          </div>
        );
      })}
    </div>
  );
}

export default ThumbnailRow;
