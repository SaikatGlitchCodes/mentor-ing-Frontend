import React, { useEffect, useState } from 'react';
import { useFetchData, usePost } from '../../hook/useFetch';
import CreatableSelect from 'react-select/creatable';
import PhoneInput from 'react-phone-number-input';
import ISO6391 from 'iso-639-1';
import Select from 'react-select';
import coins from '../../assets/animation/won.gif'

export default function ProfileModal({ modal_id, closeBtn = false }) {
    const { data: subjects, loading, error } = useFetchData('/subjects');
    const { post, loading: postLoading } = usePost();

    // Local state to store subject options
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [selectedSubject, selectedSubjectOptions] = useState([]);

    // Sync with fetched subjects once loaded
    useEffect(() => {
        if (subjects) {
            setSubjectOptions(subjects.map(subject => ({ value: subject.name, label: subject.name, id: subject.id })));
        }
    }, [subjects]);

    const handleCreateSubject = async (newSubject) => {
        try {
            const payload = {
                subjects: [{ name: newSubject }]
            };
            const new_subject = await post('/subjects', payload);

            // Update local state with the new subject
            const newOption = { value: newSubject, label: newSubject, id: new_subject.subjects[0].id };
            setSubjectOptions(prevOptions => [...prevOptions, newOption]);
            selectedSubjectOptions([...(selectedSubject || []), newOption]);
        } catch (error) {
            console.error('Failed to create subject:', error);
        }
    };

    const handleChange = async (selectedOptions) => {
        selectedSubjectOptions(selectedOptions);
    };
    
    const hobbies = "Football,Swimming,Teaching,Coding"
    
    return (
        <dialog id={modal_id} className="z-30 modal">
            <div className="w-[98%] max-w-[90%] bg-white h-full modal-box">
                <div className='flex items-center justify-between '>
                    <div>
                        <h1 className='text-2xl'>Profile</h1>
                        <p className='text-red-500'>Please complete profile</p>
                    </div>
                    <select className="text-lg border-red-500 select select-error">
                        <option disabled selected>Role</option>
                        <option>Student</option>
                        <option>Tutor / Guide</option>
                    </select>
                </div>
                <div className='grid w-full grid-cols-1 gap-2 mt-6 md:grid-cols-3'>
                    <div className='flex flex-col p-5 border-t-4 border-blue-400 rounded-lg shadow-xl gap-y-4'>
                        <div className='items-center mb-2 md:flex gap-x-7'>
                            <div className="avatar">
                                <div className="relative w-24 rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                                <i className="absolute right-0 flex items-center justify-center w-6 h-6 bg-white rounded-full bottom-1 fi fi-rr-upload"></i>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="w-full max-w-xs text-xl input input-md border-gray-400/20"
                                value="SAIKAT SAMANTA" />
                        </div>
                        <div>
                            <p className='text-sm text-gray-400'> <i className="text-black fi fi-rr-briefcase me-1"></i>Front End Developer</p>
                            <p className='text-sm text-gray-400'> <i className="text-black me-1 fi fi-rr-marker"></i>Koramangala, Bangalore, India</p>
                        </div>
                        <label className="flex items-center gap-2">
                            Email
                            <input type="text" className="border-[1px] px-2 grow py-1 rounded" placeholder="Enter your Name" value="saikatsamanta88840@gmail.com" />
                        </label>
                        <label className="flex items-center gap-2">
                            Skills
                            <CreatableSelect
                                isMulti
                                isClearable
                                className='w-full'
                                placeholder='Search subjects...'
                                allowCreateWhileLoading
                                options={subjectOptions}
                                noOptionsMessage={() => error ? 'Error loading subjects' : 'No Categories Found'}
                                isLoading={loading || postLoading}
                                onChange={handleChange}
                                onCreateOption={handleCreateSubject}
                                value={selectedSubject}
                            />
                        </label>
                        <label className="flex gap-2 ">
                            <PhoneInput
                                name="phone_number"
                                value={"+918884058512"}
                                defaultCountry={'US'}
                                onChange={() => { }}
                                className='block w-full md:w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 px-3 outline-none'
                            />
                        </label>
                        <label className="flex items-center gap-2">
                            Speaks
                            <Select
                                isMulti
                                name="subject"
                                options={ISO6391.getAllCodes().map((code) => ({
                                    value: code,
                                    label: ISO6391.getName(code),
                                }))}
                                className="w-full basic-multi-select"
                                classNamePrefix="select"
                                onChange={() => { }}
                            />
                        </label>
                        <label className="flex items-center gap-2 mt-4">
                            <img src={coins} className='w-12 h-12' />
                            <h1>1200 coins</h1>
                            <button className='px-2 py-1 border-[1px] border-gray-300 rounded ms-auto text-gray-500'> Add coins + </button>
                        </label>
                        <label className="flex items-center gap-2">
                            Hobbies
                            <CreatableSelect
                                isMulti
                                name="subject"
                                options={hobbies.split(',').map((v)=>({label:v, value:v}))}
                                className="w-full basic-multi-select"
                                // value={hobbies.split(',').map((v)=>({label:v, value:v}))}
                                classNamePrefix="select"
                                onChange={() => { }}
                            />
                        </label>       
                    </div>
                    <div className='flex flex-col p-5 border-t-4 border-blue-400 rounded-lg shadow-lg md:col-end-4 md:col-start-2 gap-y-4'>
                        <div className='flex items-center justify-between'>
                            <h1 className='text-xl'>General information</h1>
                            <button className='px-6 py-1 bg-green-300 rounded-md btn'> Message </button>
                        </div>
                        <div className="rating">
                            <input type="radio" name="rating-2" className="bg-blue-400 mask mask-star-2" />
                            <input
                                type="radio"
                                name="rating-2"
                                className="bg-blue-400 mask mask-star-2"
                                defaultChecked />
                            <input type="radio" name="rating-2" className="bg-blue-400 mask mask-star-2" />
                            <input type="radio" name="rating-2" className="bg-blue-400 mask mask-star-2" />
                            <input type="radio" name="rating-2" className="bg-blue-400 mask mask-star-2" />
                        </div>
                        <label className="form-control">
                            <div className="label">
                                <span className="text-lg label-text">About me <span className='text-blue-500'>(student will read this)</span></span>
                            </div>
                            <textarea value="Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam. Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse." className="text-md h-60 textarea textarea-bordered" placeholder="Bio"></textarea>
                        </label>
                        <div className='flex justify-between'>
                            <label className="w-full max-w-xs form-control">
                                <div className="label">
                                    <span className="label-text">Year's of experience</span>
                                </div>
                                <input type="date" placeholder="Type here" className="w-full max-w-xs input input-bordered" />
                            </label>
                            <label className="w-full max-w-xs form-control">
                                <div className="label">
                                    <span className="label-text">Joining date</span>
                                </div>
                                <input type="date" placeholder="Type here" className="w-full max-w-xs input input-bordered" />
                            </label>
                        </div>

                    </div>
                </div>
                {closeBtn && <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>}
            </div>
        </dialog>
    )
}