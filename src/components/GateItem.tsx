import src from "../assets/gate.svg";
import Button from './Button';

interface IProps {
  key?: number | string;
  gateFor: string;
  address: string;
}

function GateItem({ key, gateFor, address }: IProps) {
  return (
    <li className='flex items-center gap-4 p-3 sm:p-4 rounded-md bg-white' key={key}>
      <img
        className='w-16 h-16 sm:w-20 sm:h-20 object-contain object-center rounded-md'
        src={src}
        alt=""
      />

      <div className="flex flex-col text-sm sm:text-base">
        <span className='font-medium text-[#5977ff] uppercase'>{gateFor}</span>
        <span className='font-semibold'>{address}</span>
      </div>

      <Button type='filled' className='ml-auto'>Відкрити</Button>
    </li>
  )
}

export default GateItem