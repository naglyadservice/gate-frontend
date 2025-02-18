import React from 'react';
import toast from 'react-hot-toast';

import apiClient from '../utils/client';
import { useLocation } from '../state/locations';

import { SmallSpinner } from '../components/Spinner';
import AccountUsersItem from './AccountUsersItem';
import AccountRequestsLocationsAccordion from './AccountRequestsLocationsAccordion';




function AccountUsers() {
  const [isLoading, setIsloading] = React.useState(false);
  const [users, setUsers] = React.useState<IUser[]>([]);
  const selectedLocation = useLocation(selector => selector.selectedLocation);

  React.useEffect(() => {
    if (!selectedLocation?.id) return;

    setIsloading(true);

    apiClient.get(`/users/me/locations/${selectedLocation.id}/users`)
      .then((res) => {
        if (res.status != 200) return toast.error("Помилка під час запиту");
        setUsers(res.data);
      }).catch(() => {
        toast.error("Помилка під час запиту");
      }).finally(() => setIsloading(false));
  }, [selectedLocation])

  return (
    <div >
      <div className='flex flex-col gap-4'>
        <div className="flex items-center gap-4 justify-between">
          <span className='text-lg font-bold'>Користувачі</span>
          <AccountRequestsLocationsAccordion />
        </div>
        <div className='flex flex-col gap-3'>
          {isLoading && <SmallSpinner />}

          {!isLoading && users.length === 0 && <span>Користувачі по локації "{selectedLocation?.name}" відсутні</span>}

          {!isLoading && users.length > 0 && users.map((item, index) => (
            <AccountUsersItem {...item} key={index} />
          ))}

          {/* <AccountUsersItem
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

export default AccountUsers