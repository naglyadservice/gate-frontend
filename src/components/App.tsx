import React from "react";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";

import Layout from "./Layout";
import Header from "./Header";
import Add from "./Add";
import GateList from "./GateList";
import Error from "./Error";
import Spinner from "./Spinner";
import LogInWithGoole from "./LogInWithGoole";

import { useAuth } from "../state/auth";
import useInvokePWA from "./InvokePWA.hook";



function App() {
  const { user_id } = useAuth();
  const { isAuthLoading, isAuthError, getAuthMe, authGoogleRedirectUrl, getGoogleLoginUrl } = useAuth();
  const invokePWA = useInvokePWA();

  React.useEffect(() => {
    getAuthMe();
    getGoogleLoginUrl();

    const timer = setTimeout(() => invokePWA(), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isAuthLoading) return (<Spinner />);

  if (!authGoogleRedirectUrl) return (<Spinner />);

  if (!user_id) return (<LogInWithGoole />);

  if (isAuthError) return (<Error />);

  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Layout>
        <Header />
        <Add />
        <GateList />

        <Toaster position="bottom-right" />
      </Layout>
    </ErrorBoundary>
  )
}

export default App
