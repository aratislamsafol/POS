import { Button, Input } from "@headlessui/react";

const RegistrationForm = () => {
  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {[
        "First Name",
        "Last Name",
        "Email",
        "Password",
        "Mobile",
        "Confirm Password",
      ].map((placeholder, index) => (
        <Input
          key={index}
          placeholder={placeholder}
          className="rounded-4xl p-3 bg-[#F2F2F2] shadow-md border border-gray-200 
                     focus:outline-none focus:ring-1 data-focus:bg-stone-50 focus:ring-stone-300 focus:border-transparent 
                     transition duration-100"
        />
      ))}
      <div className="">

      </div>
      <div className="flex gap-2 mt-6 justify-end">
  <Button
    className="text-sm px-4 py-2 rounded-full w-fit font-medium text-white
               bg-stone-400 shadow-md border border-transparent
               hover:bg-green-600 hover:shadow-lg hover:-translate-y-0.5
               transition-all duration-300 ease-in-out cursor-pointer">
    Submit
  </Button>

  <Button
    className="text-sm px-4 py-2 rounded-full w-fit font-medium text-white
               bg-stone-400 shadow-md border border-transparent
               hover:bg-red-500 hover:shadow-lg hover:-translate-y-0.5
               transition-all duration-300 ease-in-out cursor-pointer">
    Cancel
  </Button>
</div>

      
    </form>
  );
};

export default RegistrationForm;
