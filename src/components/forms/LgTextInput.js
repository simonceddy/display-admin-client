function LgTextInput({
  label, id, value, onChange, className, style
}) {
  return (
    <label htmlFor={id} className="flex fle-row justify-between items-center">
      {label ? <span className="mr-2 text-lg font-bold">{label}:</span> : null}
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        className={`p-1 text-lg flex-1 border-2 ${className}`}
        style={style}
      />
    </label>
  );
}

export default LgTextInput;
