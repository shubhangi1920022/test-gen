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
    <h2 className="mt-2 relative mb-10">
  Recently generated
  <div className="absolute left-0 w-20 h-2 bg-blue-500 rounded-md rounded-tr-md mt-2"></div></h2>

  <p className="mb-3">Welcome to our <span className="text-blue-500 font-bold">Test Generator Platform</span>! Our timeline is designed to motivate you and keep you on track toward exam success. Stay focused, follow the deadlines, and prepare to excel in your exams.Let's get you ready to ace your exams with confidence!</p>
  
    {loading && <Loader />}
    {error && <Error message="this is a error message" setter={setError} />}

    {displayedTests.map((test, index) => <div key={test._id} className="flex items-center justify-between">
      <TestInfo test={test} index={index} />
      <NavLink to={`/admin/dashboard/test/${test._id}/details`}>
        <button className="bg-[#4169E1] text-[14px] rounded text-white">View Details</button>
      </NavLink>
    </div>)}

    {displayedTests.length === 0 && <h1 className="text-center mt-10">No Tests to display 🙂.</h1>}
  </div>
}