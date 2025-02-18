import React from 'react';
import cn from "classnames";
import { ChevronDown } from 'lucide-react';

import { useLocation } from '../state/locations';



function AccountRequestsLocationsAccordion() {
  const [isOpened, setIsOpened] = React.useState(false);
  const { locations, selectedLocation, selectLocation } = useLocation();

  const onTitleClick = () => {
    setIsOpened(prev => !prev);
  }

  const onLocationClick = (el: any) => {
    setIsOpened(false);
    selectLocation(el);
  }

  return (
    <div className='text-base relative'>
      <div className='flex items-center cursor-pointer' onClick={onTitleClick}>
        <span className='p-2'>{selectedLocation?.name || ""}</span>
        <ChevronDown size={16} className={cn(isOpened && "rotate-180")} />
      </div>

      {isOpened && (
        <div className='absolute z-10 top-full right-0 w-full'>
          <div className='flex flex-col divide-y divide-[#EBECEC] bg-white rounded'>
            {locations.length > 0 && locations.map(el => (
              <span
                key={el.id}
                onClick={onLocationClick.bind(null, el)}
                className='py-2 px-3 cursor-pointer'
              >
                {el.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountRequestsLocationsAccordion