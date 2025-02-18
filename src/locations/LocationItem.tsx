import { Pencil } from "lucide-react";

import { useAccountTab } from "../state/account.tabs";
import { useAccountSettings } from "../state/acoount.settings";

import src from "../assets/location.svg";

interface IProps {
  id: string;
  address: string;
  label: string;

  isEditing: boolean;
}



function LocationItem({ address, label, id, isEditing }: IProps) {
  const setTabs = useAccountTab(selector => selector.setTab);
  const setCurrentLocation = useAccountSettings(selector => selector.setCurrentLocation);

  const onEditClick = () => {
    setCurrentLocation(id);
    setTabs("settings/location");
  }

  return (
    <li className='flex items-center gap-4 p-3 sm:p-4 rounded-md bg-white'>
      <img
        className='w-16 h-16 sm:w-20 sm:h-20 object-contain object-center rounded-md'
        src={src}
        alt=""
      />

      <div className="flex flex-col text-sm sm:text-base">
        <span className='font-medium text-[#5977ff] uppercase'>{label || id}</span>
        <span className='font-semibold'>{address || ""}</span>
      </div>

      {isEditing && (
        <button className="ml-auto hover:opacity-60" onClick={onEditClick}>
          <Pencil color="#596BFF" />
        </button>
      )}
    </li>
  )
}

export default LocationItem