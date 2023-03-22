import React from 'react';

const Skeleton = ()  => {
    return (  
<>
      <div className="flex w-full h-full min-h-fit flex-1 flex-col items-center  px-20">
        <div className="mt-12 w-full min-h-fit  h-full animate-pulse flex-row items-center justify-center space-x-1 rounded-xl border p-6 ">
          <div className="flex flex-col space-y-2">
            <div className="min-h-6 min-w-6   h-11/12 w-11/12 rounded-md bg-gray-300 "></div>
            <div className="min-h-6 min-w-6 h-10/12 w-10/12 rounded-md bg-gray-300 "></div>
            <div className="min-h-6 min-w-6 h-9/12 w-9/12 rounded-md bg-gray-300 "></div>
            <div className="min-h-6 min-w-6 h-9/12 w-9/12 rounded-md bg-gray-300 "></div>
          </div>
        </div>
      </div>
    </>
    );
  };

export default Skeleton;