import React from 'react'

interface IProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}



function MyInput({ value, onChange, placeholder }: IProps) {
  return (
    <input
      className='block w-full p-3 border border-[#AFAFB1] rounded-lg text-sm' type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

export default MyInput