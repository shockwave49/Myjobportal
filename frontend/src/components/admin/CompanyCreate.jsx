/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();  // For navigation
    const [companyName, setCompanyName] = useState("");  // Default to an empty string
    const dispatch = useDispatch();  // Redux dispatcher

    const registerNewCompany = async () => {
        if (!companyName) {
            toast.error('Company name is required!');  // Show error if company name is missing
            return;
        }

        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log(res);

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));  // Dispatch Redux action
                toast.success(res.data.message);  // Show success message
                const companyId = res?.data?.company?._id;  // Extract company ID
                navigate(`/admin/companies/${companyId}`);  // Navigate to company details
            } else {
                toast.error('Company registration failed.');  // Handle unexpected failure
            }
        } catch (error) {
            console.error(error);  // Log error
            toast.error('Something went wrong, please try again.');  // Show error message
        }
    }

    return (
        <div>
            <Navbar />  {/* Include Navbar */}
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl '>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name?</p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="JobHunt, Microsoft"
                    value={companyName}  // Controlled input
                    onChange={(e) => setCompanyName(e.target.value)}  // Update state
                />

                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>  {/* Navigate back */}
                    <Button className="bg-black text-white" onClick={registerNewCompany}>Continue</Button>  {/* Trigger registration */}
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
