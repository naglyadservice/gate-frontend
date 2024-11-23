import React from "react";
import { Toaster } from "react-hot-toast";

import Layout from "./Layout";
import Header from "./Header";
import Add from "./Add";
import GateList from "./GateList";
import Drawer from "./Drawer";
import Error from "./Error";
import Spinner from "./Spinner";
import { useAuth } from "../state/auth";

function App() {
  const { user_id } = useAuth();
  const { isAuthLoading, isAuthError, getAuthMe, authGoogleRedirectUrl, getGoogleLoginUrl } = useAuth();

  React.useEffect(() => {
    getAuthMe();
    getGoogleLoginUrl();
  }, []);

  if (isAuthLoading) return (<Spinner />);

  if (!authGoogleRedirectUrl) return (<Spinner />);

  if (!user_id) window.location.assign(authGoogleRedirectUrl);

  if (isAuthError) return (<Error />);

  return (
    <Layout>
      <Header />
      <Add />
      <GateList />
      <Drawer />

      <Toaster position="bottom-right" />
    </Layout>
  )
}

export default App
