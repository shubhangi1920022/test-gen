import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Error from "../Error";

import { useSelector } from "react-redux";

export default function Results() {
  const [tests, setTests] = useState([]);
  const [displayedTests, setDisplayedTests] = useState([]);
  const [error, setError] = useState();

  const { _id } = useSelector((store) => store.user);

  function handleSearch(str) {
    setDisplayedTests(
      tests.filter((test) =>
        test.testId.title.toLowerCase().includes(str.toLowerCase())
      )
    );
  }

  // function handleSearch(str) {
  //   setDisplayedTests(
  //     tests.filter((test) =>
  //       test.testId && test.testId.title &&
  //       test.testId.title.toLowerCase().includes(str.toLowerCase())
  //     )
  //   );
  // }

  useEffect(function () {
    async function retrieve() {
      try {
        const response = await fetch(
          `http://localhost:3000/test/completedTestsByuser/${_id}`
        );
        const data = await response.json();
        if (response.status === 404) {
          setError(data.message);
        } else {
          setTests(data);
          setDisplayedTests(data);
        }
        // else setError(response.payload);
      } catch (error) {
        setError(error.message);
      }
    }

    retrieve();
  }, []);

  return (
    <div>
      <div className="relative bg-[#4169E1] p-2 rounded text-[#fffff]">
        <label htmlFor="search">
          <MagnifyingGlassIcon className="icon-lg absolute top-1/2 translate-y-[-50%] left-3 text-white" />
        </label>
        <input
          type="text"
          id="search"
          className="w-full bg-transparent pl-8 text-white"
          placeholder="Search for Test"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {error && <Error message={error} setter={setError} />}

      {tests.length === 0 && (
        <h1 className="text-center mt-5 py-3 bg-[#f8d7da]">
          You have given no tests
        </h1>
      )}

      <div className="flex flex-wrap gap-4 mt-10 justify-eenly">
        {displayedTests.length > 0 &&
          displayedTests.map((test) => (
            <div
              key={test._id}
              className="bg-transparent grow shadow-lg w-full md:w-[49%] sm:max-w-[350px] rounded-lg p-6 ring-2 ring-[#cccccc]"
            >
              <NavLink
                to={test.testId && `/results/${test.testId._id}`}
              >
                <h3>{test?.testId?.title}</h3>
              </NavLink>

              {/* <NavLink to={`/results/${test.testId._id}`}>
                <h3>{test?.testId?.title}</h3>
              </NavLink>  */}
            </div>
          ))}
      </div>
    </div>
  );
}
