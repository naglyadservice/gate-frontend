import logo from "../assets/logo.svg";
import burgerSrc from "../assets/burger.svg";
import { useDrawer } from "../state/zustand";
import { navLinks } from "../state/navLinks";



function Header() {
  const toggleDrawer = useDrawer(selector => selector.toggleDrawer);

  return (
    <div className='py-6 border-b-2 border-[#ebecec]'>
      <div className="flex justify-between items-center">
        <a
          href="https://www.npc.com.ua/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70"
        >
          <img src={logo} alt="logo" className="w-20 sm:w-28 " />
        </a>

        <ul className='hidden sm:flex items-center gap-2 md:gap-5 font-medium'>
          {navLinks.map((el, i) => (
            <li key={i}>
              <a
                className="block px-4 py-2 hover:opacity-70"
                href={el.link}
              >
                {el.text}
              </a>
            </li>
          ))}
        </ul>

        <img
          className="sm:hidden hover:opacity-50 cursor-pointer"
          src={burgerSrc}
          alt=""
          onClick={() => toggleDrawer()}
        />

        {/* <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70"
        >
          <img src={personalArea} alt="" />
        </a> */}
      </div>
    </div>
  )
}

export default Header