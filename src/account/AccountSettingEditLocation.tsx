import React from 'react'
import toast from 'react-hot-toast';
import { Copy, MapPin } from 'lucide-react';

import apiClient from '../utils/client';
import { useAccountTab } from '../state/account.tabs';
import { useAccountSettings } from '../state/acoount.settings';

import MyInput from '../components/MyInput'
import Button from '../components/Button'




function AccountSettingsEditLocation() {
  const setTabs = useAccountTab(selector => selector.setTab);
  const currentLocation = useAccountSettings(selector => selector.currentLocation);
  const [name, setName] = React.useState(currentLocation?.name || '');
  const [address, setAddress] = React.useState(currentLocation?.address || '');
  const [access_code] = React.useState(currentLocation?.access_code || '');

  const onSaveButtonClick = () => {
    const { access_code, ...rest } = currentLocation;

    apiClient.patch(`/users/me/locations/${currentLocation.id}`, {
      ...rest,
      name: name,
      address: address
    }).then((res) => {
      if (res.status != 204) return toast.error("Помилка під час відправлення");
      setTabs("settings");
      toast.success('Зміни збережено');
    }).catch(() => { toast.error("Помилка під час відправлення") })
  }

  const onCopyButtonClick = () => {
    window.navigator.clipboard.writeText(access_code);
    toast.success('Код доступу скопійовано в буфер обміну');
  }

  const onEditAccessPointClick = () => {
    setTabs("settings/location/accesspoint");
  }

  const onDeleteClick = () => {
    apiClient.delete(`/users/me/locations/${currentLocation.id}`)
      .then(() => {
        setTabs("settings");
        toast.success('Локацію видалено');
      })
      .catch(() => { toast.error("Помилка під час відправлення") })
  }

  return (
    <div >
      <div className='flex flex-col gap-4'>
        <div className="flex items-center gap-2">
          <MapPin size={18} color='#58A0FF' />
          <span className='text-lg font-bold'>{currentLocation.name}</span>
        </div>

        <div className="flex flex-col gap-3">
          <div className='flex flex-col gap-2'>
            <span className='text-sm'>Назва локації</span>
            <MyInput value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-sm'>Адреса</span>
            <MyInput value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-sm'>Код доступу</span>
            <div className='relative'>
              <MyInput value={access_code} onChange={() => { }} readonly={true} />
              <Copy size={18} onClick={onCopyButtonClick} className='absolute top-[50%] right-3 -translate-y-[50%] hover:opacity-60 cursor-pointer' />
            </div>
          </div>
        </div>

        <div className='flex justify-between gap-5'>
          <Button myColorScheme='filled' onClick={onSaveButtonClick}>Зберегти зміни</Button>
          <Button myColorScheme='blocked' onClick={onDeleteClick}>Видалити локацію</Button>
        </div>

        <div className="flex items-center gap-2">
          <span className='text-lg font-bold'>Прив’язані точки доступу</span>
        </div>

        <ul className="flex flex-col px-2 py-1 bg-white rounded-lg divide-y divide-[#E5E5E5] text-sm">
          {currentLocation.accesspoints?.length === 0 && <span className='px-1 py-3'>Відсутні прив’язані точки доступу</span>}

          {currentLocation.accesspoints &&
            currentLocation.accesspoints?.length > 0 &&
            currentLocation.accesspoints.map(el => (
              <li
                key={el.id}
                className='px-1 py-3'
              >{el.address || el.label || el.id}</li>
            ))}
        </ul>

        <div className='flex justify-center'>
          <Button myColorScheme='filled' onClick={onEditAccessPointClick}>Редагувати</Button>
        </div>
      </div >
    </div >
  )
}

export default AccountSettingsEditLocation