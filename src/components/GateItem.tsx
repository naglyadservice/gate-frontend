import React from "react";
import { CircleCheck, CircleX, Loader } from "lucide-react";

import src from "../assets/gate.svg";
import Button from './Button';
import { useGates } from "../state/gates";

interface IProps {
  key?: number | string;
  gateFor: string;
  address: string;
  id: string;
}

type statuses = "loading" | "error" | "success" | "ready";



function GateItem({ gateFor, address, id }: IProps) {
  const { openGateById } = useGates();
  const [status, setStatus] = React.useState<statuses>("ready");

  const onOpenClick = () => {
    setStatus("loading");

    openGateById(id)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"))
      .finally(() => setTimeout(() => setStatus("ready"), 5000));
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

      <Button
        myColorScheme='filled'
        className='ml-auto relative'
        onClick={onOpenClick}
        disabled={status === "loading"}
      >
        <span className={((status === "ready") ? "" : "opacity-0")}>Відкрити</span>

        {(status === "loading") && (<Loader className="animate-spin absolute" />)}
        {(status === "success") && (<CircleCheck className="absolute" />)}
        {(status === "error") && (<CircleX className="absolute" />)}
      </Button>
    </li>
  )
}

export default GateItem