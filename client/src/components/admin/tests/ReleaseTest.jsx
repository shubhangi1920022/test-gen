import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Loader";
import Error from "../../Error";
import useTests from "../../../hooks/tests/useTests";
import { useSelector } from "react-redux";

export default function ReleaseTest() {
  const [tests, setTests] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { _id } = useSelector(store => store.user);

  const { deleteTest, loading: loadingTest, releaseTest } = useTests()

  async function handleReleaseTest(id) {
    try {
      const response = await releaseTest(id);
      if (!response) setError(response.payload);
    } catch (error) {
      setError(error.message)
    }

  }

  useEffect(function () {
    // async function retrieve() {
    //   try {
    //     const response = await getTests();
    //     if (response.status) setTests(response.payload.tests)
    //     else setError(response.payload)
    //   } catch (error) {
    //     setError(error.message)
    //   }
    // }
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
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false);
      }
    }

    retrieve()
  }, [loadingTest])

  return <div>
    <div className="rounded border-2 mt-6">
      <h3 className="p-4">Release Tests</h3>
      {loading && <Loader />}
      {error && <Error message={error} setter={setError} />}
      {tests.map(test =>
        <div key={test._id}
          className="md:flex md:items-center gap-4 px-4 py-4 border-t-2"
        >
          <p>{test.title}</p>
          <button className="bg-[#F5F0E5] rounded mt-4 md:mt-0 md:ml-auto">{test.questions.length} Questions</button>

          <Link to={`/admin/tests/edit-test/${test._id}`}>
            <button className="btn-primary rounded mx-2">Edit</button>
          </Link>

          <button
            className="bg-red-500 text-white rounded mx-2"
            onClick={() => deleteTest(test._id)}
          >Delete</button>
          <button
            disabled={test.isReleased}
            className={`${test.isReleased ? "bg-blue-300" : "bg-blue-500"} text-white rounded mx-2`}
            onClick={() => handleReleaseTest(test._id)}
          >{test.isReleased ? "Already Released" : "Release Now"}</button>
        </div>
      )}
    </div>
  </div>
}