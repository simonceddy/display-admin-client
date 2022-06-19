function SubCategoryList({ subs = [] }) {
  return (
    <div>
      {subs.map((c) => (
        <div key={`subcategory-${c.key}-listing`}>{c.title}</div>
      ))}
    </div>
  );
}

export default SubCategoryList;
