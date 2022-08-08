function Textarea({
  value, onChange, id, name, label
}) {
  return (
    <div className="py-1 my-1 w-11/12">
      <label htmlFor={id} className="w-full flex flex-row justify-start items-start">
        <span className="my-2 mr-2 font-bold w-1/6">{label}</span>
        <textarea
          id={id}
          name={name}
          className="text-blue-900 dark:text-blue-100 bg-slate-50 dark:bg-slate-900 p-1 border-2 rounded border-slate-500"
          value={value || ''}
          onChange={onChange}
          rows={6}
          cols={64}
          placeholder="Write content here"
        />
      </label>
    </div>
  );
}

export default Textarea;
