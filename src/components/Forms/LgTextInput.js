function LgTextInput({
  label, id, value, onChange, className, style, required = false
}) {
  return (
    <label htmlFor={id} className="flex fle-row justify-between items-center">
      {label ? <span className="mr-2 font-bold">{label}:</span> : null}
      <input
        required={required}
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
