export default function TestInfo({ test, index }) {
  return <div className="my-5">
    <p className="leading-3"><span className="inline-block bg-[#4169E1] text-white font-semibold px-2 py-2 rounded mr-2">
      {index + 1}
    </span> {test.title}</p>

  </div>
  
}