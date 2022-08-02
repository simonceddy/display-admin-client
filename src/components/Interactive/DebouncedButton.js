import { debounce } from 'lodash';
import StdButton from './StdButton';

function DebouncedButton(props) {
  const onClick = props.onClick
    ? debounce((e) => (props.onClick(e)), (props.wait || 150))
    : null;
  return (
    <StdButton
      {...props}
      onClick={onClick}
    />
  );
}

export default DebouncedButton;
