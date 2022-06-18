/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CategorySummary from './CategorySummary';

function Dashboard({ data = [], filter }) {
  return (
    <div className="flex flex-col justify-start items-start w-full p-3">
      <h1 className="font-bold text-4xl underline mb-3 mt-1">Dashboard</h1>
      {data.map((c) => (
        <CategorySummary
          key={`category-row-${c.key}`}
          category={c}
        />
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.data.all,
});

export default connect(mapStateToProps)(Dashboard);
