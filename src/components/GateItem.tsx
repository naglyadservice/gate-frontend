import React from "react";
import { useGates } from "../state/gates";
import { useAuth } from "../state/auth";
import src from "../assets/gate.svg";
import Button from './Button';
import { Loader } from "lucide-react";

interface IProps {
  key?: number | string;
  gateFor: string;
  address: string;
  id: string;
}



function GateItem({ gateFor, address, id }: IProps) {
  const user_id = useAuth(selector => selector.user_id);
  const { openGateById } = useGates();
  const [isLoader, setIsLoader] = React.useState(false);

  const onOpenClick = () => {
    openGateById(user_id, id)
      .finally(() => {
        setIsLoader(false)
      });

    setIsLoader(true);
  }

  return (
    <li className='flex items-center gap-4 p-3 sm:p-4 rounded-md bg-white'>
      <img
        className='w-16 h-16 sm:w-20 sm:h-20 object-contain object-center rounded-md'
        src={src}
        alt=""
      />

      <div className="flex flex-col text-sm sm:text-base">
        <span className='font-medium text-[#5977ff] uppercase'>{gateFor}</span>
        <span className='font-semibold'>{address}</span>
      </div>

      <Button myColorScheme='filled' className='ml-auto relative' onClick={onOpenClick} disabled={isLoader}>
        {isLoader && (<Loader className="animate-spin absolute" />)}

        <span className={(isLoader ? "opacity-0" : "")}>Відкрити</span>
      </Button>
    </li>
  )
}

export default GateItem