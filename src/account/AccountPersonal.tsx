import React from 'react'
import toast from 'react-hot-toast';
import { IMaskInput } from 'react-imask';

import apiClient from '../utils/client';
import { useAuth } from '../state/auth';
import src from "../assets/personal-area.svg";

import Button from '../components/Button';
import MyInput from '../components/MyInput';
import { useAccountTab } from '../state/account.tabs';



function AccountPersonal() {
  const auth = useAuth();
  const setTabs = useAccountTab(selector => selector.setTab);
  const [name, setName] = React.useState(auth.name || "");
  const [apartment_number, setApartmentNumber] = React.useState(auth.apartment_number || "");
  const [phone_number, setPhoneNumber] = React.useState(auth.phone_number || "");
  const [auto_1, setAuto1] = React.useState(auth.auto_1 || "");
  const [auto_2, setAuto2] = React.useState(auth.auto_2 || "");


  const onSaveButtonClick = () => {
    apiClient.patch(`/users/me`, {
      name, apartment_number,
      auto_1, auto_2,
      phone_number,
    })
      .then(() => toast.success("Зміни збережено"))
      .then(() => auth.getAuthMe())
      .then(() => setTabs(""))
      .catch(() => toast.error("Помилка під час запиту"));
  }

  return (
    <div >
      <div className='flex flex-col gap-4'>
        <div className="flex items-center gap-4 justify-between">
          <span className='text-lg font-bold'>Про мене</span>
        </div>

        <div className="flex items-center gap-2">
          <div className='flex-shrink-0'>
            <img src={auth.image_url} alt="" className='w-10 h-10 rounded-full' onError={(e) => e.currentTarget.src = src} />
          </div>
          <div className="flex flex-col gap-2 text-sm leading-none">
            <span className='font-semibold'>{auth.name}</span>
            <span className='text-black/50'>{auth.email}</span>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-2'>
            <span className='text-sm'>Ім'я</span>
            <MyInput value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className='flex flex-col gap-2'>
            <span className='text-sm'>Номер телефону</span>
            <IMaskInput
              mask="+38 (000) 000-00-00"
              defaultValue={auth.phone_number}
              onAccept={(val) => setPhoneNumber(val)}
              className='block w-full p-3 border border-[#AFAFB1] rounded-lg text-sm'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <span className='text-sm'>Номер квартиры</span>
            <MyInput value={apartment_number} onChange={(e) => setApartmentNumber(e.target.value)} type='number' />
          </div>

          <div className='flex flex-col gap-2'>
            <span className='text-sm'>Номер авто 1</span>
            <MyInput value={auto_1} onChange={(e) => setAuto1(e.target.value)} />
          </div>

          <div className='flex flex-col gap-2'>
            <span className='text-sm'>Номер авто 2</span>
            <MyInput value={auto_2} onChange={(e) => setAuto2(e.target.value)} />
          </div>

          <div className='flex justify-center'>
            <Button myColorScheme='filled' onClick={onSaveButtonClick}>Зберегти зміни</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPersonal