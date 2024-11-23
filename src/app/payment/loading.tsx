import Spinner from '@/components/global/spinner';
import React from 'react'

const loading = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <Spinner loading={true} />
    </div>
  );
};

export default loading