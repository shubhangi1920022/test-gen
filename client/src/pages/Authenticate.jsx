import { Link, Outlet } from "react-router-dom";

export default function Authenticate() {
  return (
    <div className="md:w-[512px] mx-4 md:mx-auto pb-16">
      <h1 className="text-[28px] text-center font-bold my-10">Welcome User</h1>
      <Outlet />
      <Link
        to="/admin"
        className="block text-center mt-3 text-blue-900 hover:text-blue-600"
      >
        Admin Login
      </Link>
    </div>
  );
}
