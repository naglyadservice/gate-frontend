import AccountUsersItem from './AccountUsersItem';



function AccountUsers() {
  return (
    <div >
      <div className='flex flex-col gap-4'>
        <div className="flex items-center gap-4 justify-between">
          <span className='text-lg font-bold'>Користувачі</span>
        </div>
        <div className='flex flex-col gap-3'>
          <AccountUsersItem />
        </div>
      </div>
    </div>
  )
}

export default AccountUsers