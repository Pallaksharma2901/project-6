import React, { useRef, useState, useEffect } from 'react';
import Table from "./Table"

const Form = () => {
    const initialData = {
        address: '',
        course: '',
        email: '',
        gender: '',
        hobbies: [],
        name: '',
        password: '',
    };
    const formRef = useRef(null)
    const [formData, setFormData] = useState(initialData)
    const [editedData, setEditedData] = useState(null)
    const [formErrors, setFormErrors] = useState({})
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)
    const [data, setData] = useState([])


    useEffect(() => {
        if (editedData) {
            setFormData(editedData)
        }
    }, [editedData])
    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(data || []))
    }, [data])


    const handleInputChange = (e) => {
        setFormErrors({})
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleGenderSelect = (e) => {
        setFormData({ ...formData, gender: e.target.value });
    }

    const handleCheckboxChecked = (e) => {
        const checkboxValue = e.target.value;
        const isChecked = e.target.checked;

        setFormData((prevFormData) => ({
            ...prevFormData,
            hobbies: isChecked
                ? [...prevFormData.hobbies, checkboxValue]
                : prevFormData.hobbies.filter(hobby => hobby !== checkboxValue),
        }));
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        if (!formData.name.trim()) {
            errors.name = "Name is required";
        }
        if (!formData.password.trim()) {
            errors.password = "Password is required";
        }
        if (formData.hobbies.length < 1) {
            errors.hobbies = "Please select at least one option";
        }
        if (!formData.address.trim()) {
            errors.address = "Please write your address";
        }

        setFormErrors(errors);
        setIsFormSubmitted(true);

        if (Object.keys(errors).length === 0) {
            if (formData.index !== undefined) {
                const updatedData = [...data];
                updatedData[formData.index] = formData;
                setData(updatedData);
                setFormData(initialData);
            } else {
                setData([...data, formData]);
            }
            setIsFormSubmitted(false);
            formRef.current.reset();
        }
    }
    const handleEdit = (index) => {
        setEditedData(data[index])
    }
    const handleDelete = (index) => {
        const updatedData = [...data]
        updatedData.splice(index, 1)
        setData(updatedData)
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl text-sky-700 font-semibold my-3'>Form</h1>
            <form ref={formRef} className="bg-gray-50 w-4/12 mx-auto mb-10 p-5 rounded shadow-lg border border-sky-600" onSubmit={handleFormSubmit}>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-md font-medium text-gray-900">Your name</label>
                    <input
                        type="text" id="name"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 ${formErrors.name ? 'border-red-500' : ''}`}
                        placeholder="John smith" required
                        onChange={handleInputChange}
                    />
                    {isFormSubmitted && formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900">Your email</label>
                    <input type="email" id="email" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 ${formErrors.email ? 'border-red-500' : ''}`} placeholder="name@flowbite.com" required
                        onChange={handleInputChange}
                    />
                    {isFormSubmitted && formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900">Your password</label>
                    <input type="password" id="password" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 ${formErrors.password ? 'border-red-500' : ''}`} required
                        onChange={handleInputChange}
                    />
                    {isFormSubmitted && formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
                </div>
                <div className="mb-5">
                    <h6 className="block mb-2 text-md font-medium text-gray-900">Gender</h6>
                    <div className='flex gap-4'>
                        <div className='flex items-center'>
                            <input id="gender-1" type="radio" name="gender" value='male' className="w-4 h-4 border-gray-300 focus:ring-1 focus:ring-sky-300" onChange={handleGenderSelect} required />
                            <label htmlFor="gender-1" className="block ms-2 text-sm font-medium text-gray-900">
                                Male
                            </label>
                        </div>
                        <div className='flex items-center'>
                            <input id="gender-2" type="radio" name="gender" value='female' className="w-4 h-4 border-gray-300 focus:ring-1 focus:ring-sky-300" onChange={handleGenderSelect} required />
                            <label htmlFor="gender-2" className="block ms-2 text-sm font-medium text-gray-900">
                                Female
                            </label>
                        </div>
                        <div className='flex items-center'>
                            <input id="gender-3" type="radio" name="gender" value='other' className="w-4 h-4 border-gray-300 focus:ring-1 focus:ring-sky-300" onChange={handleGenderSelect} required />
                            <label htmlFor="gender-3" className="block ms-2 text-sm font-medium text-gray-900">
                                Other
                            </label>
                        </div>
                    </div>
                    {isFormSubmitted && formErrors.gender && <p className="text-red-500 text-sm mt-1">{formErrors.gender}</p>}
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-md font-medium text-gray-900">Your Hobbies</label>
                    <div className='flex items-center gap-4'>
                        <div className="flex items-center">
                            <input type="checkbox" className={`w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 focus:ring-2`}
                                value={'Reading'} onChange={handleCheckboxChecked} />
                            <label className="ms-2 text-sm font-medium text-gray-900">Reading</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" className={`w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 focus:ring-2`}
                                value={'Singing'} onChange={handleCheckboxChecked} />
                            <label className="ms-2 text-sm font-medium text-gray-900">Singing</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" className={`w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 focus:ring-2`}
                                value={'Coding'} onChange={handleCheckboxChecked} />
                            <label className="ms-2 text-sm font-medium text-gray-900">Coding</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" className={`w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 focus:ring-2`}
                                value={'Other'} onChange={handleCheckboxChecked} />
                            <label className="ms-2 text-sm font-medium text-gray-900">Other</label>
                        </div>
                    </div>
                    {isFormSubmitted && formErrors.hobbies && <p className="text-red-500 text-sm mt-1">{formErrors.hobbies}</p>}
                </div>
                <div className="mb-5">
                    <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-900">
                        Select your Course
                    </label>
                    <select id="course" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5`} onChange={handleInputChange} required >
                        <option value=''>Choose Course</option>
                        <option value="react">React</option>
                        <option value="php">Php</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                    </select>
                </div>
                <div className="mb-5">
                    <div>
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Your Address</label>
                        <textarea id="address" rows={4} className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${formErrors.address ? 'border-red-500' : ''}`} placeholder="Xyz Street, USA." defaultValue={""} onChange={handleInputChange} required />
                        {isFormSubmitted && formErrors.address && <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>}
                    </div>
                </div>
                <button type="submit" className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
            <Table data={data} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default Form;