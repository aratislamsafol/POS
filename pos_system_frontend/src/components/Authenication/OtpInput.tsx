import { Input, Transition } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface OTPInputProps {
  length: number;
  onChanged?: (otp: string) => void;
}

const OtpInput = ({ length = 6, onChanged }: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const inputRef = useRef<(HTMLElement | null)[]>([]);
  // Converting the otp value into string when press a otp and call to Parent setOtp
  useEffect(() => {
    onChanged?.(otp.join(""));
  }, [otp, onChanged]);

  useEffect(()=>{
    inputRef.current[activeIndex]?.focus();
  }, [activeIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if(e.key === 'Backspace' && !otp[index] && index > 0) {
      setActiveIndex(index-1);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if(/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }

    // Move focus to next
    if (value && index < length - 1) {
      setActiveIndex(index + 1);
    }
  };

  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length }).map((_, index) => {
        const isFilled = otp[index] != "";

        return (
          <div key={index} className="relative w-14 h-14">
            <Transition
              show={!isFilled}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className={clsx(
                  "absolute inset-0 pointer-events-none animate-pulse transition-colors bg-gray-200 w-full h-full text-center"
                )}
              ></div>
            </Transition>

            <Input
              placeholder="-"
              maxLength={1}
              // ref={}
              className={clsx(
                " w-full h-full text-center text-lg rounded-lg focus:outline-none",
                isFilled
                  ? "border-green-500 bg-white"
                  : "border-transparent bg-transparent"
              )}
              type="text"
              inputMode="numeric"
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => {inputRef.current[index] = el}}
            />
          </div>
        );
      })}
    </div>
  );
};

export default OtpInput;
