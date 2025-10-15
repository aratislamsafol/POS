import { Button } from '@headlessui/react';
import profileImg from '../../assets/image/person1.jpg';
import clsx from 'clsx';
const HorizontalCard = () => {
  return (
    <div className="rounded-3xl bg-[#e8e6e6] p-2 pr-3 md:mx-3 w-full md:w-90 shadow-2xl">
        <div className="flex gap-2">
            {/* image */}
            <div className=''>
                <img src={profileImg} className='w-10 h-10 border border-gray-400 rounded-full bg-amber-500' alt="profile Image" />
            </div>
            {/* content */}
            <div className=''>
                <p className='text-gray-800 font-medium text-base'>Arat Islam</p>
                <p className='text-gray-700 text-xs'>24 min ago</p>
                <p className='text-gray-800 text-xs pt-[2px] hidden xl:block'>It will be remove after 24 hours</p>
            </div>
            <div className='ml-auto'>
                <a href="#" className={clsx('text-gray-800 font-medium text-xs transition ease-in-out  active:text-red-900 hover:text-green-700')}>View</a>
                <Button className={clsx('transition ease-in-out ml-2 text-gray-800 font-medium text-xs data-active:text-red-900 data-hover:text-red-700 cursor-pointer')}>Remove</Button>
            </div>
        </div>
    </div>
  )
}

export default HorizontalCard
