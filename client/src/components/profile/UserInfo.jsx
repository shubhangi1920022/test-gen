import { useSelector } from "react-redux";
import user from "/user.png";

export default function UserInfo() {
  const name = useSelector(store => store.user.name)
  const email = useSelector(store => store.user.email)

  return <div className="flex items-center gap-2">
    <img src={user} className="w-15 h-12 object-cover" />
    <div>
      <h3 className="leading-5 text-xl font-semibold">{name}</h3>
      {/* <h3 className="leading-5 text-1xl font-semibold mt-2">{email}</h3> */}
    </div>
  </div>
}