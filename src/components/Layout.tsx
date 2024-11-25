import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 sm:px-5 pb-10 bg-[#eef0f5] h-full" >
      <div className="max-w-screen-md mx-auto h-full">
        {children}
      </div>
    </div>
  )
}

export default Layout