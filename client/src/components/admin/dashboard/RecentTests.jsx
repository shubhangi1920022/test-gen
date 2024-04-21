import { NavLink } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import TestInfo from "./TestInfo";
import { useEffect, useState } from "react";
import Loader from "../../Loader";
import Error from "../../Error";
import { useSelector } from "react-redux";

export default function RecentTests() {
  const [tests, setTests] = useState([]);
  const [displayedTests, setDisplayedTests] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const { _id } = useSelector(store => store.user);

  function handleSearch(str) {
    setDisplayedTests(tests.filter(test => test.title.toLowerCase().includes(str.toLowerCase())));
  }

  useEffect(function () {
    async function retrieve() {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/test/testCreatedbyAdmin/${_id}`);
        if (!response.ok) {
          throw new Error("Error loading the tests.")
        }
        const data = await response.json();
        console.log(data)
        setTests(data)
        setDisplayedTests(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false);
      }
    }
    retrieve()
  }, [])

  return <div>
    <div className="relative bg-[#F5F0E5] border-2 p-2 text-[#A1824A] rounded-xl">
      <label htmlFor="search">
        <MagnifyingGlassIcon className="icon-lg absolute top-1/2 translate-y-[-50%] left-3" />
      </label>
      <input type="text" id="search" className="w-full bg-transparent pl-8" placeholder="search for test" onChange={e => handleSearch(e.target.value)} />
    </div>
    <h2 className="mt-8">Recently generated</h2>
    {loading && <Loader />}
    {error && <Error message="this is a error message" setter={setError} />}

    {displayedTests.map((test, index) => <div key={test._id} className="flex items-center justify-between">
      <TestInfo test={test} index={index} />
      <NavLink to={`/admin/dashboard/test/${test._id}/details`}>
        <button className="bg-[#F5F0E5] text-[14px] rounded-3xl">View Details</button>
      </NavLink>
    </div>)}

    {displayedTests.length === 0 && <h1 className="text-center mt-10">No Tests to display 🙂.</h1>}
  </div>
}