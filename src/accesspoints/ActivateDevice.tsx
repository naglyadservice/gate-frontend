import React from 'react'
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useLocation } from 'react-router'
import { AlertCircle, CheckCircle, X } from 'lucide-react';

import apiClient from '../utils/client';



function ActivateDevice() {
  const { pathname, search } = useLocation();
  const [isModal, setIsModal] = React.useState<boolean | string>(false);
  const [isSuccess, setIsSucess] = React.useState(true);

  React.useEffect(() => {
    if (pathname !== "/activate-device") return;
    const params = new URLSearchParams(search);
    const token = params.get("token");

    if (token) {
      apiClient.post(`/users/me/devices/activate`, { token })
        .then(() => {
          setIsSucess(true);
          setIsModal("Токен активовано");
          toast.success("Токен активовано");
        }).catch((err) => {
          setIsSucess(true);
          const error = err as unknown as AxiosError<{ detail: string }>;
          const msg = error.response?.data?.detail || "Помилка під час запиту";
          setIsSucess(false);
          setIsModal(msg);
          toast.error(msg);
        })
    } else {
      toast.error("Токен відстутній")
    }
  }, [pathname])

  const onModalClose = () => {
    setIsModal(false);
    window.location.assign("/");
  }

  if (isModal) {
    return <div className='fixed bottom-0 top-0 left-0 right-0 z-50 bg-black bg-opacity-50 overflow-auto shadow-lg'>
      <div className='min-h-[100vh] w-full py-10 px-3 flex flex-col justify-center items-center '>
        <div className='bg-white rounded-xl w-full max-w-sm p-6 relative'>
          <button
            onClick={onModalClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col items-center text-center animate-fadeIn">
            <div className="mb-4 rounded-full bg-green-100 p-3">
              {isSuccess
                ? (<CheckCircle size={48} className="text-green-500" />)
                : (<AlertCircle size={48} className="text-red-500" />)}
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {isModal}
            </h3>
          </div>
        </div>
      </div>
    </div>
  }

  return null
}

export default ActivateDevice;