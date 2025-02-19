import React from 'react';
import cn from "classnames";
import toast from 'react-hot-toast';
import { ChevronDown } from 'lucide-react';

import apiClient from '../utils/client';
import { useLocation } from '../state/locations';
import src from "../assets/personal-area.svg";

import Button from '../components/Button';



function AccountUsersItem(props: Partial<IUser>) {
  const [isOpened, setIsOpened] = React.useState(false);
  const selectedLocation = useLocation(selector => selector.selectedLocation);
  const [isButtoned, setIsButtoned] = React.useState(false);

  const onTitleClick = () => {
    setIsOpened(prev => !prev)
  }

  const onBlockClick = () => {
    if (!selectedLocation?.id) return console.log("no location's id");
    if (!props?.id) return console.log("no user's id");

    apiClient.delete(`/users/me/locations/${selectedLocation?.id}/users/${props.id}`)
      .then(() => setIsButtoned(true))
      .catch(() => toast.error("Помилка під час запиту"));
  }

  if (isButtoned) return null;

  return (
    <div className='p-3 bg-white rounded-lg'>
      <div className={cn("flex flex-col", (isOpened ? "gap-6" : "gap-4"))}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={onTitleClick}>
          <div className="flex-shrink-0">
            <img src={props.image_url} alt="" className='w-10 h-10 rounded-full' onError={(e) => e.currentTarget.src = src} />
          </div>
          <div className="flex flex-col gap-2 text-sm leading-none">
            <span className='font-semibold'>{props.name}</span>
            <span className='text-black/50'>{props.email}</span>
          </div>
          <ChevronDown size={18} className={cn('ml-auto', (isOpened && "rotate-180"))} />
        </div>

        {isOpened && (
          <div className="flex gap-6 text-sm leading-none">
            <div className="flex flex-col gap-3 flex-1">
              <span>Номери машин</span>
              <span className='font-semibold'>{props.auto_1 || "—"}</span>
              <span className='font-semibold'>{props.auto_2 || "—"}</span>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <span>Номер телефону</span>
              <span className='font-semibold'>{props.phone_number || "—"}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {/* <Button myColorScheme='filled' className='flex-1'>Зробити Модератором</Button> */}
          <Button myColorScheme='blocked' className='flex-1' onClick={onBlockClick}>Блокувати</Button>
        </div>
      </div>
    </div>
  )
}

export default AccountUsersItem