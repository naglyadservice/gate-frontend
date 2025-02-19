import React from 'react'

function PWAprompt() {
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Установлено');
        } else {
          console.log('Установка отклонена');
        }
        setDeferredPrompt(null);
        setIsVisible(false);
      });
    }
  };

  return (
    <div>
      {isVisible && (
        <button onClick={handleInstallClick}>
          Добавить на главный экран
        </button>
      )}
    </div>
  );
}

export default PWAprompt