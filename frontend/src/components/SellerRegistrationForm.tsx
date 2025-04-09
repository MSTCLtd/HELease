import { Button, HR, Label, Modal, TextInput } from 'flowbite-react'
import Link from 'next/link'
import { HiAdjustments, HiClipboardList, HiMail, HiPhone, HiUserCircle } from "react-icons/hi";
import React, { useEffect, useRef, useState } from 'react'
import OTPInput from './OTPInput';
import service from '../../service';
import { EquipmentType } from '@/types/EquipmentType';

export default function SellerRegistrationForm() {
    const [openOTPModal, setOpenOTPModal] = useState(false)
    const emailInputRef = useRef<HTMLInputElement>(null);
    const [currentStep, setCurrentStep] = useState(1)
    const [equipmentTypes, setEquipmentTypes] = useState([])

    const onRegistration = (e: React.FormEvent<HTMLFormElement>) => {
        // register and generate OTP service
        e.preventDefault()
        setOpenOTPModal(true)
    }

    const getEquipmentTypes = () => {
        service.get("/mstc-admin/equipment-types").then(response => {
            setEquipmentTypes(response.data.equipmentTypes)
        })
    }

    useEffect(() => {
        getEquipmentTypes()
    }, [])


    return (<>
        {/* <Modal show={openOTPModal} size="md" dismissible={false} onClose={() => { }}
            initialFocus={emailInputRef}
        >
            <Modal.Header>Enter OTP sent to Email and Mobile</Modal.Header>
            <Modal.Body>
                <Label value='Email OTP' className='mb-4' />
                <OTPInput onComplete={() => { }} />
                <br />
                <Label value='Mobile OTP' className='mb-4' />
                <OTPInput onComplete={() => { }} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setOpenOTPModal(false)} fullSized color='blue'>Submit</Button>
            </Modal.Footer>
        </Modal> */}
        {/* <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create a Manufacturer account</h1>
                <form className="space-y-4 md:space-y-6" onSubmit={onRegistration}>
                    <div>
                        <Label htmlFor='email' value='Your email' className='mb-2' />
                        <TextInput icon={HiMail} placeholder='test@example.com' id='email' name='email' />
                    </div>
                    <div>
                        <Label htmlFor='mobile' value='Mobile' />
                        <TextInput icon={HiPhone} placeholder='10 digit mobile no' name='mobile' id='mobile' maxLength={10} />
                    </div>
                    <div>
                        <Label htmlFor='name' value='Full Name' />
                        <TextInput icon={HiUserCircle} placeholder='Your full name' name='name' id='name' />
                    </div>
                    
                    <Button fullSized color='blue' type='submit'>Register</Button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                    </p>
                </form>
            </div>
        </div> */}
        <br />
        <br />
        <div className="max-w-3xl m-auto md:mt-0 xl:p-0">
            <br />
            <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Seller Registration
            </h1>
            <br />
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 w-full">
                        <div className="flex items-center w-1/2 md:w-1/4">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${currentStep === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>1</div>
                            <span className={`ml-2 ${currentStep === 1 ? 'text-blue-500' : 'text-gray-500'}`}>Step 1: Basic Info</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-gray-300"></div>
                        <div className="flex items-center  w-1/2 md:w-1/4">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${currentStep === 2 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>2</div>
                            <span className={`ml-2 ${currentStep === 2 ? 'text-blue-500' : 'text-gray-500'}`}>Step 2: Contact Info</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-gray-300"></div>
                        <div className="flex items-center w-1/2 md:w-1/4">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${currentStep === 3 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>3</div>
                            <span className={`ml-2 ${currentStep === 3 ? 'text-blue-500' : 'text-gray-500'}`}>Step 3: Verification</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-gray-300"></div>
                        <div className="flex items-center w-1/2 md:w-1/4">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${currentStep === 4 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>4</div>
                            <span className={`ml-2 ${currentStep === 4 ? 'text-blue-500' : 'text-gray-500'}`}>Step 4: Confirmation</span>
                        </div>
                    </div>
                </div>
                <HR />
                <form className="space-y-4 md:space-y-6" onSubmit={onRegistration}>
                    {currentStep === 1 && (
                        <>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='col-span-2'>
                                    <div className="flex space-x-4">
                                        <Label value="Are you MSME?" className='text-md font-bold grow-[25]' />
                                        <label className="flex items-center space-x-2">
                                            <input type="radio" name="role" value={1} className="form-radio" />
                                            <span className='dark:text-slate-300'>Yes</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input type="radio" name="role" value={0} className="form-radio" />
                                            <span className='dark:text-slate-300'>No</span>
                                        </label>
                                    </div>
                                </div>
                                <div className='col-span-2'>
                                    <div className="flex space-x-4">
                                        <Label value="Do you have GST Registration?" className='text-md font-bold flex-grow' />
                                        <label className="flex items-center space-x-2">
                                            <input type="radio" name="gst" value={1} className="form-radio" />
                                            <span className='dark:text-slate-300'>Yes</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input type="radio" name="gst" value={0} className="form-radio" />
                                            <span className='dark:text-slate-300'>No</span>
                                        </label>
                                    </div>
                                </div>
                                <div className='align-middle'>
                                    <Label value="Organization PAN" className='text-md font-bold flex-grow' />
                                </div>
                                <div>
                                    <TextInput placeholder='Organization PAN' />
                                </div>
                                <div className=' table-cell align-middle'>
                                    <Label value="Organization Name" className='text-md font-bold flex-grow' />
                                </div>
                                <div>
                                    <TextInput placeholder='Organization Name' />
                                </div>
                            </div>
                        </>
                    )}
                    {currentStep === 2 && (
                        <>
                            <div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div>
                                        <Label value="Supplier Address" className='text-md font-bold' />
                                    </div>
                                    <div>
                                        <TextInput placeholder='Supplier Address' />
                                    </div>
                                    <div>
                                        <Label value="PIN Code" className='text-md font-bold' />
                                    </div>
                                    <div>
                                        <TextInput placeholder='PIN Code' maxLength={6} />
                                    </div>
                                    <div>
                                        <Label value="District" className='text-md font-bold' />
                                    </div>
                                    <div>
                                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                            <option value="FR">France</option>
                                            <option value="DE">Germany</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label value="State" className='text-md font-bold' />
                                    </div>
                                    <div>
                                        <select id="states" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                            <option value="FR">France</option>
                                            <option value="DE">Germany</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {currentStep === 3 && (
                        <>
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label value="Select Supplier type" className='text-md font-bold flex-grow' />
                                    </div>
                                    <div className="flex space-x-4">
                                        <label className="flex items-center space-x-2">
                                            <input type="radio" name="type" value="brand" className="form-radio" />
                                            <span className='dark:text-slate-300'>Brand</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input type="radio" name="type" value="manufacturer" className="form-radio" />
                                            <span className='dark:text-slate-300'>Manufacturer</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input type="radio" name="type" value="dealer" className="form-radio" />
                                            <span className='dark:text-slate-300'>Dealer</span>
                                        </label>
                                    </div>
                                    <div>
                                        <Label value="Input Name of Contact Person" className='text-md font-bold' />
                                    </div>
                                    <div>
                                        <TextInput placeholder='Input Name of Contact Person' />
                                    </div>
                                    <div>
                                        <Label value="Username" className='text-md font-bold' />
                                    </div>
                                    <div>
                                        <TextInput placeholder='Username' />
                                    </div>
                                    <div>
                                        <Label value="Password" className='text-md font-bold' />
                                    </div>
                                    <div>
                                        <TextInput placeholder='Password' type='password' />
                                    </div>
                                    <div>
                                        <Label value="Mobile Number" className='text-md font-bold' />
                                    </div>
                                    <div>
                                        <TextInput placeholder='Mobile Number' />
                                    </div>
                                    <div>
                                        <Label value="Email Address" className='text-md font-bold' />
                                    </div>
                                    <div>
                                        <TextInput placeholder='Email Address' />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {currentStep === 4 && (
                        <>
                            <div>
                                <div className="grid grid-cols-2">
                                    {equipmentTypes.map((equipment: EquipmentType) => <div className='max-h-96 overflow-auto' key={equipment.code}>
                                        <label className="flex items-center space-x-2 p-2">
                                            <input type="checkbox" value={equipment.code} className="form-checkbox" />
                                            <span className='dark:text-slate-300'>{equipment.name}</span>
                                        </label>
                                    </div>)}
                                </div>
                            </div>
                        </>
                    )}
                    <HR />
                    <div className="flex justify-between">
                        <Button color="gray" onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))} disabled={currentStep === 1}>
                            Previous
                        </Button>
                        {currentStep < 4 ? (
                            <Button color="blue" onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 4))}>
                                Next
                            </Button>
                        ) : (
                            <Button color="green" type="submit">
                                Submit
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div >
    </>
    )
}
