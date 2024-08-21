'use client';
import { Puff } from 'react-loader-spinner';

export default function Loader() {
  return (
    <Puff
      visible={true}
      height="80"
      width="80"
      radius="48"
      color="#262D3E"
      ariaLabel="watch-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
