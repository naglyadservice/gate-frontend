import { useAccountTab } from '../state/account.tabs';

import Button from '../components/Button';
import LocationList from '../locations/LocationList';
import MyAccesspointsList from './AccountMyAccesspoints';



function AccountSettings() {
  const setTabs = useAccountTab(selector => selector.setTab);

  return (
    <div>
      <div className='flex flex-col gap-4'>
        <div className="flex items-center gap-4 justify-between">
          <span className='text-lg font-bold'>Налаштування</span>
        </div>
        <div className='flex flex-col gap-3'>
          <span className='text-base font-bold'>Мої локації</span>
          <LocationList />
          <Button myColorScheme="outlined" onClick={() => setTabs("settings/location/create")}>
            <span>Додати локацію</span>
          </Button>
        </div>
        <div className='flex flex-col gap-3'>
          <span className='text-base font-bold'>Мої точки доступу</span>
          <MyAccesspointsList />
        </div>
      </div>
    </div>
  )
}

export default AccountSettings