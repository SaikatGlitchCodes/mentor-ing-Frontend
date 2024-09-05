import React from 'react';
import brand from '../assets/image/brand.png';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from '../customHook/useAuth';
import SharedModal from './SharedModal';


const auth = getAuth();
const Dropdown = ({ label, children, customWidth = "w-52", avatar }) => (
    <div className="dropdown dropdown-end">
        <div
            tabIndex={1}
            className={`px-1 text-md font-light border-2 border-[#e8e8e8] rounded-full cursor-pointer ${avatar ? 'btn btn-ghost btn-circle avatar' : 'px-3 '}`}>
            {avatar ? (
                <div className="w-full rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User avatar" />
                </div>
            ) : (
                label
            )}
        </div>
        <ul tabIndex={1} className={`menu menu-sm dropdown-content bg-white rounded-box z-[2] mt-3 p-4 gap-y-2 shadow ${customWidth}`}>
            {children}
        </ul>
    </div>
);

const SearchInput = () => (
    <label className="flex items-center h-8 gap-2 input input-bordered">
        <input type="text" className="grow" placeholder="Subject" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 opacity-70">
            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
        </svg>
    </label>
);

export default function Navbar() {
    let { user } = useAuth();
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("User logged out");
            })
            .catch((error) => {
                console.error("Error during sign out:", error);
            });
    };
     user = {email:'saikat'}
    return (
        <div className="px-3 border-b-2 navbar bg-base-100">
            <div className="flex-1">
                <Link to='/' className="text-xl btn btn-ghost">
                    <img src={brand} className='md:h-[65%] h-[60%] animate-pulses' alt="Brand" />
                </Link>
            </div>
            <div className="flex-none gap-2">
                <div className='hidden md:flex me-20 gap-x-5'>
                    <Dropdown label="Find Tutors" customWidth="w-72">
                        <li> <Link to='/request-a-tutor'>Request a Tutor-Free</Link> </li>
                        <li> <Link to='/online-tutors'> Online Tutor</Link></li>
                        <hr className='h-[0.8px] bg-black' />
                        <SearchInput />
                    </Dropdown>
                    <Dropdown label="Job Support">
                        <li><a className="justify-between">Post it <span className="bg-yellow-200 badge">New</span></a></li>
                    </Dropdown>
                    <Dropdown label="Become Tutor" customWidth="w-40">
                        <li>All Tutor Jobs</li>
                        <hr className='h-[0.8px] bg-black' />
                        <li>Online Jobs</li>
                        <li>Offline Jobs</li>
                    </Dropdown>
                </div>

                { user ?
                    <Dropdown label="" avatar customWidth='w-70'>
                        <li> <div className='flex items-center justify-start'><div className='block w-2 h-2 bg-green-400 rounded-full'></div>  {user?.email}</div> </li>
                        <li> <h1 className="justify-between" onClick={()=>document.getElementById('profile').showModal()}>Profile <span className="badge">New</span></h1></li>
                        <li> <h1>Settings</h1> </li>
                        <li> <h1>Wallet</h1></li>
                        <hr className='h-[0.8px] bg-black' />
                        <li className='bg-red-300/20' onClick={handleLogout}> <div className='flex justify-between'>Logout <i className="fi fi-ts-sign-out-alt"></i></div> </li>
                    </Dropdown> :
                    <button type="button"  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2">Login</button>
                }
            </div>
            <SharedModal modal_id={'profile'}>
                <h1>Profile here</h1>
            </SharedModal>
        </div>
    );
}
