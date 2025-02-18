import React from "react";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Routes, Route } from "react-router";

import Layout from "./layout/Layout";
import Header from "./layout/Header";
import Error from "./components/Error";
import Spinner from "./components/Spinner";
import LogInWithGoole from "./components/LogInWithGoole";
import Account from "./account/Account";
import AccessPoints from "./accesspoints/AccessPoints";

import { useAuth } from "./state/auth";
import useInvokePWA from "./components/InvokePWA.hook";
import { useAccountTab } from "./state/account.tabs";
import { ConfigProvider } from "antd";
import { useLocation } from "./state/locations";




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
          </Layout>
        </ConfigProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
