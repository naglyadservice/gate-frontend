import React from 'react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;
  prompt(): Promise<void>;
}

function useInvokePWA() {
  const [deferredPrompt, setDeferredPrompt] = React.useState<BeforeInstallPromptEvent | null>(null);

  React.useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      e.preventDefault();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const triggerInstall = () => {
    console.log("Propmting for PWA: ", deferredPrompt)

    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    console.log("Propmting for PWA: after")

    deferredPrompt.userChoice.then((choiceResult: any) => {

      console.log("User result: ", choiceResult);

      if (choiceResult.outcome === 'accepted') {
        console.log('App installed');
      } else {
        console.log('App installation dismissed');
      }

      setDeferredPrompt(null);
    });
  };



  return { deferredPrompt, triggerInstall };
}

export default useInvokePWA