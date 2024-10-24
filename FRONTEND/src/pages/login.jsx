import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, Lock, User, Phone, Calendar, CreditCard, ChevronRight, UserCircle2, ArrowRight } from 'lucide-react';

const Register = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [nic, setNic] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword, role: 'Patient' }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Login successful');
        navigate('/');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      gender,
      dob,
      nic,
      role: 'Patient',
    };

    try {
      const response = await fetch('http://localhost:4000/api/v1/user/patient/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Registration successful');
        setIsLogin(true);
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch (err) {
      toast.error('Error during registration');
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ icon: Icon, label, type, value, onChange, id, required = true }) => (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          required={required}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Welcome Back!' : 'Create Your Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? 'Sign in to access your account' : 'Join us today and start your journey'}
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <InputField
                icon={Mail}
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
              />
              <InputField
                icon={Lock}
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
              />
              <InputField
                icon={Lock}
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmPassword"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? (
                  'Logging in...'
                ) : (
                  <>
                    Sign In 
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <InputField
                  icon={User}
                  label="First Name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  id="firstName"
                />
                <InputField
                  icon={User}
                  label="Last Name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  id="lastName"
                />
              </div>

              <InputField
                icon={Mail}
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
              />

              <InputField
                icon={Phone}
                label="Phone Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                id="phone"
              />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <InputField
                  icon={Lock}
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                />
                <InputField
                  icon={Lock}
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirmPassword"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <InputField
                  icon={UserCircle2}
                  label="Gender"
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  id="gender"
                />
                <InputField
                  icon={Calendar}
                  label="Date of Birth"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  id="dob"
                />
              </div>

              <InputField
                icon={CreditCard}
                label="NIC"
                type="text"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                id="nic"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? (
                  'Creating Account...'
                ) : (
                  <>
                    Create Account
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="mt-4 w-full flex justify-center py-2 px-4 text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition-colors duration-200"
            >
              {isLogin ? 'Create a new account' : 'Sign in to existing account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;