function StdButton({
  children, submits = false, onClick, className, id
}) {
  return (
    <button
      id={id}
      type={submits ? 'submit' : 'button'}
      onClick={onClick}
      className={`${className} p-2 text-lg rounded border-2 m-1 hover:underline`}
    >
      {children}
    </button>
  );
}

export default StdButton;
