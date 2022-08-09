function StdButton({
  children, submits = false, onClick, className, id, disabled = false
}) {
  return (
    <button
      disabled={disabled}
      id={id}
      type={submits ? 'submit' : 'button'}
      onClick={onClick}
      className={`${className} py-1 px-3 text-lg font-bold rounded-md border-2 m-1 hover:underline`}
    >
      {children}
    </button>
  );
}

export default StdButton;
