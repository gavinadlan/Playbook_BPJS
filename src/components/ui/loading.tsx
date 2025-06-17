import React from "react";

const Loader = () => {
  return (
    <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-transparent animate-spin flex items-center justify-center border-t-[rgb(39,68,124)] rounded-full">
        <div className="w-16 h-16 border-4 border-transparent animate-spin-reverse flex items-center justify-center border-t-[rgb(63,143,80)] rounded-full" />
      </div>
    </div>
  );
};

export default Loader;
