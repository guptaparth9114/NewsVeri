// src/pages/CategoryPage.jsx
import { useParams, useLocation } from 'react-router-dom';

const CategoryPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const results = location.state?.results;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Category: {id}</h1>
      {results ? (
        <ul className="list-disc pl-6">
          {results.map((item, index) => (
            <li key={index}>{item.title || JSON.stringify(item)}</li>
          ))}
        </ul>
      ) : (
        <p>No data available or not passed.</p>
      )}
    </div>
  );
};

export default CategoryPage;
