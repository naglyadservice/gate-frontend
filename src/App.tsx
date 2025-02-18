import React from "react";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router";
import { ConfigProvider } from "antd";

import Layout from "./layout/Layout";
import Header from "./layout/Header";
import Error from "./components/Error";
import Spinner from "./components/Spinner";
import LogInWithGoole from "./components/LogInWithGoole";
import ActivateDevice from "./accesspoints/ActivateDevice";

import Account from "./account/Account";
import AccessPoints from "./accesspoints/AccessPoints";

import { useAuth } from "./state/auth";
import { useLocation } from "./state/locations";
import { useAccountTab } from "./state/account.tabs";
// import useInvokePWA from "./components/InvokePWA.hook";



function App() {
  const { id } = useAuth();
  const { isAuthLoading, isAuthError, getAuthMe } = useAuth();
  const { getAllLocations } = useLocation();
  // const { triggerInstall, deferredPrompt } = useInvokePWA();

  const isAccount = useAccountTab(selector => selector.tab);

  React.useEffect(() => {
    (async () => {
      await getAuthMe();
      await getAllLocations();
    })();
  }, []);

  // React.useEffect(() => {
  //   const timer = setTimeout(() => triggerInstall(), 3000);
  //   return () => clearTimeout(timer);
  // }, [deferredPrompt])

  if (isAuthLoading) return (<Spinner />);

  if (!id) return (<LogInWithGoole />);

  if (isAuthError) return (<Error />);

  return (
    <ErrorBoundary FallbackComponent={Error}>
      <BrowserRouter>
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
              <AccessPoints />
            </>}

            <Toaster position="bottom-right" />
            <ActivateDevice />
          </Layout>
        </ConfigProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
