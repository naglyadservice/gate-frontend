import GateList from '../gate/GateList'
import LocationList from '../gate/LocationList'



function AccountSettings() {
  return (
    <div>
      <div className='flex flex-col gap-4'>
        <div className="flex items-center gap-4 justify-between">
          <span className='text-lg font-bold'>Налаштування</span>
        </div>
        <div className='flex flex-col gap-3'>
          <span className='text-base font-bold'>Мої локації</span>
          <LocationList />
        </div>
        <div className='flex flex-col gap-3'>
          <span className='text-base font-bold'>Мої точки доступу</span>
          <GateList />
        </div>
      </div>
    </div>
  )
}

export default AccountSettings