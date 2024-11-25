import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import apiClient from '../state/client';

interface AccessCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalState = 'input' | 'loading' | 'success' | 'error';

interface ErrorState {
  title: string;
  message: string;
}

const AccessCodeModal: React.FC<AccessCodeModalProps> = ({ isOpen, onClose }) => {
  const [accessCode, setAccessCode] = useState('');
  const [modalState, setModalState] = useState<ModalState>('input');
  const [error, setError] = useState<ErrorState | null>(null);

  const getErrorDetails = (status: number, message?: string): ErrorState => {
    switch (status) {
      case 404:
        return {
          title: 'Локацію не знайдено',
          message: 'Перевірте правильність введеного коду доступу та спробуйте ще раз'
        };
      case 409:
        if (message?.includes('Access already granted')) {
          return {
            title: 'Доступ вже надано',
            message: 'Ви вже маєте доступ до цієї локації'
          };
        }
        if (message?.includes('Request already exists')) {
          return {
            title: 'Запит вже існує',
            message: 'Ви вже надіслали запит на доступ до цієї локації, очікуйте підтвердження від адміністратора'
          };
        }
        return {
          title: 'Помилка конфлікту',
          message: 'Виникла помилка при обробці вашого запиту'
        };
      default:
        return {
          title: 'Щось пішло не так',
          message: 'Спробуйте повторити запит пізніше'
        };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim()) return;

    setModalState('loading');
    try {
      await apiClient.post(`/locations/create-request`, null, {
        params: { access_code: accessCode }
      });
      setModalState('success');
    } catch (error: any) {
      const status = error.response?.status;
      const message = error.response?.data?.detail;
      setError(getErrorDetails(status, message));
      setModalState('error');
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setModalState('input');
      setError(null);
      setAccessCode('');
    }, 200);
  };

  const handleTryAgain = () => {
    setModalState('input');
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="min-h-[200px] flex flex-col justify-center">
          {modalState === 'input' && (
            <form onSubmit={handleSubmit} className="animate-fadeIn">
              <h2 className="text-xl font-semibold mb-6 pr-8">
                Введіть код доступу до локації
              </h2>

              <div className="mb-6">
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#5977ff] focus:outline-none transition-colors"
                  placeholder="Код доступу"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#58a0ff] to-[#5966ff] hover:bg-gradient-to-l text-white font-semibold py-3 px-4 rounded-lg transition-all"
              >
                Підтвердити
              </button>
            </form>
          )}

          {modalState === 'loading' && (
            <div className="flex flex-col items-center justify-center text-center py-8 animate-fadeIn">
              <Loader size={48} className="text-[#5977ff] animate-spin mb-4" />
              <p className="text-lg font-medium text-gray-600">
                Обробка запиту...
              </p>
            </div>
          )}

          {modalState === 'success' && (
            <div className="flex flex-col items-center text-center py-8 animate-fadeIn">
              <div className="mb-4 rounded-full bg-green-100 p-3">
                <CheckCircle size={48} className="text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Запит успішно надіслано
              </h3>
              <p className="text-gray-600">
                Очікуйте підтвердження від адміністратора
              </p>
            </div>
          )}

          {modalState === 'error' && error && (
            <div className="flex flex-col items-center text-center py-8 animate-fadeIn">
              <div className="mb-4 rounded-full bg-red-100 p-3">
                <AlertCircle size={48} className="text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                {error.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {error.message}
              </p>
              <button
                onClick={handleTryAgain}
                className="px-6 py-2 text-[#5977ff] border-2 border-[#5977ff] rounded-lg hover:bg-[#5977ff] hover:text-white transition-colors font-semibold"
              >
                Спробувати ще раз
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessCodeModal;