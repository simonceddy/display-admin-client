import { useFetchDataQuery } from '../../services/api';

function ChangeCategory({ value, onChange }) {
  const {
    data, isLoading, error
  } = useFetchDataQuery();
  if (isLoading) {
    return (
      <span>
        Loading...
      </span>
    );
  }
  if (error) return <div>{error.message}</div>;
  return (
    <select
      className="border-2 rounded-md border-slate-400 focus:border-blue-400 p-1 text-lg"
      value={value}
      onChange={onChange}
    >
      {data.map((c) => (
        <option
          label={c.title}
          value={c.key}
          key={`select-option-${c.key}`}
        />
      ))}
    </select>
  );
}

export default ChangeCategory;
