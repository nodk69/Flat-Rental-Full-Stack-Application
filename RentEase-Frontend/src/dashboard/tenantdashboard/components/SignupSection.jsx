import React, { useState } from 'react';

const SignupSection = () => {
  const [userType, setUserType] = useState('login'); //Default page is login

  return (
    <section className="bg-emerald-500 text-black py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-lg">Login to continue</p>
        </div>

        {/* Content Slider */}
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
          <div className="flex border-b mb-4">
            <button
              onClick={() => setUserType('login')}
              className={`flex-1 p-2 text-center ${userType === 'login' ? 'border-b-2 border-emerald-600 font-bold' : 'text-gray-500'}`}
            >
              Login
            </button>
          </div>
          
          {userType === 'login' && <LoginForm setUserType={setUserType} />}
          {userType === 'tenant' && <TenantForm />}
          {userType === 'landlord' && <LandlordForm />}
        </div>
      </div>
    </section>
  );
};

const LoginForm = ({ setUserType }) => {
  return (
    <div>
      <form className="space-y-4">
        <InputField type="email" placeholder="Email Address" />
        <InputField type="password" placeholder="Password" />
        <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition duration-300">
          Login
        </button>
      </form>
      <p className="text-center text-gray-500 mt-4">
        Don't have an account?{' '}
        <span className="text-emerald-600 cursor-pointer" onClick={() => setUserType('tenant')}>Sign up</span>
      </p>
    </div>
  );
};

const InputField = ({ type, placeholder }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
    required
  />
);

const TenantForm = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-emerald-600 mb-4 text-center">Sign Up as Tenant</h3>
      <form className="space-y-4">
        <InputField type="text" placeholder="Full Name" />
        <InputField type="email" placeholder="Email Address" />
        <InputField type="tel" placeholder="Mobile Number" />
        <InputField type="text" placeholder="Current Address" />
        <InputField type="password" placeholder="Password" />
        <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition duration-300">
          Submit
        </button>
      </form>
    </div>
  );
};

const LandlordForm = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-blue-600 mb-4 text-center">Sign Up as Landlord</h3>
      <form className="space-y-4">
        <InputField type="text" placeholder="Full Name" />
        <InputField type="email" placeholder="Email Address" />
        <InputField type="tel" placeholder="Mobile Number" />
        <InputField type="text" placeholder="Property Address" />
        <InputField type="number" placeholder="Number of Properties" />
        <InputField type="password" placeholder="Password" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignupSection;
