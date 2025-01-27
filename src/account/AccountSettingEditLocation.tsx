import React from 'react'
import MyInput from '../components/MyInput'
import Button from '../components/Button'
import { useAccountSettings } from '../state/acoount.settings';
import { Copy, MapPin, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAccountTab } from '../state/account.tabs';



function AccountSettingsEditLocation() {
  const setTabs = useAccountTab(selector => selector.setTab);
  const currentLocation = useAccountSettings(selector => selector.currentLocation);
  const [name, setName] = React.useState(currentLocation?.name || '');
  const [city, setCity] = React.useState(currentLocation?.city || '');
  const [address, setAddress] = React.useState(currentLocation?.address || '');
  const [cameraUrl, setCameraUrl] = React.useState(currentLocation?.cameraUrl || '');
  const [code, setCode] = React.useState(currentLocation?.code || '');

  const onSaveButtonClick = () => {
    toast.success('Зміни збережено');
  }

  const onCopyButtonClick = () => {
    window.navigator.clipboard.writeText(code);
    toast.success('Код доступу скопійовано в буфер обміну');
  }

  const onEditAccessPointClick = () => {
    setTabs("settings/location/accesspoint");
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
            <span className='text-sm'>Місто</span>
            <MyInput value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-sm'>Адреса</span>
            <MyInput value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-sm'>URL камери</span>
            <MyInput value={cameraUrl} onChange={(e) => setCameraUrl(e.target.value)} />
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-sm'>Код доступу</span>
            <div className='relative'>
              <MyInput value={code} onChange={(e) => setCode(e.target.value)} />
              <Copy size={18} onClick={onCopyButtonClick} className='absolute top-[50%] right-3 -translate-y-[50%] hover:opacity-60 cursor-pointer' />
            </div>
          </div>
        </div>

        <div className='flex justify-center'>
          <Button myColorScheme='filled' onClick={onSaveButtonClick}>Зберегти зміни</Button>
        </div>

        <div className="flex items-center gap-2">
          <span className='text-lg font-bold'>Прив’язані точки доступу</span>
        </div>

        <ul className="flex flex-col px-2 py-1 bg-white rounded-lg divide-y divide-[#E5E5E5] text-sm">
          <li className='px-1 py-3'>вул. Симона Петлюри 32, м. Київ</li>
          <li className='px-1 py-3'>вул. Симона Петлюри 32, м. Київ</li>
        </ul>

        <div className='flex justify-center'>
          <Button myColorScheme='filled' onClick={onEditAccessPointClick}>Редагувати</Button>
        </div>
      </div>
    </div>
  )
}

export default AccountSettingsEditLocation