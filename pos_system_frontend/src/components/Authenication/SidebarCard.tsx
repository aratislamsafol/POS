import { motion } from "framer-motion";
import { UserIcon, Loader2Icon, CheckCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

const SidebarCard = () => {
  const [stage, setStage] = useState(0); 

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 3); 
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="h-full flex flex-col justify-center items-center text-center bg-gradient-to-br from-amber-50 via-white to-amber-100 rounded-2xl p-8 shadow-inner overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800">Creating Account...</h2>
        <p className="text-sm text-gray-600 mt-2">
          Please wait while we process your registration
        </p>
      </motion.div>

      {/* Animated screen box */}
      <motion.div
        className="relative w-56 h-40 bg-white rounded-xl mt-8 border border-stone-200 shadow-md flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Stage 0: Typing */}
        {stage === 0 && (
          <motion.div
            key="typing"
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <UserIcon size={36} className="text-amber-500" />
            <motion.div
              className="w-28 h-2 bg-stone-200 mt-3 rounded"
              animate={{ width: ["20%", "60%", "80%", "40%", "100%"] }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
            />
            <p className="text-xs text-stone-500 mt-2 animate-pulse">
              Typing info...
            </p>
          </motion.div>
        )}

        {/* Stage 1: Verifying */}
        {stage === 1 && (
          <motion.div
            key="verifying"
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2Icon
              size={36}
              className="text-amber-500 animate-spin mb-3"
            />
            <p className="text-xs text-stone-500 animate-pulse">
              Verifying details...
            </p>
          </motion.div>
        )}

        {/* Stage 2: Success */}
        {stage === 2 && (
          <motion.div
            key="success"
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CheckCircleIcon size={40} className="text-green-500 mb-2" />
            <motion.p
              className="text-sm font-semibold text-green-600"
              initial={{ scale: 0.8 }}
              animate={{ scale: [1.1, 1, 1.05, 1] }}
              transition={{ duration: 0.6 }}
            >
              Registration Successful!
            </motion.p>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom subtle dots */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === stage ? "bg-amber-500" : "bg-stone-300"
            } transition-all`}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarCard;
