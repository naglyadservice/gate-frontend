import toast from 'react-hot-toast';
import Button from '../components/Button';
import { Checkbox } from 'antd';
import React from 'react';
import { useAccountTab } from '../state/account.tabs';
import apiClient from '../utils/client';
import { useAccountSettings } from '../state/acoount.settings';



function AccountSettingsEditLocationAccesspoints() {
  const { currentLocation } = useAccountSettings();
  const [selectedIds, setSelectedIds] = React.useState<string[]>(currentLocation.accesspoints?.map(item => item.id) || []);
  const [myGates, setMyGates] = React.useState<IMyAccesspoints[]>([]);
  const { setTab } = useAccountTab()

  React.useEffect(() => {
    apiClient.get(`/users/me/accesspoints/owned`)
      .then((res) => {
        if (res.status != 200) return toast.error("Помилка під час запиту");
        setMyGates(res.data);
      }).catch(() => {
        toast.error("Помилка під час запиту");
      })
  }, [])

  const onSaveButtonClick = () => {
    if (!currentLocation?.id) return;

    apiClient.patch(`/users/me/locations/${currentLocation.id}`, {
      ...currentLocation,
      accesspoint_ids: selectedIds,
    }).then((res) => {
      if (res.status != 204) return toast.error("Помилка під час відправлення");
      setTab("settings");
      toast.success('Зміни збережено');
    }).catch(() => { toast.error("Помилка під час відправлення") })
  }

  const onCheckboxChange = (accesspoint_id: string) => {
    const isChecked = selectedIds.includes(accesspoint_id);

    if (isChecked) {
      setSelectedIds(prev => prev.filter(id => id !== accesspoint_id))
    } else {
      setSelectedIds(prev => prev.concat(accesspoint_id))
    }
  }

  return (
    <div >
      <div className='flex flex-col gap-4'>
        <div className="flex items-center gap-2">
          <span className='text-lg font-bold'>Оберіть точки доступу</span>
        </div>

        <ul className="flex flex-col px-2 py-1 bg-white rounded-lg divide-y divide-[#E5E5E5] text-sm">
          {myGates.length === 0 && <span className='px-1 py-3'>No gates</span>}

          {myGates.length > 0 && myGates.map(accesspoint => (
            <li className='px-1 py-3 flex items-center' key={accesspoint.id}>
              <span>{accesspoint.address || accesspoint.label || accesspoint.id}</span>
              <Checkbox
                className='ml-auto'
                checked={selectedIds.includes(accesspoint.id)}
                onChange={onCheckboxChange.bind(null, accesspoint.id)}
              />
            </li>
          ))}

          {/* <li className='px-1 py-3 flex items-center'>
            <span>Тестовая</span>
            <Checkbox className='ml-auto' />
          </li> */}
        </ul>

        <div className='flex justify-center'>
          <Button myColorScheme='filled' onClick={onSaveButtonClick}>Зберегти зміни</Button>
        </div>
      </div>
    </div>
  )
}

export default AccountSettingsEditLocationAccesspoints