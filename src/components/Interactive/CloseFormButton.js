import { useNavigate } from 'react-router-dom';
import StdButton from './StdButton';

function CloseFormButton({ onClick, label = 'Close Form' }) {
  const navigate = useNavigate();
  return (
    <StdButton onClick={(e) => {
      if (onClick) {
        onClick(e);
      } else {
        navigate('/');
      }
    }}
    >
      {label}
    </StdButton>
  );
}

export default CloseFormButton;
