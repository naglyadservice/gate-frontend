import React from 'react'
import toast from 'react-hot-toast';

import apiClient from '../utils/client';
import { useAccountTab } from '../state/account.tabs';
import { useAccountSettings } from '../state/acoount.settings';

import MyInput from '../components/MyInput'
import Button from '../components/Button'



function AccountSettingsEditGate() {
  const setTabs = useAccountTab(selector => selector.setTab);
  const currentGate = useAccountSettings(selector => selector.currentGate);
  const [label, setLabel] = React.useState(currentGate?.gateFor || '');
  // const [address, setAddress] = React.useState(currentGate?.address || '');

  const onSaveButtonClick = () => {
    apiClient.patch(`/users/me/accesspoints/owned/${currentGate.id}`,
      {
        label,
        address: "",
        rtsp_url: "rtsp_url"
      })
      .then(() => {
        toast.success('Зміни збережено');
        setTabs("settings");
      }).catch(() => {
        toast.error("Помилка під час запиту");
      })
  }

  return (
    <div >
      <div className='flex flex-col gap-4'>
        <div className="flex items-center gap-4 justify-between">
          <span className='text-lg font-bold'>{currentGate.gateFor}</span>
        </div>

        <div className="flex flex-col gap-3">
          <div className='flex flex-col gap-2'>
            <span className='text-sm'>Назва точки доступу</span>
            <MyInput value={label} onChange={(e) => setLabel(e.target.value)} />
          </div>
          {/* <div className='flex flex-col gap-2'>
            <span className='text-sm'>Назва контролера</span>
            <MyInput value={address} onChange={(e) => setAddress(e.target.value)} />
          </div> */}
        </div>

        <div className='flex justify-center'>
          <Button myColorScheme='filled' onClick={onSaveButtonClick}>Зберегти зміни</Button>
        </div>
      </div>
    </div>
  )
}

export default AccountSettingsEditGate