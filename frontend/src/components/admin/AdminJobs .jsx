/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchJobByText } from '@/redux/jobSlice'; // Updated import

import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import AdminJobsTable from './AdminJobsTable ';

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input)); // Use the correct job-related action
    }, [input, dispatch]);

    return (
        <div>
            <Navbar />
            <div className=' max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5 '>
                    <Input
                        className="w-fit"
                        placeholder="Filter by Job Name"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/jobs/create")} className="bg-black text-white">New Job</Button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    );
};

export default AdminJobs;
