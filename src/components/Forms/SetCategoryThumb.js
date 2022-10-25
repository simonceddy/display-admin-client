import StdButton from '../Interactive/StdButton';

function SetCategoryThumb({ onClick }) {
  return (
    <div className="w-full flex flex-row justify-around items-center">
      <StdButton
        onClick={onClick}
      >
        Set Category Thumbnail
      </StdButton>
    </div>
  );
}

export default SetCategoryThumb;
