import React from "react";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";

import Layout from "./layout/Layout";
import Header from "./layout/Header";
import Add from "./gate/Add";
import GateList from "./gate/GateList";
import Error from "./components/Error";
import Spinner from "./components/Spinner";
import LogInWithGoole from "./components/LogInWithGoole";
import Account from "./account/Account";

import { useAuth } from "./state/auth";
import useInvokePWA from "./components/InvokePWA.hook";
import { useAccountTab } from "./state/account.tabs";
import { ConfigProvider } from "antd";



function App() {
  const { user_id } = useAuth();
  const { isAuthLoading, isAuthError, getAuthMe, authGoogleRedirectUrl, getGoogleLoginUrl } = useAuth();
  const { triggerInstall, deferredPrompt } = useInvokePWA();

  const isAccount = useAccountTab(selector => selector.tab);

  React.useEffect(() => {
    getAuthMe();
    getGoogleLoginUrl();
  }, []);

  // React.useEffect(() => {
  //   const timer = setTimeout(() => triggerInstall(), 3000);
  //   return () => clearTimeout(timer);
  // }, [deferredPrompt])

  // if (isAuthLoading) return (<Spinner />);

  // if (!authGoogleRedirectUrl) return (<Spinner />);

  // if (!user_id) return (<LogInWithGoole />);

  // if (isAuthError) return (<Error />);

  console.log('isAccount: ', isAccount);

  return (
    <ErrorBoundary FallbackComponent={Error}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#596BFF"
          },
        }}
      >
        <Layout>
          <Header />

          {isAccount && <Account />}

          {!isAccount && <>
            <Add />
            <GateList />
          </>}

          <Toaster position="bottom-right" />
        </Layout>
      </ConfigProvider>
    </ErrorBoundary>
  )
}

export default App
