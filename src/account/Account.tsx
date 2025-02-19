import { ArrowLeft } from 'lucide-react';

import { useAccountTab } from '../state/account.tabs';

import AccountPersonal from './AccountPersonal';
import AccountRequests from './AccountRequests';
import AccountHistory from './AccountHistory';
import AccountUsers from './AccountUsers';
import AccountSettings from './AccountSettings';
import AccountSettingsEditGate from './AccountSettingEditGate';
import AccountSettingsEditLocation from './AccountSettingEditLocation';
import AccountSettingsEditLocationAccesspoints from './AccountSettingEditLocationAccesspoints';
import AccountSettingsCreateLocation from './AccountSettingCreateLocation';




function Account() {
  const { tab, setTab } = useAccountTab();

  const onBackClick = () => {
    if (tab === "settings/gate") return setTab("settings");
    if (tab === "settings/location") return setTab("settings");
    if (tab === "settings/location/create") return setTab("settings");
    if (tab === "settings/location/accesspoint") return setTab("settings/location");

    setTab("");
  }

  return (
    <div className='flex flex-col gap-4 py-3'>
      <div className="flex items-center gap-2 pb-3 border-b-2 border-[##596BFF] cursor-pointer" onClick={onBackClick}>
        <ArrowLeft size={18} color='#596BFF' />
        <span className='font-bold text-sm text-[#596BFF]'>Назад</span>
      </div>

      {tab === "personal" && <AccountPersonal />}
      {tab === "requests" && <AccountRequests />}
      {tab === "history" && <AccountHistory />}
      {tab === "users" && <AccountUsers />}
      {tab === "settings" && <AccountSettings />}
      {tab === "settings/gate" && <AccountSettingsEditGate />}
      {tab === "settings/location" && <AccountSettingsEditLocation />}
      {tab === "settings/location/create" && <AccountSettingsCreateLocation />}
      {tab === "settings/location/accesspoint" && <AccountSettingsEditLocationAccesspoints />}
    </div>
  )
}

export default Account