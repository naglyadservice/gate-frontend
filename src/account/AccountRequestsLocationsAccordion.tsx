import { ChevronDown } from 'lucide-react';
import cn from "classnames";
import React from 'react';
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
        <span className='p-2'>{selectedLocation?.name}</span>
        <ChevronDown size={16} className={cn(isOpened && "rotate-180")} />
      </div>

      {isOpened && (
        <div className='absolute z-10 top-full right-0 w-full'>
          <div className='flex flex-col divide-y divide-[#EBECEC]'>
            {
              locations && locations.map(el => (
                <span className='p-2 bg-white rounded cursor-pointer' onClick={onLocationClick.bind(null, el)} key={el.id}>{el.name}</span>
              ))
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountRequestsLocationsAccordion