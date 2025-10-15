
import styles from '../assets/css/registration.module.css';
import HorizontalCard from '../components/Authenication/HorizontalCard';
import RegistrationForm from '../components/Authenication/RegistrationForm';
import SidebarCard from '../components/Authenication/SidebarCard';
const Registration = () => {
  return (
    <div className={`${styles.custom_font} bg-[url('./assets/image/bg_auth.png')] bg-cover bg-center h-screen`}>
      <div className="flex justify-center items-center w-full h-full">
        <div className="bg-white/92 w-29/30 md:w-5/7 rounded-3xl p-5  shadow-xl/20">
            <div className="grid grid-cols-1 md:grid-cols-7">
                {/* content side */}
                <div className="col-span-7 lg:col-span-5">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-wide">Registration</h2>
                    <p className="text-sm text-gray-800 mt-3">Step one of two</p>
                    <div className="flex justify-between my-2">
                        <div className="rounded-2xl bg-[#D5DBE2] shadow-2xl w-13 h-13 flex items-center justify-center">
                            <p className="text-xl font-semibold text-gray-800">1</p>
                        </div>
                        <div className='hidden sm:block'>
                            <HorizontalCard />
                        </div>
                        
                        
                    </div>
                    <div className='sm:hidden'>
                        <HorizontalCard />
                    </div>
                    <div className='my-4 mt-7 md:mr-3'>
                        <RegistrationForm/>
                    </div>

                    
                    
                </div>
                {/* image learn side */}
                <div className="col-span-0 hidden lg:block lg:col-span-2">
                    <SidebarCard/>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Registration
