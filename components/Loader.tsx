'use client';
import { Watch } from 'react-loader-spinner';

export default function Loader() {
    return (
        <Watch
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
