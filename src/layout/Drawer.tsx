import cn from "classnames";
import burgerSrc from "../assets/burger.svg";
import { useDrawer } from '../state/drawer';


const navLinks = [
  { link: "/", text: "text" }
]



function Drawer() {
  const { isDrawer, toggleDrawer } = useDrawer();

  return (
    <div className={cn(
      'fixed top-0 right-0 z-10 min-h-full bg-white sm:hidden transition',
      (isDrawer ? "translate-x-0" : "translate-x-full")
    )}>
      <div className="flex flex-col gap-10 min-h-full px-4 py-6">
        <img
          src={burgerSrc}
          className='self-end hover:opacity-50 cursor-pointer'
          onClick={() => toggleDrawer()}
          alt=""
        />

        <ul className='flex flex-col items-center gap-4 font-medium'>
          {navLinks.map((el, i) => (
            <li key={i}>
              <a
                className="block px-4 hover:opacity-70"
                href={el.link}
              >
                {el.text}
              </a>
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}

export default Drawer