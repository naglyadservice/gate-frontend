import { Pencil } from "lucide-react";

import src from "../assets/location.svg";

import { useAccountSettings } from "../state/acoount.settings";
import { useAccountTab } from "../state/account.tabs";

interface IProps {
  key?: number | string;
  name: string;
  address: string;
  id: string;
}



function LocationItem({ name, address, id }: IProps) {
  const setTab = useAccountTab(selector => selector.setTab);
  const setCurrentLocation = useAccountSettings(selector => selector.setCurrentLocation);

  const onEditClick = () => {
    setCurrentLocation({ id, name, address });
    setTab("settings/location");
  }

  return (
    <li className='flex items-center gap-4 p-3 sm:p-4 rounded-md bg-white'>
      <img
        className='w-16 h-16 sm:w-20 sm:h-20 object-contain object-center rounded-md'
        src={src}
        alt=""
      />

      <div className="flex flex-col text-sm sm:text-base">
        <span className='font-semibold'>{address}</span>
      </div>

      <button className="ml-auto hover:opacity-60" onClick={onEditClick}>
        <Pencil color="#596BFF" />
      </button>
    </li>
  )
}

export default LocationItem