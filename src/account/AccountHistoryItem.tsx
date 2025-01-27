import React from 'react';
import cn from "classnames";
import { ChevronDown } from 'lucide-react';

import src from "../assets/personal-area.svg";



function AccountHistoryItem() {
  const [isOpened, setIsOpened] = React.useState(false);

  const onTitleClick = () => {
    setIsOpened(prev => !prev)
  }

  return (
    <div className='p-3 bg-white rounded-lg'>
      <div className={cn("flex flex-col", (isOpened ? "gap-6" : "gap-4"))}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={onTitleClick}>
          <img src="" alt="" className='w-10 h-10 rounded-full' onError={(e) => e.currentTarget.src = src} />
          <div className="flex flex-col gap-2 text-sm leading-none">
            <span className='font-semibold'>Дмитро Федотов</span>
            <span >19:32 вул. Симона Петлюри 32, м. Київ</span>
          </div>
          <ChevronDown size={18} className={cn('ml-auto', (isOpened && "rotate-180"))} />
        </div>

        {isOpened && (
          <div className="flex gap-6 text-sm leading-none">
            <div className="flex flex-col gap-3 flex-1">
              <span>Номер авто</span>
              <span className='font-semibold'>AE4675F</span>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <img src={"/history.jpg"} alt="" className='aspect-video' />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountHistoryItem