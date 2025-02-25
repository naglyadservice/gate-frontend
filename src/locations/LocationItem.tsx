import { Pencil } from "lucide-react";

import { useAccountTab } from "../state/account.tabs";
import { useAccountSettings } from "../state/acoount.settings";

import src from "../assets/location.svg";

interface IProps {
  id: string;
  name: string;
  address?: string;

  isEditing: boolean;
}



function LocationItem({ name, id, isEditing }: IProps) {
  const setTabs = useAccountTab(selector => selector.setTab);
  const setCurrentLocation = useAccountSettings(selector => selector.setCurrentLocation);

  const onEditClick = () => {
    setCurrentLocation(id);
    setTabs("settings/location");
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
        <span className='font-medium text-[#5977ff] uppercase'>{name || id}</span>
        {/* <span className='font-semibold'>{address || ""}</span> */}
      </div>

      {isEditing && (
        <button className="ml-auto flex-shrink-0 p-2 rounded-md border-2 border-[#596BFF] hover:opacity-60" onClick={onEditClick}>
          <Pencil color="#596BFF" />
        </button>
      )}
    </li>
  )
}

export default LocationItem