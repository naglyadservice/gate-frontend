import React from "react";
import { CircleCheck, CircleX, Loader, Pencil } from "lucide-react";

import apiClient from "../utils/client";
import { useAccountSettings } from "../state/acoount.settings";
import { useAccountTab } from "../state/account.tabs";

import src from "../assets/gate.svg";
import Button from '../components/Button';

interface IProps {
  key?: number | string;
  gateFor: string;
  address: string;
  id: string;

  isEditing?: boolean;
}

type statuses = "loading" | "error" | "success" | "ready";



function GateItem({ gateFor, address, id, isEditing }: IProps) {
  const setTab = useAccountTab(selector => selector.setTab);
  const setCurrentGate = useAccountSettings(selector => selector.setCurrentGate);
  const [status, setStatus] = React.useState<statuses>("ready");

  const onOpenClick = () => {
    setStatus("loading");

    apiClient.post(`/users/me/accesspoints/${id}/activate`)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"))
      .finally(() => setTimeout(() => setStatus("ready"), 5000));
  }

  const onEditClick = () => {
    setCurrentGate({ id, gateFor, address });
    setTab("settings/gate");
  }

  return (
    <li className='flex items-center gap-4 p-3 sm:p-4 rounded-md bg-white'>
      <div className="flex-shrink-0">
        <img
          className='w-16 h-16 sm:w-20 sm:h-20 object-contain object-center rounded-md'
          src={src}
          alt=""
        />
      </div>

      <div className="flex flex-col text-sm sm:text-base">
        <span className='font-medium text-[#5977ff] uppercase'>{gateFor || id}</span>
        <span className='font-semibold'>{address || ""}</span>
      </div>

      {!isEditing && (
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
      )}

      {isEditing && (
        <button className="ml-auto hover:opacity-60" onClick={onEditClick}>
          <Pencil color="#596BFF" />
        </button>
      )}
    </li>
  )
}

export default GateItem