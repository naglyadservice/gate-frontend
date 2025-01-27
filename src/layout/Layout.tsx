import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 sm:px-5 pb-10 min-h-full" >
      <div className="max-w-screen-sm mx-auto min-h-full">
        {children}
      </div>
    </div>
  )
}

export default Layout