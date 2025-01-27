import AccountRequestItem from './AccountRequestItem';
import AccountRequestsLocationsAccordion from './AccountRequestsLocationsAccordion';



function AccountRequests() {
  return (
    <div >
      <div className='flex flex-col gap-4'>
        <div className="flex items-center gap-4 justify-between">
          <span className='text-lg font-bold'>Запити</span>
          <AccountRequestsLocationsAccordion />
        </div>
        <div className='flex flex-col gap-3'>
          <AccountRequestItem />
        </div>
      </div>
    </div>
  )
}

export default AccountRequests