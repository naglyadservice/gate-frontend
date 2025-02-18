import React from 'react'
import AccountHistoryItem from './AccountHistoryItem'
import AccountRequestsLocationsAccordion from './AccountRequestsLocationsAccordion'

import apiClient from '../utils/client';
import { useLocation } from '../state/locations';
import toast from 'react-hot-toast';

interface IRequest {
  user: IUser;
  accesspoint: IAccesspoint,
  created_at: string;
}



function AccountHistory() {
  const [history, setHistory] = React.useState<IRequest[]>([]);
  const selectedLocation = useLocation(selector => selector.selectedLocation);

  React.useEffect(() => {
    if (!selectedLocation?.id) return;

    apiClient.get(`/users/me/locations/${selectedLocation.id}/logs`)
      .then((res) => {
        if (res.status != 200) return toast.error("Помилка під час запиту");
        setHistory(res.data);
      }).catch(() => {
        toast.error("Помилка під час запиту");
      })
  }, [selectedLocation])

  return (
    <div >
      <div className='flex flex-col gap-4'>
        <div className="flex items-center gap-4 justify-between">
          <span className='text-lg font-bold'>Історія</span>
          <AccountRequestsLocationsAccordion />
        </div>
        <div className='flex flex-col gap-3'>
          {history.length === 0 && <>Історія по локації "{selectedLocation?.name}" відсутня</>}

          {history.length > 0 && history.map((item, index) => (
            <AccountHistoryItem {...item.user} key={index} />
          ))}

          {/* <AccountHistoryItem
            user={{ name: "Тестовый", auto_1: "AP1221AP" }}
            accesspoint={{ address: "вул. Симона Петлюри 32, м. Київ" }}
            created_at='2025-02-18T09:41:13.243Z'
          /> */}
        </div>
      </div>
    </div>
  )
}

export default AccountHistory