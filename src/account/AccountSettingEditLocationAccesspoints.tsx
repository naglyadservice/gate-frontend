import toast from 'react-hot-toast';
import Button from '../components/Button';
import { Checkbox } from 'antd';



function AccountSettingsEditLocationAccesspoints() {

  const onSaveButtonClick = () => {
    toast.success('Зміни збережено');
  }

  return (
    <div >
      <div className='flex flex-col gap-4'>
        <div className="flex items-center gap-2">
          <span className='text-lg font-bold'>Оберіть точки доступу</span>
        </div>

        <ul className="flex flex-col px-2 py-1 bg-white rounded-lg divide-y divide-[#E5E5E5] text-sm">
          <li className='px-1 py-3 flex items-center'>
            <span>вул. Симона Петлюри 32, м. Київ</span>
            <Checkbox className='ml-auto' />
          </li>
          <li className='px-1 py-3 flex items-center'>
            <span>вул. Симона Петлюри 32, м. Київ</span>
            <Checkbox className='ml-auto' />
          </li>
        </ul>

        <div className='flex justify-center'>
          <Button myColorScheme='filled' onClick={onSaveButtonClick}>Зберегти зміни</Button>
        </div>
      </div>
    </div>
  )
}

export default AccountSettingsEditLocationAccesspoints