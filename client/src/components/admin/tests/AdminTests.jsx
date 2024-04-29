import { Link, NavLink, Outlet } from "react-router-dom";

export default function AdminTests() {
  return <div>
    <div className="flex items-center justify-evenly">
      <Link to="/admin/tests" style={{ width: "max-content" }}>
        <button className="bg-[#4CAF50] text-white">Create Test</button>
      </Link>
      <NavLink to="/admin/tests/release-test" style={{ width: "max-content" }}>
        <button className="bg-blue-500 text-white">Edit Test</button>
      </NavLink>
    </div>
    <Outlet />
  </div>
}