import React from 'react';
import brand from '../../assets/image/brand.png';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useUser } from '@clerk/clerk-react';
import CustomUserButton from '../Shared/CustomUserBtn';

const Dropdown = ({ label, children, customWidth = "w-52", avatar }) => (
    <div className="z-50 dropdown dropdown-end">
        <div
            tabIndex={1}
            className={`text-sm font-light cursor-pointer ${avatar ? 'btn btn-ghost btn-circle avatar' : 'px-3 '}`}>
            {avatar ? (
                <div className="w-full rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User avatar" />
                </div>
            ) : (
                <button className="button-38" role="button">{label}</button>
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
    const { user } = useUser();

    return (
        <div className="px-8 border-b-2 navbar bg-base-100">
            <div className="flex-1">
                <Link to='/' className="text-xl btn btn-ghost">
                    <img src={brand} className='md:h-[65%] h-[60%] animate-pulses' alt="Brand" />
                    <span className="hidden mt-auto text-sm md:inline-block font-extralight">{user?.publicMetadata?.role}</span>
                </Link>
            </div>
            <div className="flex-none gap-2">
                <div className='items-center hidden md:flex me-20 gap-x-5'>
                <Link to='/my-request' className="button-38" role="button">My Posts</Link>
                    <Dropdown label="Find Tutors >" customWidth="w-72">
                        <li> <Link to='/request-a-tutor'>Request a Tutor-Free</Link> </li>
                        <li> <Link to='/online-tutors'> Online Tutor</Link></li>
                        <hr className='h-[0.8px] bg-black' />
                        <SearchInput />
                    </Dropdown>
                    <Dropdown label="Job Support >">
                        <li><Link className="justify-between">Post it <span className="bg-yellow-200 badge">New</span></Link></li>
                    </Dropdown>
                    <Dropdown label="Become Tutor" customWidth="w-40">
                        <li><Link to='/all-jobs'>All Tutor Jobs</Link> </li>
                        <hr className='h-[0.8px] bg-black' />
                        <li>Online Jobs</li>
                        <li>Offline Jobs</li>
                    </Dropdown>
                    <Link to='/request-a-tutor' className="button-55" role="button">Post Requirement</Link>
                </div>

                <SignedIn>
                    <CustomUserButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
            </div>
        </div>
    );
}
