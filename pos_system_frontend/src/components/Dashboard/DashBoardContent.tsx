import clsx from "clsx";

interface MenuOffCanvasProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashBoardContent = ({ open, setOpen }:MenuOffCanvasProps) => {
  return (
    <div className={clsx('z-10')}>
        {/* mobile menuBar */}
        <div className="border-gray-300 flex flex-col gap-1 group cursor-pointer p-[15px] border-b" onClick={()=>setOpen(!open)}>
          <p className={clsx(
            'rounded-md h-[2px] bg-gray-400 group-hover:bg-gray-500', open ? 'w-5': 'w-4' 
          )}></p>
           <p className={clsx(
            'rounded-md h-[2px] bg-gray-400 group-hover:bg-gray-500', open?'w-4':' w-5'
          )}></p>
           <p className={clsx(
            'rounded-md h-[2px] bg-gray-400 group-hover:bg-gray-500', open?'w-5': 'w-4'
          )}></p>
        </div>
    </div>
  )
}

export default DashBoardContent
