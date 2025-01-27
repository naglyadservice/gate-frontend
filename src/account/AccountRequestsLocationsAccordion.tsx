import { ChevronDown } from 'lucide-react';
import cn from "classnames";
import React from 'react';



function AccountRequestsLocationsAccordion() {
  const [isOpened, setIsOpened] = React.useState(false);

  const onTitleClick = () => {
    setIsOpened(prev => !prev);
  }

  return (
    <div className='text-base relative'>
      <div className='flex items-center cursor-pointer' onClick={onTitleClick}>
        <span className='p-2'>ЖК Київська Венеція</span>
        <ChevronDown size={16} className={cn(isOpened && "rotate-180")} />
      </div>

      {isOpened && (
        <div className='absolute z-10 top-full left-0 right-0'>
          <div className='flex flex-col divide-y divide-[#EBECEC]'>
            <span className='p-2 bg-white rounded cursor-pointer'>ЖК SVITLOPACK</span>
            <span className='p-2 bg-white rounded cursor-pointer'>ЖК Софія Київська</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountRequestsLocationsAccordion