import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetTest from "../../../hooks/useGetTest";
import Error from "../../Error";
import Loader from "../../Loader";
import { useSelector } from "react-redux";
import { inputStyles } from "../../../utils/data";
import axios from "axios";
import { saveAs } from "file-saver";

export default function PreviousResults() {
  const [test, setTest] = useState({});
  const [error, setError] = useState();
  const [result, setResult] = useState({});
  const { testId } = useParams();
  const { user } = useSelector((store) => store);

  const { loading, getTest } = useGetTest();

  async function createAndDownloadPdf() {
    axios
      .post("http://localhost:3000/report-pdf/download", {
        testName: test.title,
        name: user.name,
        isPassed: Number(test.passingScore) <= Number(result.score),
        correctAns: result.score,
        wrongAns: test.highestMarks - result.score,
      })
      .then(() =>
        axios.get("http://localhost:3000/report-pdf/fetch-pdf", {
          responseType: "blob",
        })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      });
  }

  useEffect(function () {
    async function retireve() {
      try {
        const response = await getTest(testId);
        if (!response.status) setError(response.paylaod);
        else setTest(response.payload.test);
        // const info =
      } catch (error) {
        setError(error.message);
      }
    }

    retireve();
  }, []);

  useEffect(function () {
    async function retrieve() {
      try {
        const response = await fetch(
          `http://localhost:3000/test/completedTestsByuser/${user._id}`
        );
        const data = await response.json();
        if (response.status) {
          data.forEach((element) => {});
          const requiredData = data.find((res) => res.testId._id === testId);
          setResult(requiredData);
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
      {/* <div ref={reportTemplate}>
      <ReportTemplate />
    </div> */}
      {error && <Error message={error} setter={setError} />}
      <div className="result-container w-full h-auto flex items-center justify-center">
        <div>
          <h2>{test?.title}</h2>
          <h3 className="my-4">Candidate Information</h3>
          <p>
            <strong>Name : </strong>
            {user.name}
          </p>
          <p>
            <strong>Division : </strong>
            {user.division}
          </p>
          {test._id && (
            <table className="mt-10">
              <tbody>
                <tr>
                  <td className="pt-4 pr-4">
                    <strong>Duration:</strong> {test?.testDuration} mins
                  </td>
                  <td>
                    <strong>Total Marks:</strong> {test.highestMarks}
                  </td>
                </tr>
                <tr>
                  <td className="pr-4">
                    <strong>Test Status:</strong>{" "}
                    {test?.isReleased
                      ? Number(test.passingScore) <= Number(result.score)
                        ? "Passed"
                        : "Failed"
                      : "Test answers not released yet"}
                  </td>
                  {test.isReleased && (
                    <td>
                      <strong>Marks Earned:</strong> {result.score}
                    </td>
                  )}
                </tr>
                {test.isReleased && (
                  <tr>
                    <td className="pr-4">
                      <strong>Correct Answer:</strong> {result.score}/
                      {test?.questions?.length}
                    </td>
                    <td>
                      <strong>Wrong / Not Submitted:</strong>{" "}
                      {test?.questions?.length - result.score}/
                      {test?.questions?.length}
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="pr-4">
                    <strong>Attempt:</strong> {test?.questions?.length}/
                    {test?.questions?.length}
                  </td>
                  <td>
                    <strong>Skipped:</strong> 0/{test?.questions?.length}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>

      {loading && <Loader />}

      {test?.isReleased && !loading && (
        <>
          <button
            className="btn-tertiary mt-8 mx-auto block"
            onClick={createAndDownloadPdf}
          >
            Download Report
          </button>

          <h2 className="text-center mt-10">List Of Questions</h2>
          <div className="max-w-[500px] px-10 mx-auto">
            {test._id &&
              test?.questions.map((question, index) => (
                <Question
                  key={question._id}
                  answer={result.useranswers?.at(index) || -1}
                  question={question}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
}

function Question({ question, answer }) {
  return (
    <div className="mt-10 border-2">
      <div className={`border-0 ${inputStyles}`}>
        <strong>
          {question.id}&#10089; {question.title}
        </strong>
      </div>
      <p className="text-right">
        {question.answer === answer
          ? "correct answer"
          : answer === -1
          ? "not answered"
          : "wrong answer"}
      </p>
      {question.options.map((option, index) => (
        <div
          key={option.id}
          className={`px-4 py-2 ${
            answer === option.id && option.id !== question.answer
              ? "bg-red-500"
              : ""
          } ${option.id === question.answer ? "bg-green-500" : ""} `}
        >
          {index + 1}&#10089; {option.value}
        </div>
      ))}
    </div>
  );
}
