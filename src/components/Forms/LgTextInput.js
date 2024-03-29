function LgTextInput({
  label,
  id,
  value,
  onChange,
  className,
  style,
  required = false,
  tabIndex,
  labelClassName
}) {
  return (
    <label htmlFor={id} className={`flex flex-row justify-between items-center ${labelClassName}`}>
      {label ? <span className="mr-2 w-1/6 font-bold">{label}:</span> : null}
      <input
        required={required}
        tabIndex={tabIndex}
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        className={`p-1 ml-2 text-lg flex-1 border-2 bg-blue-100 dark:bg-blue-700 border-slate-500 focus:border-yellow-500 rounded-md text-cyan-900 dark:text-lime-300 ${className}`}
        style={style}
      />
    </label>
  );
}

export default LgTextInput;
