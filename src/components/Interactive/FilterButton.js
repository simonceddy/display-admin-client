function FilterButton({
  children,
  disabled = false,
  onClick,
  className,
  activeClassName = 'bg-gray-100 dark:bg-gray-600 underline'
}) {
  return (
    <button
      className={`p-2 m-1 rounded-md font-bold capitalize ${disabled ? activeClassName : 'hover:underline'} ${className}`}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default FilterButton;
