import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 sm:px-5 pb-10 min-h-[100vh] max-w-screen-sm mx-auto " >
      {children}
    </div>
  )
}

export default Layout