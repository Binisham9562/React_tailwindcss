
import { useFormik } from 'formik';
import * as Yup from 'yup';


function Form(){

    const formik = useFormik({
        initialValues:{
            serviceOwnerEmail: "",
            distributionListEmail: "",
            businessOwnerEmail: "",
            businessServiceName: "",
            projectDescription: "",
            localMarket: "",
        },
        validationSchema:Yup.object({
            serviceOwnerEmail:Yup.string()
                .email("Enter a valid email")
                .required("Required"),
            distributionListEmail:Yup.string()
                .email("Enter a valid email")
                .required("At least one email is required"),
            businessOwnerEmail:Yup.string()
                .email("Enter a valid email")
                .notOneOf([Yup.ref('serviceOwnerEmail')],
                    "Business Owner Email must be different from Service Owner Email")
                .required("Required"),
            businessServiceName:Yup.string()
                .required("Required"),
            projectDescription:Yup.string()
                .required("Required"),
            localMarket:Yup.string()
                .required("Required"),
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    });

    return(
    <div className="min-h-screen flex flex-col bg-white p-6">
        <h1 className='text-2xl font-semibold mb-6'>Business Information</h1>
        <div className='border border-red-400 bg-red-50 rounded-md px-3 py-2'>
            <p className="text-xs text-red-500">please correct the highlighted fields before continuing. </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
            <div className="flex gap-6 mt-4">

            <div className="flex-1">
                <label className='block text-medium text-gray-800'>Service owner's e-mail
                    <span className='text-red-500'>*</span>
                </label>

                <input
                    type='email'
                    name='serviceOwnerEmail'
                    value={formik.values.serviceOwnerEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='example@vodafone.com'
                    className="w-full border border-red-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-2 focus:border-red-600"
                    
                />

            {formik.touched.serviceOwnerEmail && 
            formik.errors.serviceOwnerEmail && (
                <p className="text-xs text-red-500 mt-1">
                    {formik.errors.serviceOwnerEmail}</p>
            )}
            
            </div>

            <div className="flex-1">
                <label className='block text-medium text-gray-800'>Distribution list email
                    <span className='text-red-500'>*</span>
                </label>

                <input
                    type='email'
                    name='distributionListEmail'
                    value={formik.values.distributionListEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='Type email and press enter'
                    className="w-full border border-red-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-2 focus:border-red-600"
                    
                />

            {formik.touched.distributionListEmail && 
            formik.errors.distributionListEmail && (
                <p className="text-xs text-red-500 mt-1">
                    {formik.errors.distributionListEmail}</p>
            )}
            
            </div>

            </div>

            <div className="flex gap-6 mt-6">
                <div className="flex-1">
                    <label className='block text-medium text-gray-800'>Business Owner Email
                    <span className='text-red-500'>*</span>
                </label>

                <input
                    type='email'
                    name='businessOwnerEmail'
                    value={formik.values.businessOwnerEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='example@vodafone.com'
                    className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-2 focus:border-red-600"
                    
                />

            {formik.touched.businessOwnerEmail && 
            formik.errors.businessOwnerEmail && (
                <p className="text-xs text-red-500 mt-1">
                    {formik.errors.businessOwnerEmail}</p>
            )}
            

            </div>

                <div className="flex-1">
                        <label className='block text-medium text-gray-800'>Business Service Name
                        <span className='text-red-500'>*</span>
                    </label>

                    <select
                        name='businessServiceName'
                        value={formik.values.businessServiceName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-2 focus:border-red-600"
                    >
                        <option value="">Search and select a business service</option>
                        <option value="Service1">Service 1</option>
                        <option value="Service2">Service 2</option>
                        <option value="Service3">Service 3</option>
                    </select>

                {formik.touched.businessServiceName && 
                formik.errors.businessServiceName && (
                    <p className="text-xs text-red-500 mt-1">
                        {formik.errors.businessServiceName}</p>
                )}

                        
                </div>
            </div>


            <div className="flex gap-6 mt-6">
                <div className="flex-1">
                    <label className='block text-medium text-gray-800'>Project description
                    <span className='text-red-500'>*</span>
                </label>

                <input
                    type='text'
                    name='projectDescription'
                    value={formik.values.projectDescription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='High-level overview of what the project does'
                    className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-2 focus:border-red-600"
                    
                />

            {formik.touched.projectDescription && 
            formik.errors.projectDescription && (
                <p className="text-xs text-red-500 mt-1">
                    {formik.errors.projectDescription}</p>
            )}
            

            </div>

                <div className="flex-1">
                        <label className='block text-medium text-gray-800'>Local Market
                        <span className='text-red-500'>*</span>
                    </label>

                    <select
                        name='localMarket'
                        value={formik.values.localMarket}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-2 focus:border-red-600"
                    >

                    <option value="">Please select from the list</option>
                    <option value="Market1">USA</option>
                    <option value="Market2">UK</option>
                    <option value="Market3">India</option>
                    </select>

                {formik.touched.localMarket && 
                formik.errors.localMarket && (
                    <p className="text-xs text-red-500 mt-1">
                        {formik.errors.localMarket}</p>
                )}

                        
                </div>
            </div>
        </form>

                 
        </div>
    );
}

export default Form;