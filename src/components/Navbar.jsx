import { useNavigate } from "react-router-dom";
import Logout from "./LogOut";

function Navbar({ className }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const menus = [
    {
      txt: "Kitoblar",
      url: "/",
    },
    {
      txt: "Mualliflar",
      url: "/authors",
    },
  ];

  return (
    <div
      className={`${className} mt-[25px] flex items-center justify-between pb-[30px] border-b border-[#c9c9c9]`}
    >
      <h1 className="font-dancing ml-[81px] mr-96 text-[25px] uppercase text-[#C9AC8C]">
        <a href="/">badiiyat</a>
      </h1>

      <ul className="flex items-center gap-[35px] justify-center">
        {menus.map((menu, index) => (
          <li className="hover:underline" key={index}>
            <a href={menu.url}>{menu.txt}</a>
          </li>
        ))}
      </ul>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-gray-900 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
