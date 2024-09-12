import React, { useEffect, useState, useCallback } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import postRequest from '../API (dangerous)/post-request';
import getRequest from '../API (dangerous)/get-request';

export default function MyRequests() {
    const [requests, setRequests] = useState([]);
    const { isLoaded, isSignedIn, userId } = useAuth();
    const { user } = useUser();
    const navigate = useNavigate();

    const fetchRequests = useCallback(async () => {
        if (user?.emailAddresses[0]?.emailAddress) {
            const response = await getRequest('/api/tutoring/docs', { email: user.emailAddresses[0].emailAddress });
            setRequests(response);
        }
    }, [user]);

    useEffect(() => {
        if (isSignedIn && isLoaded && user) {
            const pendingSubmission = localStorage.getItem('pendingTutorRequest');
            if (pendingSubmission) {
                handlePendingSubmission(JSON.parse(pendingSubmission));
            }
            fetchRequests();
        }
    }, [isSignedIn, isLoaded, user, fetchRequests]);

    const handlePendingSubmission = async (formData) => {
        if (userId) {
            try {
                await postRequest('/api/tutoring/add', {
                    ...formData,
                    userId,
                    status: true,
                    createdAt: new Date().toISOString()
                }, "Submitted your request");
                localStorage.removeItem('pendingTutorRequest');
                navigate('/my-request');
                await fetchRequests(); // Refetch data after submission
            } catch (error) {
                console.error('Error handling pending submission:', error);
            }
        }
    };

    const handleRepost = async (request) => {
        await handlePendingSubmission({ ...request });
        await fetchRequests(); // Refetch data after reposting
    };

    const handleClosePost = async (requestId) => {
        try {
            await postRequest('/api/tutoring/close', { requestId });
            await fetchRequests(); // Refetch data after closing post
        } catch (error) {
            console.error('Error closing post:', error);
        }
    };

    return (
        <div className='px-4 py-6 m-auto md:w-[900px]'>
            <div className='flex justify-end mb-5'>
                <Link to='/request-a-tutor' className="button-55 ms-auto" role="button">Post Your Study Requirement!</Link>
            </div>
            <h1 className='text-4xl text-gray-500'>All my requests here!</h1>
            {requests.map((request) => (
                <RequestItem 
                    key={request.id} 
                    request={request} 
                    onRepost={handleRepost} 
                    onClose={handleClosePost} 
                />
            ))}
        </div>
    );
}

function RequestItem({ request, onRepost, onClose }) {
    const { city, state, country } = request.complete_address;
    const { amount, option, currency_symbol } = request.price;

    return (
        <div className='mt-8 md:w-[800px] w-full p-0 md:p-6 text-gray-500'>
            <h1 className='text-2xl text-blue-500'>{request.title}</h1>
            <p className='mt-5'>{request.description}</p>
            <div className='flex items-center justify-between mt-3 text-black'>
                <div>{currency_symbol} {amount} {option}</div>
                <div className='flex items-center'>
                    <i className="mt-2 text-xl font-extrabold fi fi-ts-marker me-2"></i>
                    {`${city}, ${state}, ${country}`}
                </div>
            </div>
            <div className='flex items-center justify-end gap-x-5'>
                {request.status ? (
                    <button 
                        className='text-white bg-green-400 border-green-300 hover:text-black btn'
                        onClick={() => onClose(request.id)}
                    >
                        Close Post
                    </button>
                ) : (
                    <>
                        <h1 className='text-red-400'>Post Closed</h1>
                        <button 
                            onClick={() => onRepost(request)} 
                            className='text-blue-500 border-blue-500 btn'
                        >
                            Repost requirement!
                        </button>
                    </>
                )}
            </div>
            <hr className='mt-4' />
        </div>
    );
}