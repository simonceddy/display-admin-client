import { useNavigate, useParams } from 'react-router-dom';
import { MEDIA_BASE_URI } from '../../support/consts';
import thumbsrc from '../../util/thumbsrc';
import StdButton from '../Interactive/StdButton';

function SubCategoryList({ subs = [], onSubClick, category }) {
  const navigate = useNavigate();
  const { key } = useParams();
  const clickHandler = (c) => (onSubClick ? onSubClick(c) : (() => {
    if (key || category) {
      navigate(`/category/${key || category}/${c.key}`);
    }
  }));
  return (
    <div className="w-full flex flex-col justify-start items-start">
      {subs.map((c) => {
        const totalItems = c.items ? c.items.length : 0;
        return (
          <div
            key={`subcategory-${c.key}-listing`}
            className="my-1 flex flex-row justify-between w-full items-center"
            role="presentation"
            onClick={clickHandler(c)}
          >
            <span>{c.thumbnail && c.thumbnail.src && (
              <img
                id={`${c.key}-thumbnail`}
                className="rounded p-0.5"
                height="auto"
                width={70}
                src={`${MEDIA_BASE_URI}thumbs/${thumbsrc(c.thumbnail.src)}`}
                alt={c.thumbnail.alt || c.title}
              />
            )}
            </span>
            <span className="hover:underline font-bold text-lg mr-2">
              {c.title}
            </span>
            <span>{totalItems} item{totalItems === 1 ? null : 's'}</span>
            <StdButton onClick={clickHandler(c)}>
              Edit Sub-Category
            </StdButton>
          </div>
        );
      })}
    </div>
  );
}

export default SubCategoryList;
