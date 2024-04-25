import PreviousTests from "./dashboard/PreviousTests";
import UpcomingTests from "./dashboard/UpcomingTests";

export default function Dashboard() {
  return <div>
    <div className="relative">
  <h1>Welcome To Your Dashboard</h1>
  <div className="absolute left-0 w-20 h-2 bg-blue-500 rounded-md rounded-tr-md mt-2"></div>
</div>


    <div className="mt-10">
      <UpcomingTests />
      {/* <PreviousTests /> */}
    </div>

  </div>
}