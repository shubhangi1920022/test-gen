import { useSelector } from "react-redux";

export default function TestCart({ test, showDetails }) {
  const { _id } = useSelector((store) => store.user);

  const isGiven = test.participants.findIndex((user) => user.userId === _id);

  const testStartTime = new Date(test.availableAt);
  const currentTime = new Date();
  const testEndTime = new Date(testStartTime.getTime() + test.duration * 60000);

  return (
    <>
      <div
        className="bg-transparent grow shadow-lg w-full md:w-[49%] sm:max-w-[350px] rounded-lg p-6 ring-2 ring-[#cccccc]"
        onClick={() => showDetails(test)}
      >
        <h3 className="text-[#4169E1]">{test.title}</h3>
        <p>
          Date: {test.availableAt?.substring(0, 10)?.split("-").join(" / ")}
        </p>
        <p>Duration: {test.testDuration} mins</p>
        <p>
          <strong className="text-[#2F4F4F]">Available At :</strong>{" "}
          {testStartTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        {currentTime >= testStartTime && currentTime <= testEndTime ? (
          "Test is going on"
        ) : isGiven !== -1 ? (
          <p className="text-right text-[#008000] font-semibold">Given</p>
        ) : (
          <p className="text-right text-[#FF0000] font-semibold">Not Given</p>
      
        )}
      </div>
    </>
  );
}
