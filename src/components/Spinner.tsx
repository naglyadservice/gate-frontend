function PageSpinner() {
  return (
    <div className='flex flex-col justify-center items-center min-h-[100vh] w-full'>
      <div className='animate-spin w-12 h-12 rounded-full border-8 border-[#5977ff58] border-t-[#5977FF]'></div>
    </div>
  )
}

function SmallSpinner() {
  return (
    <div className='flex flex-col justify-center items-center min-h-20 w-full'>
      <div className='animate-spin w-6 h-6 rounded-full border-4 border-[#5977ff58] border-t-[#5977FF]'></div>
    </div>
  )
}

export { PageSpinner, SmallSpinner }