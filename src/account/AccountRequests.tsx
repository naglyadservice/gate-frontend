import React from 'react';
import toast from 'react-hot-toast';

import apiClient from '../utils/client';
import { useLocation } from '../state/locations';

import { SmallSpinner } from '../components/Spinner';
import AccountRequestItem from './AccountRequestItem';
import AccountRequestsLocationsAccordion from './AccountRequestsLocationsAccordion';

interface IRequest {
  id: string;
  user: IUser
}



function AccountRequests() {
  const [isLoading, setIsloading] = React.useState(false);
  const [request, setRequests] = React.useState<IRequest[]>([]);
  const selectedLocation = useLocation(selector => selector.selectedLocation);

  React.useEffect(() => {
    if (!selectedLocation?.id) return;

    setIsloading(true);

    apiClient.get(`/users/me/locations/${selectedLocation.id}/requests`)
      .then((res) => {
        if (res.status != 200) return toast.error("Помилка під час запиту");
        setRequests(res.data);
      }).catch(() => {
        toast.error("Помилка під час запиту");
      }).finally(() => setIsloading(false));
  }, [selectedLocation])


  return (
    <div >
      <div className='flex flex-col gap-4'>
        <div className="flex items-center gap-4 justify-between">
          <span className='text-lg font-bold'>Запити</span>
          <AccountRequestsLocationsAccordion />
        </div>
        <div className='flex flex-col gap-3'>
          {isLoading && <SmallSpinner />}

          {!isLoading && request.length === 0 && <>Запити на локацію "{selectedLocation?.name}" відсутні</>}

          {!isLoading && request.length > 0 && request.map(item => (
            <AccountRequestItem {...item.user} id={item.id} key={item.id} />
          ))}

          {/* <AccountRequestItem
            name='Тестовый Тестовый'
            email='test.test@gmail.com'
            phone_number='+38 111 111 1111'
            image_url=''
            auto_1='AE4675F'
            auto_2='AE7843D'
          /> */}
        </div>
      </div>
    </div>
  )
}

export default AccountRequests