import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div className='max-w-[1660px] mx-auto'>
      <Outlet/>
    </div>
  )
}

export default Root
