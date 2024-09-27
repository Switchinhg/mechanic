import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import jobs from './jobs.module.css'
export default function ActiveJobsSlider({ tallerID  }) {
    const [jobs, setJobs] = useState([]);  // State to store the jobs
    const [error, setError] = useState(null);  // State to handle any errors

    // Fetch the jobs when the component mounts
    useEffect(() => {
        const getAllJobsOfUser = async (email) => {
            try {
                const request = await fetch(process.env.NEXT_PUBLIC_URL + "/api/jobs?tallerID =" + tallerID );
                const response = await request.json();
                setJobs(response);  // Store the jobs in state
                console.log(response)
            } catch (err) {
                console.error("Error fetching jobs:", err);
                setError("Failed to fetch jobs");
            }
        };

        if (tallerID) {
            getAllJobsOfUser(tallerID);
        }
    }, [tallerID]);  // Re-run the effect if userEmail changes

    // If there’s an error, show it
    if (error) {
        return <div>{error}</div>;
    }




    // Render the jobs or a loading state
    return (
        <div>
            {jobs.length === 0 ? (
                <p>Loading jobs...</p>  
            ) : (
                <Swiper
                    spaceBetween={0}
                    slidesPerView={3}
                    loop={'true'}
                    autoplay={{
                        delay: 2500
                    }}
                    modules={[Autoplay]}
                    // onSlideChange={() => console.log('slide change')}
                    // onSwiper={(swiper) => console.log(swiper)}
                    >
                        {jobs.map((job) => (
                            <SwiperSlide key={job.id} className={jobs.swiper} >
                                <div  className={jobs.slide}>
                                    <h3>{job.firstName} {job.lastName}</h3>
                                    <p>{job.description}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            )}
        </div>
    );
}
