import React from 'react'
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router'
import { AlertCircle, CheckCircle, TriangleAlert, X } from 'lucide-react';

import apiClient from '../utils/client';
import { useAccountTab } from '../state/account.tabs';

import MyInput from '../components/MyInput';
import Button from '../components/Button';



function ActivateDevice() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const setTabs = useAccountTab(selector => selector.setTab);

  const [isModal, setIsModal] = React.useState<boolean | string>(false);
  const [status, setStatus] = React.useState<"pending" | "success" | "error">("pending");
  const [name, setName] = React.useState("");

  const params = new URLSearchParams(search);
  const token = params.get("token");

  React.useEffect(() => {
    if (pathname !== "/activate-device") return;

    if (token) {
      setStatus("pending");
      setIsModal("Введіть зручну для вас назву контроллеру");
    } else {
      setStatus("error");
      setIsModal("Токен відстутній");
    }
  }, [pathname])

  const onModalClose = () => {
    navigate("/");
    setIsModal(false);
  }

  const onSendToken = async () => {
    try {
      const res = await apiClient.post(`/users/me/devices/activate`, { token });
      const id = res.data.accesspoint_id;

      await apiClient.patch(`/users/me/accesspoints/owned/${id}`, { label: name });

      setStatus("success");
      setIsModal("Токен успішно активовано");

      setTimeout(() => {
        navigate("/");
        setTabs("settings");
        setIsModal(false);
      }, 2000)
    } catch (err) {
      const error = err as unknown as AxiosError<{ detail: string }>;
      const msg = error.response?.data?.detail || "Помилка під час запиту";
      setStatus("error");
      setIsModal(msg);
      toast.error(msg);
    }
  }

  if (!isModal) return null;

  return <div className='fixed bottom-0 top-0 left-0 right-0 z-50 bg-black bg-opacity-50 overflow-auto shadow-lg'>
    <div className='min-h-[100vh] w-full py-10 px-3 flex flex-col justify-center items-center '>
      <div className='bg-white rounded-xl w-full max-w-sm p-6 relative'>
        <button
          onClick={onModalClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col gap-4 items-center text-center animate-fadeIn">
          <div className="rounded-full bg-green-100 p-3">
            {status === "pending" && (<TriangleAlert size={48} className='text-yellow-500' />)}
            {status === "success" && (<CheckCircle size={48} className="text-green-500" />)}
            {status === "error" && (<AlertCircle size={48} className="text-red-500" />)}
          </div>
          <h3 className="text-xl font-semibold">
            {isModal}
          </h3>
          {status === "pending" &&
            (<>
              <MyInput value={name} onChange={(e) => setName(e.target.value)} />
              <Button myColorScheme='filled' className='w-full' onClick={onSendToken}>АКТИВУВАТИ</Button>
            </>)}
        </div>
      </div>
    </div>
  </div>
}

export default ActivateDevice;