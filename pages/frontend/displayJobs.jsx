import NavBar from '@/components/NavBar'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { BsDot } from 'react-icons/bs'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { get_job } from '@/Services/PostingJob'


export default function DisplayJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const data = await get_job();
            if (data?.success) {
                setJobs(data.data);
                console.log(data)
            }
        })()
    }, [])

    useEffect(() => {
        if (jobs?.length > 0) {
            setLoading(false)
        }
    }, [jobs])

    return (
        <>
            {
                loading ? (
                    <div className='w-full h-screen flex items-center justify-center'>
                        <div className='w-32 h-32 border-4 border-indigo-600 rounded-full animate-bounce flex items-center justify-center text-xl px-2 py-2 bg-indigo-600 text-white'>Loading...</div>
                    </div>
                ) :
                    (
                        <>
                            <NavBar />
                            <div className='w-full  py-20 flex items-center md:px-8 px-2  justify-center flex-col'>
                                <h1 className='px-4 mx-2 py-2 uppercase tracking-wider border-b-2 border-b-indigo-600 text-3xl font-semibold'>Available Jobs</h1>
                                <div className='w-full h-full py-4 flex  overflow-y-auto  items-center justify-center flex-wrap'>
                                    {/* map */}
                                    {
                                        jobs?.map((job) => {
                                            return (
                                                <div className='w-full cursor-pointer hover:translate-y-4 transition-all duration-1000  md:w-5/12 m-4 border border-indigo-600 rounded px-4 md:flex md:flex-wrap'>
                                                    <div className='mb-4 flex  items-center justify-center py-2 '>
                                                        <Image width={70} height={70} className="flex rounded-full " src={"https://xsgames.co/randomusers/avatar.php?g=male"} alt="no image" />
                                                        <div className='flex flex-col mx-2 px-2'>
                                                            <h1 className='text-xl md:text-2xl font-semibold'>{job?.user.name}</h1>
                                                            <p className='text-xs sm:text-sm md:text-base text-gray-800'>{job?.company}</p>
                                                        </div>
                                                    </div>
                                                    <div className='mb-4 flex   items-start justify-center py-2 flex-col'>
                                                        <div className='flex  px-2 py-2 items-center justify-center '>
                                                            <BsDot className='text-4xl font-extrabold text-indigo-600' />
                                                            <h1 className='text-lg text-gray-900'>Salary :</h1>
                                                            <p className='text-base  font-semibold'>{job?.salary}$ / month</p>
                                                        </div>
                                                        <div className='flex px-2 py-2 items-center  justify-center'>
                                                            <BsDot className='text-4xl font-extrabold text-indigo-600' />
                                                            <h1 className='text-lg text-gray-900'>Deadline :</h1>
                                                            <p className='text-base  font-semibold'>{new Date(`${job?.job_deadline}`).toLocaleDateString('en-GB')}</p>
                                                        </div>
                                                    </div>
                                                    <div className='mb-4 flex flex-col md:flex-wrap md:flex-row w-full justify-between  items-center '>

                                                        <div className='mb-4 flex  items-start justify-center py-2 flex-col'>
                                                            <div className='flex px-6 rounded-2xl py-1 items-center justify-center bg-indigo-200 text-indigo-900  '>
                                                                <p>Job Title </p>
                                                            </div>
                                                        </div>
                                                        <button className='my-2 py-2 px-4  border border-indigo-600 uppercase  rounded flex items-center justify-center transition-all duration-700 hover:bg-indigo-600 hover:text-white text-indigo-600 font-semibold'>Apply Now <AiOutlineArrowRight className='mx-2 text-xl' /></button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                    {/* map */}
                                </div>
                            </div>
                        </>
                    )


            }

        </>
    )
}
