import React from 'react';
import toast from 'react-hot-toast';

import apiClient from '../utils/client';
import { useAccountTab } from '../state/account.tabs';

import MyInput from '../components/MyInput';
import Button from '../components/Button';



function AccountSettingsCreateLocation() {
  const setTabs = useAccountTab(selector => selector.setTab);
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');

  const onSaveButtonClick = () => {
    if (!name.trim() || !address.trim()) return toast.error('Не всі поля заповнені');

    apiClient.post("/users/me/locations", {
      name, address,
      accesspoint_ids: []
    }).then(res => {
      if (res.status === 200) {
        setTabs("settings");
        return toast.success("Запит відправлено");
      }
      toast.error("Помилка під час відправлення");
    }).catch(() => { toast.error("Помилка під час відправлення") })
  }

  return (
    <div >
      <div className='flex flex-col gap-4'>
        <div className="flex flex-col gap-3">
          <div className='flex flex-col gap-2'>
            <span className='text-sm'>Назва локації</span>
            <MyInput value={name} onChange={(e) => setName(e.target.value.trimStart())} />
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-sm'>Адреса</span>
            <MyInput value={address} onChange={(e) => setAddress(e.target.value.trimStart())} />
          </div>
        </div>

        <div className='flex justify-center'>
          <Button myColorScheme='filled' onClick={onSaveButtonClick}>Створити локацію</Button>
        </div>
      </div>
    </div>
  )
}

export default AccountSettingsCreateLocation;