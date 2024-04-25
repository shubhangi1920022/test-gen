import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Loader from "../../Loader";
import Error from "../../Error";
import { useSelector } from "react-redux";

export default function AdminResults() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tests, setTests] = useState([]);
  const [displayedTests, setDisplayedTests] = useState([]);
  const { _id } = useSelector(store => store.user);

  function handleSearch(str) {
    setDisplayedTests(tests.filter(test => test.title.toLowerCase().includes(str.toLowerCase())));
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/test/testCreatedbyAdmin/${_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTests(data);
        setDisplayedTests(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [_id]);

  return (
    <div>
      <div className="relative bg-blue-500 p-2 rounded text-white">
        <label htmlFor="search">
          <MagnifyingGlassIcon className="icon-lg absolute top-1/2 transform -translate-y-1/2 left-3 text-white" />
        </label>
        <input 
          type="text" 
          id="search" 
          className="w-full bg-transparent pl-8 text-white" 
          placeholder="Search for Test" 
          onChange={e => handleSearch(e.target.value)} 
        />
      </div>
      {loading && <Loader />}
      {error && <Error message={error} />}
      <div className="flex flex-wrap gap-4 mt-10 justify-evenly">
        {displayedTests.map(test => (
          <div key={test._id} className="bg-white grow shadow-lg w-full md:w-[49%] sm:max-w-[350px] rounded-lg p-6 ring-2 ring-gray-300">
            <NavLink to={`/admin/results/${test._id}`}>
              <h3>{test.title}</h3>
            </NavLink>
          </div>
        ))}
      </div>
      {tests.length === 0 && <h1 className="text-center">You haven't listed any tests</h1>}
    </div>
  );
}
