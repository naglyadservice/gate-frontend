import googleLogo from "../assets/google.svg"
import Layout from "../layout/Layout"

import apiClient from "../utils/client";

function LogInWithGoole() {
  const onButtonClick = async () => {
    apiClient.get(`/auth/google/login`).then(res => window.location.assign(res.data.auth_url))
  }

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-full w-full gap-3">
        <p>Ви не авторизовані</p>
        <button
          className="inline-flex items-center justify-center gap-3 px-8 py-2 rounded-md border border-black hover:opacity-70"
          onClick={onButtonClick}
        >
          <img src={googleLogo} alt="" width={20} />
          <span>Зайти через Google</span>
        </button>
      </div>
    </Layout>
  )
}

export default LogInWithGoole