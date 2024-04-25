export default function TestInfo({ test, index }) {
  return (
    <div className="my-6">
      <p className="leading-3 font-[400]">
        <span className="inline-block bg-[#4169E1] text-white font-semibold px-2 py-2 rounded mr-2">{index + 1}</span> {test.title} -{" "}
        {test?.availableAt?.substring(0, 10).split("-").join(" / ")}
      </p>
    </div>
  );
}
