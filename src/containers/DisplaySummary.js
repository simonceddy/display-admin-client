import { useEffect, useState } from 'react';
import client from '../util/client';

function DisplaySummary() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let dataRequested = false;
    if (!dataRequested) {
      client.get('/api/category')
        .then((r) => {
          setData(r.data);
        })
        .catch(console.error);
    }
    return () => { dataRequested = true; };
  });

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
