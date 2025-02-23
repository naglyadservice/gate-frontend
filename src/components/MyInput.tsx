import React from 'react';
import cn from 'classnames';

interface IProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  readonly?: boolean;
}



function MyInput({ value, onChange, placeholder, type = "text", readonly }: IProps) {
  return (
    <input
      className={cn(
        'block w-full p-3 border border-[#AFAFB1] rounded-lg text-sm',
        (readonly && 'outline-none')
      )}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readonly}
    />
  )
}

export default MyInput