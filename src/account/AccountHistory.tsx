import AccountHistoryItem from './AccountHistoryItem'



function AccountHistory() {
  return (
    <div >
      <div className='flex flex-col gap-4'>
        <div className="flex items-center gap-4 justify-between">
          <span className='text-lg font-bold'>Історія</span>
        </div>
        <div className='flex flex-col gap-3'>
          <AccountHistoryItem />
        </div>
      </div>
    </div>
  )
}

export default AccountHistory