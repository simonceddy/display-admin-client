// import { useEffect, useState } from 'react';

function DisplaySummary({ data = [] }) {
  return (
    <div>
      {data.map((c) => (
        <div key={`category-row-${c.key}`} className="w-full odd:bg-gray-100 even:bg-blue-100 p-2">
          <h3 className="text-xl capitalize font-bold">
            {c.title}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default DisplaySummary;
