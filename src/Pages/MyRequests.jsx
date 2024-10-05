import React, { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { useFetchData } from '../hook/useFetch';

export default function MyRequests() {
    const { isLoaded, isSignedIn, userId } = useAuth();
    const { user } = useUser();
    const email = user?.emailAddresses?.[0]?.emailAddress || '';
    const { data, loading, error } = useFetchData(`/requests/${email}`);
    console.log('[Data]', data)
    useEffect(() => {
        if (isSignedIn && isLoaded && user) {
            const pendingSubmission = localStorage.getItem('pendingTutorRequest');
            if (pendingSubmission) {
                // submitRequest(JSON.parse(pendingSubmission));
                localStorage.removeItem('pendingTutorRequest');
            }
        }
    }, [isSignedIn, isLoaded, user]);


    const handleRepost = async (request) => {
        delete request.id;
        // await submitRequest(request);
    };

    const handleClosePost = async (requestId) => {
        try {
            // await postRequest('/api/tutoring/close', { requestId });
        } catch (error) {
            console.error('Error closing post:', error);
        }
    };

    return (

        <div className='px-4 py-6 m-auto md:w-[80%]'>
            <div className='flex justify-end mb-5'>
                <Link to='/request-a-tutor' className="button-55 ms-auto" role="button">Post Your Study Requirement!</Link>
            </div>
            <h1 className='mb-5 text-4xl text-gray-500'>All my requests here!</h1>
            { loading ? <h1>Loading...</h1> : data?.error || error ? <h1>{data.error}</h1> : data?.map((request) => {
                return <RequestItem
                    key={request.id}
                    request={request}
                    onRepost={handleRepost}
                    onClose={handleClosePost}
                />
            })}
        </div>
    );
}

function RequestItem({ request, onRepost, onClose }) {
    const { city, state, country } = request.address;
    const { price_amount, price_currency, price_currency_symbol, price_option } = request;
    return (
        <div className='p-5 rounded-lg shadow-2xl md:w-[70%] bg-white border-t-4 border-blue-400'>
            <div className='flex items-center mb-3 gap-x-2'>
                <h1 className='text-2xl font-normal text-blue-400'>React js class Offline</h1>
                <div className="tooltip ms-auto" data-tip={`${new Date(request.updatedAt).toDateString()}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <button className='px-4 py-1 text-red-400 border border-red-500 rounded-md bg-red-300/25'>High</button>
            </div>
            <p className='text-gray-500 req-description'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui, unde, perferendis quidem iste sapiente soluta distinctio beatae placeat natus ratione tenetur id? Officia quod provident alias quidem sunt, dolor laudantium?</p>
            <hr className='my-4' />
            <div className="flex justify-between">

                <span className='flex items-center text-sm'> <i className='text-2xl me-1'>{`${price_currency_symbol}`}</i> {`${price_amount} ${price_currency} ${price_option}`} </span>
                <span className='flex items-center text-sm '><i className="text-xl fi fi-tr-location-arrow me-2"></i> {`${city},${state},${country}`} </span>

            </div>
            <div className='flex mt-5'>
                <button className='px-2 text-sm border border-black rounded-md'> View message </button>
                <button className='flex items-center justify-center px-5 py-1 text-red-600 rounded-md ms-auto'> Post closed X</button>
                <button className='flex items-center justify-center px-5 py-1 text-green-600 border border-green-400 rounded-md'> <i className="mt-1 text-xl fi fi-tr-arrows-retweet me-2"></i> Repost </button>
            </div>
        </div>
    );
}