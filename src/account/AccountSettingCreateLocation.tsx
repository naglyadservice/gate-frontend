import React from 'react';
import toast from 'react-hot-toast';
import MyInput from '../components/MyInput';
import Button from '../components/Button';
import apiClient from '../utils/client';
import { useAccountTab } from '../state/account.tabs';



function AccountSettingsCreateLocation() {
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [access_code, setCode] = React.useState('');
  const { setTab } = useAccountTab();

  const onSaveButtonClick = () => {
    if (!name.trim() || !address.trim() || !access_code.trim()) return toast.error('Не всі поля заповнені');

    apiClient.post("/users/me/locations", {
      name, address, access_code,
      accesspoint_ids: []
    }).then(res => {
      if (res.status === 200) {
        setTab("settings/location");
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
          <div className='flex flex-col gap-2'>
            <span className='text-sm'>Код доступу</span>
            <div className='relative'>
              <MyInput value={access_code} onChange={(e) => setCode(e.target.value.trimStart())} />
            </div>
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