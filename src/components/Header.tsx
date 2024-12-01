import { useAuth } from "../state/auth";
import { useDrawer } from "../state/drawer";
import logo from "../assets/logo.svg";
import personalArea from "../assets/personal-area.svg";
import { LogOut } from "lucide-react";



function Header() {
  const { isDrawer, toggleDrawer } = useDrawer();
  const { name, email, picture_url, logout } = useAuth();

  return (
    <div className='pt-6 pb-3 relative'>
      <div className="flex justify-between items-center">
        <a
          href="https://www.npc.com.ua/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70"
        >
          <img src={logo} alt="logo" className="w-20 sm:w-28 " />
        </a>

        <div>
          <img
            className="w-10 h-10 rounded-full object-cover object-center cursor-pointer"
            src={picture_url}
            alt=""
            onClick={toggleDrawer}

            onError={(e) => e.currentTarget.src = personalArea}
          />
        </div>

        {isDrawer && (
          <div className="absolute z-10 top-full right-0">
            <div className="p-3 bg-white rounded-md border">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <span>{name}</span>
                  <span className="text-black/50">{email}</span>
                </div>
                <hr />
                <button onClick={logout} className="flex items-center w-full gap-2 hover:opacity-70">
                  <LogOut size={18} />
                  <span>Вихід</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header