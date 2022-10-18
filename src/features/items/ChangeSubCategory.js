import { useFetchCategoryQuery } from '../../services/api';

function ChangeSubCategory({ parent, value, onChange }) {
  const {
    data, isLoading, error
  } = useFetchCategoryQuery(parent);
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
      disabled={!data.categories || data.categories.length === 0}
      value={value}
      onChange={onChange}
    >
      <option label="---" value="" />
      {data.categories.map((c) => (
        <option
          label={c.title}
          value={c.key}
          key={`select-option-${c.key}`}
        />
      ))}
    </select>
  );
}

export default ChangeSubCategory;
