import React, { useState } from 'react';
import './Applyjob.css';

import { Link, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { IoIosArrowBack } from "react-icons/io";

function Applyjob() {
    const { jobId } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [qualifications, setQualifications] = useState('');
    const [skills, setSkills] = useState('');
    const [experience, setExperience] = useState('');
    const navigate = useNavigate();


    const handleApplyJob = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `https://dbms-jgsk.onrender.com/api/seeker/apply-job/${jobId}`, // Endpoint for applying to a job
                {
                    name,
                    email,
                    phone,
                    location,
                    qualifications,
                    skills: skills.split(','), // Convert skills to an array
                    experience,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Handle success - maybe redirect or show a success message
            console.log('Job Application Successful:', response.data);
            navigate("/seeker"); // Redirect after applying
        } catch (error) {
            // Handle error - show an error message or do something else
            console.error('Error applying to job:', error);
        }
    };

    return (
        <>
            <div className="job__main_container">
                <div className="post__job">
                    <form onSubmit={handleApplyJob}>
                        <div>
                            <h1>APPLY JOB</h1>
                            <Link to="/seeker" className='back__arrow'><IoIosArrowBack /></Link>
                        </div>
                        <div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="EMAIL"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="PHONE"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="LOCATION"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>

                        </div>
                        <div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="QUALIFICATION"
                                    value={qualifications}
                                    onChange={(e) => setQualifications(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="SKILLS ( ',' -separated)"
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="experience">
                            <div>
                                <input
                                    type="text"
                                    placeholder="EXPERIENCE"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type="submit">APPLY JOB</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Applyjob;
