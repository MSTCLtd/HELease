import { Alert, Button, Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiCheckCircle, HiChevronLeft, HiChevronRight, HiInformationCircle } from 'react-icons/hi'
import service from '../../../service';
import { EquipmentType } from '@/types/EquipmentType';
import { useRouter } from 'next/router';
import ChangingText from '../ChangingText';
import Link from 'next/link';

// Define types for the form data structure
interface FormData {
    personalInfo: {
        name: string;
        email: string;
        phone: string;
        username: string;
        password: string;
    };
    businessInfo: {
        businessType: string;
        organizationName: string;
        organizationPan: string;
        isMsme: boolean;
        hasGstRegistration: boolean;
        gstNumber: string;
    };
    addressInfo: {
        supplierAddress: string;
        pinCode: string;
        district: string;
        state: string;
        contactPersonName: string;
    };
    equipmentInfo: {
        equipmentCategories: string[];
    };
}

// Define final submission data type
interface SubmissionData {
    phone: string;
    name: string;
    email: string;
    username: string;
    password: string;
    businessType: string;
    organizationPan: string;
    organizationName: string;
    supplierAddress: string;
    pinCode: string;
    district: string;
    state: string;
    contactPersonName: string;
    equipmentCategories: string[];
    isMsme: boolean;
    hasGstRegistration: boolean;
    gstNumber: string;
}

// Define step types
type StepStatus = 'complete' | 'current' | 'upcoming';

interface Step {
    id: string;
    name: string;
    status: StepStatus;
}

const SellerRegistrationForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [formData, setFormData] = useState<FormData>({
        personalInfo: {
            name: '',
            email: '',
            phone: '',
            username: '',
            password: '',
        },
        businessInfo: {
            businessType: '',
            organizationName: '',
            organizationPan: '',
            isMsme: false,
            hasGstRegistration: false,
            gstNumber: '',
        },
        addressInfo: {
            supplierAddress: '',
            pinCode: '',
            district: '',
            state: '',
            contactPersonName: '',
        },
        equipmentInfo: {
            equipmentCategories: []
        }
    });
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    const router = useRouter()

    const [equipmentCategoriesList, setEquipmentCategoriesList] = useState([])
    const steps: Step[] = [
        { id: 'Step 1', name: 'Business Details', status: currentStep > 0 ? 'complete' : currentStep === 0 ? 'current' : 'upcoming' },
        { id: 'Step 2', name: 'Personal Info', status: currentStep > 1 ? 'complete' : currentStep === 1 ? 'current' : 'upcoming' },
        { id: 'Step 3', name: 'Address', status: currentStep > 2 ? 'complete' : currentStep === 2 ? 'current' : 'upcoming' },
        { id: 'Step 4', name: 'Equipment', status: currentStep > 3 ? 'complete' : currentStep === 3 ? 'current' : 'upcoming' },
        { id: 'Step 5', name: 'Review', status: currentStep === 4 ? 'current' : 'upcoming' }
    ];

    useEffect(() => {
        getEquipmentTypes()
    }, [])



    const getEquipmentTypes = () => {
        service.get("/mstc-admin/equipment-types").then(response => {
            setEquipmentCategoriesList(response.data.equipmentTypes.map((item: EquipmentType) => item.name))
        })
    }

    const handleChange = <T extends keyof FormData>(
        step: T,
        field: keyof FormData[T],
        value: any
    ): void => {
        setFormData({
            ...formData,
            [step]: {
                ...formData[step],
                [field]: value
            }
        });
    };

    const handleCheckboxChange = <T extends keyof FormData>(
        step: T,
        field: keyof FormData[T]
    ): void => {
        setFormData({
            ...formData,
            [step]: {
                ...formData[step],
                [field]: !formData[step][field]
            }
        });
    };

    const handleCategoryChange = (category: string): void => {
        let updatedCategories = [...formData.equipmentInfo.equipmentCategories];

        if (updatedCategories.includes(category)) {
            updatedCategories = updatedCategories.filter(cat => cat !== category);
        } else {
            updatedCategories.push(category);
        }

        setFormData({
            ...formData,
            equipmentInfo: {
                ...formData.equipmentInfo,
                equipmentCategories: updatedCategories
            }
        });
    };

    const nextStep = (): void => {
        setCurrentStep(Math.min(currentStep + 1, steps.length - 1));
    };

    const prevStep = (): void => {
        setCurrentStep(Math.max(currentStep - 1, 0));
    };

    const handleSubmit = (): void => {
        // Flatten the data structure to match the required JSON format
        const submitData: SubmissionData = {
            phone: formData.personalInfo.phone,
            name: formData.personalInfo.name,
            email: formData.personalInfo.email,
            username: formData.personalInfo.username,
            password: formData.personalInfo.password,
            businessType: formData.businessInfo.businessType,
            organizationPan: formData.businessInfo.organizationPan,
            organizationName: formData.businessInfo.organizationName,
            supplierAddress: formData.addressInfo.supplierAddress,
            pinCode: formData.addressInfo.pinCode,
            district: formData.addressInfo.district,
            state: formData.addressInfo.state,
            contactPersonName: formData.addressInfo.contactPersonName,
            equipmentCategories: formData.equipmentInfo.equipmentCategories,
            isMsme: formData.businessInfo.isMsme,
            hasGstRegistration: formData.businessInfo.hasGstRegistration,
            gstNumber: formData.businessInfo.gstNumber
        };

        service.post("/auth/register/brand", submitData).then(response => {
            setMsg(response.data.registrationNumber)
        }).catch(err => {
            setErr(err.response.data.message)
        })
    };

    // Form content for each step
    const renderStepContent = (): React.ReactNode => {
        switch (currentStep) {
            case 0: // Personal Information

                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-black dark:text-slate-200">Business Information</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">Seller Type</label>
                            <div className="flex space-x-4">
                                {['Brand', 'Manufacturer', 'Dealer'].map((type) => (
                                    <label key={type} className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="businessType"
                                            value={type}
                                            checked={formData.businessInfo.businessType === type}
                                            onChange={(e) => handleChange('businessInfo', 'businessType', e.target.value)}
                                            className="h-4 w-4 text-primary focus:ring-indigo-500 border-gray-300"
                                        />
                                        <span className="ml-2 text-sm text-gray-700 dark:text-white">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">Organization Name</label>
                            <TextInput
                                color="primary"
                                type="text"
                                value={formData.businessInfo.organizationName}
                                onChange={(e) => handleChange('businessInfo', 'organizationName', e.target.value)}
                                placeholder="Enter organization name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">Organization PAN</label>
                            <TextInput
                                color="primary"
                                type="text"
                                value={formData.businessInfo.organizationPan}
                                onChange={(e) => handleChange('businessInfo', 'organizationPan', e.target.value)}
                                placeholder="Enter organization PAN"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="isMsme"
                                checked={formData.businessInfo.isMsme}
                                onChange={() => handleCheckboxChange('businessInfo', 'isMsme')}
                                className="h-4 w-4 text-primary focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="isMsme" className="text-sm font-medium text-gray-900 dark:text-gray-300">Are you an MSME?</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="hasGst"
                                checked={formData.businessInfo.hasGstRegistration}
                                onChange={() => handleCheckboxChange('businessInfo', 'hasGstRegistration')}
                                className="h-4 w-4 text-primary focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="hasGst" className="text-sm font-medium text-gray-900 dark:text-gray-300">Do you have GST Registration?</label>
                        </div>
                        {formData.businessInfo.hasGstRegistration && (
                            <div>
                                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">GST Number</label>
                                <TextInput
                                    color="primary"
                                    type="text"
                                    value={formData.businessInfo.gstNumber}
                                    onChange={(e) => handleChange('businessInfo', 'gstNumber', e.target.value)}
                                    placeholder="Enter GST number"
                                />
                            </div>
                        )}
                    </div>
                );

            case 1: // Business Information
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-black dark:text-slate-200">Personal Information</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">Contact Person Name</label>
                            <TextInput
                                color="primary"
                                type="text"
                                value={formData.addressInfo.contactPersonName}
                                onChange={(e) => handleChange('addressInfo', 'contactPersonName', e.target.value)}
                                placeholder="Enter contact person name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">Phone Number</label>
                            <TextInput
                                color="primary"
                                type="tel"
                                value={formData.personalInfo.phone}
                                onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
                                placeholder="Enter your phone number"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">Email</label>
                            <TextInput
                                color="primary"
                                type="email"
                                value={formData.personalInfo.email}
                                onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">Username</label>
                            <TextInput
                                color="primary"
                                type="text"
                                value={formData.personalInfo.username}
                                onChange={(e) => handleChange('personalInfo', 'username', e.target.value)}
                                placeholder="Enter your username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">Password</label>
                            <TextInput
                                color="primary"
                                type="password"
                                value={formData.personalInfo.password}
                                onChange={(e) => handleChange('personalInfo', 'password', e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>
                );

            case 2: // Address Information
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-black dark:text-slate-200">Address Information</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">Supplier Address</label>
                            <textarea
                                value={formData.addressInfo.supplierAddress}
                                onChange={(e) => handleChange('addressInfo', 'supplierAddress', e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">PIN Code</label>
                            <TextInput
                                color="primary"
                                type="text"
                                value={formData.addressInfo.pinCode}
                                onChange={(e) => handleChange('addressInfo', 'pinCode', e.target.value)}
                                placeholder="Enter PIN code"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">District</label>
                            <TextInput
                                color="primary"
                                type="text"
                                value={formData.addressInfo.district}
                                onChange={(e) => handleChange('addressInfo', 'district', e.target.value)}
                                placeholder="Enter district"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">State</label>
                            <select
                                value={formData.addressInfo.state}
                                onChange={(e) => handleChange('addressInfo', 'state', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                            >
                                <option value="">Select State</option>
                                <option value="AP">Andhra Pradesh</option>
                                <option value="AR">Arunachal Pradesh</option>
                                <option value="AS">Assam</option>
                                <option value="BR">Bihar</option>
                                <option value="CG">Chhattisgarh</option>
                                <option value="GA">Goa</option>
                                <option value="GJ">Gujarat</option>
                                <option value="HR">Haryana</option>
                                <option value="HP">Himachal Pradesh</option>
                                <option value="JH">Jharkhand</option>
                                <option value="KA">Karnataka</option>
                                <option value="KL">Kerala</option>
                                <option value="MP">Madhya Pradesh</option>
                                <option value="MH">Maharashtra</option>
                                <option value="MN">Manipur</option>
                                <option value="ML">Meghalaya</option>
                                <option value="MZ">Mizoram</option>
                                <option value="NL">Nagaland</option>
                                <option value="OD">Odisha</option>
                                <option value="PB">Punjab</option>
                                <option value="RJ">Rajasthan</option>
                                <option value="SK">Sikkim</option>
                                <option value="TN">Tamil Nadu</option>
                                <option value="TG">Telangana</option>
                                <option value="TR">Tripura</option>
                                <option value="UP">Uttar Pradesh</option>
                                <option value="UK">Uttarakhand</option>
                                <option value="WB">West Bengal</option>
                                <option value="DL">Delhi</option>
                            </select>
                        </div>
                    </div>
                );

            case 3: // Equipment Categories
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-black dark:text-slate-200">Equipment Categories</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Select all categories that apply to your business</p>

                        <div className="space-y-2">
                            {equipmentCategoriesList.map((category, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id={`category-${index}`}
                                        checked={formData.equipmentInfo.equipmentCategories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                        className="h-4 w-4 text-primary focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor={`category-${index}`} className="text-sm font-medium text-gray-700 dark:text-slate-300">{category}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 4: // Review
                return (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-black dark:text-slate-200">Review Your Information</h2>

                        <div className="bg-gray-50 p-4 rounded-lg dark:bg-slate-900">
                            <h3 className="font-medium text-gray-900 dark:text-gray-300 mb-2">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <p><span className="font-medium">Name:</span> {formData.personalInfo.name}</p>
                                <p><span className="font-medium">Phone:</span> {formData.personalInfo.phone}</p>
                                <p><span className="font-medium">Email:</span> {formData.personalInfo.email}</p>
                                <p><span className="font-medium">Username:</span> {formData.personalInfo.username}</p>
                                <p><span className="font-medium">Password:</span> ••••••••</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg dark:bg-slate-900">
                            <h3 className="font-medium text-gray-900 dark:text-gray-300 mb-2">Business Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <p><span className="font-medium">Business Type:</span> {formData.businessInfo.businessType}</p>
                                <p><span className="font-medium">Organization Name:</span> {formData.businessInfo.organizationName}</p>
                                <p><span className="font-medium">Organization PAN:</span> {formData.businessInfo.organizationPan}</p>
                                <p><span className="font-medium">MSME Registered:</span> {formData.businessInfo.isMsme ? 'Yes' : 'No'}</p>
                                <p><span className="font-medium">GST Registered:</span> {formData.businessInfo.hasGstRegistration ? 'Yes' : 'No'}</p>
                                {formData.businessInfo.hasGstRegistration && (
                                    <p><span className="font-medium">GST Number:</span> {formData.businessInfo.gstNumber}</p>
                                )}
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg dark:bg-slate-900">
                            <h3 className="font-medium text-gray-900 dark:text-gray-300 mb-2">Address Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <p><span className="font-medium">Address:</span> {formData.addressInfo.supplierAddress}</p>
                                <p><span className="font-medium">PIN Code:</span> {formData.addressInfo.pinCode}</p>
                                <p><span className="font-medium">District:</span> {formData.addressInfo.district}</p>
                                <p><span className="font-medium">State:</span> {formData.addressInfo.state}</p>
                                <p><span className="font-medium">Contact Person:</span> {formData.addressInfo.contactPersonName}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg dark:bg-slate-900">
                            <h3 className="font-medium text-gray-900 dark:text-gray-300 mb-2">Equipment Categories</h3>
                            <div className="flex flex-wrap gap-2">
                                {formData.equipmentInfo.equipmentCategories.length > 0 ? (
                                    formData.equipmentInfo.equipmentCategories.map((category, index) => (
                                        <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-sm">
                                            {category}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-500 dark:text-gray-400">No categories selected</span>
                                )}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (<>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center'>Register as <ChangingText list={['Brand', 'Manufacturer', 'Supplier']} /></h1>
        <br />
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">

            {/* Stepper */}
            <nav aria-label="Progress">
                <ol className="flex items-center justify-between w-full mb-8">
                    {steps.map((step, index) => (
                        <li key={step.id} className={`flex items-center ${index !== steps.length - 1 ? 'w-full' : ''}`}>
                            <div className="flex flex-col items-center">
                                <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full
                  ${step.status === 'complete' ? 'bg-primary' :
                                        step.status === 'current' ? 'border-2 border-primary bg-white' :
                                            'border-2 border-gray-300 bg-white'}`}>
                                    {step.status === 'complete' ? (
                                        <HiCheckCircle className="w-5 h-5 text-white" />
                                    ) : (
                                        <span className={`text-sm font-medium
                      ${step.status === 'current' ? 'text-primary' : 'text-gray-500'}`}>
                                            {index + 1}
                                        </span>
                                    )}
                                </div>
                                <p className={`text-xs font-medium mt-1
                  ${step.status === 'complete' ? 'text-primary' :
                                        step.status === 'current' ? 'text-primary' :
                                            'text-gray-500'}`}>
                                    {step.name}
                                </p>
                            </div>
                            {index !== steps.length - 1 && (
                                <div className="flex-1 mx-2 h-0.5 bg-gray-200">
                                    <div
                                        className="h-full bg-primary"
                                        style={{ width: step.status === 'complete' ? '100%' : '0%' }}
                                    />
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>

            {/* Form content */}
            <div className="mt-8">
                {renderStepContent()}
            </div>

            {/* Navigation buttons */}
            <div className="mt-8 flex justify-between">
                <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md
            ${currentStep === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
                    <HiChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                </button>

                {currentStep < steps.length - 1 ? (
                    <Button size='sm'
                        color='primary'
                        onClick={nextStep}
                        className="inline-flex items-center border border-transparent text-sm font-medium rounded-md shadow-sm"
                    >
                        Next
                        <HiChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button size='sm'
                        color='success'
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex items-center px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                    >
                        Register
                    </Button>
                )}
            </div>
        </div>
        <center className='p-4'>
            <Link href="/seller/login" className='text-primary'>Already registered? Sign In</Link>
        </center>
        <Modal show={err != ''} onClose={() => setErr('')}>
            <ModalHeader className='text-2xl text-red-600'>Error</ModalHeader>
            <ModalBody>
                <Alert color="failure" icon={HiInformationCircle}>
                    {err}
                </Alert>
            </ModalBody>
        </Modal>
        <Modal show={msg != ''} onClose={() => {
            setMsg('')
            router.push("/seller/login")
        }}>
            <ModalHeader className='text-2xl'>Registration Successful</ModalHeader>
            <ModalBody>
                <Alert color="success" icon={HiInformationCircle}>
                    Registration No.: {msg}
                </Alert>
            </ModalBody>
        </Modal>
    </>
    );
};

export default SellerRegistrationForm;