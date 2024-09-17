import React from 'react'

export default function SearchBtn() {
    return (
        <div className="flex flex-col justify-center px-10 mt-10 md:flex-row md:items-center">
            <input type="text" placeholder="Subject / Skills" className="w-full max-w-xs bg-white input input-bordered" />
            <span className="hidden text-3xl text-white md:block font-extralight">|</span>
            <input type="text" placeholder="Location" className="max-w-xs bg-white w-60 input input-bordered" />
            <button className="px-8 bg-white btn hover:bg-black hover:text-white">Search</button>
        </div>
    )
}
