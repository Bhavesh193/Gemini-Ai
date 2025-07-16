/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { ThemeContext } from './contexts/ThemeContext.jsx';
import { AuthContext } from './contexts/AuthContext.jsx';
import { LoginSchema, OtpSchema } from './schemas/ValidationSchemas.jsx';
import { Sun, Moon } from './components/Icons.jsx';

export const AuthScreen = () => {
  const { login } = useContext(AuthContext);
  const [step, setStep] = useState('phone'); 
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(''); 
  const { theme, toggleTheme } = useContext(ThemeContext);

  const {
    register: registerPhone,
    handleSubmit: handlePhoneSubmit,
    formState: { errors: phoneErrors },
    watch: watchPhone,
    setValue: setPhoneValue,
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm({
    resolver: zodResolver(OtpSchema),
  });

  const selectedCountryCode = watchPhone('countryCode');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v2/all?fields=name,alpha2Code,callingCodes');
        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error('API response for countries is not an array:', data);
          toast.error('Failed to load country data: Unexpected response format.');
          setCountries([]);
          return;
        }

        const countryData = data.map(country => ({
          name: country.name,
          code: country.alpha2Code,
          dialCode: country.callingCodes && country.callingCodes.length > 0 ? `+${country.callingCodes[0]}` : ''
        })).filter(country => country.dialCode);
        countryData.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryData);

        if (countryData.length > 0) {
          const defaultDialCode = countryData.find(c => c.dialCode === '+1')?.dialCode || countryData[0].dialCode;
          setPhoneValue('countryCode', defaultDialCode);
        }

      } catch (error) {
        console.error('Error fetching countries:', error);
        toast.error('Failed to load country data.');
      } finally {
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, [setPhoneValue]);

  const onSendOtp = (data) => {
    setIsSendingOtp(true);
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    setTimeout(() => {
      setIsSendingOtp(false);
      setStep('otp');
      toast.success('OTP sent! (Simulated)');
    }, 2000);
  };

  const onVerifyOtp = (data) => {
    setIsVerifyingOtp(true);
    toast.info(`Verifying OTP ${data.otp}...`);
    setTimeout(() => {
      setIsVerifyingOtp(false);
      if (data.otp === generatedOtp) {
        login({ phoneNumber: `${selectedCountryCode}${watchPhone('phoneNumber')}` });
        toast.success('Login successful!');
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-4 sm:p-0"> 
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:scale-105 transition-transform"
          aria-label="Toggle dark mode"
        >
          {theme === 'light' ? <Moon /> : <Sun />}
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700"> 
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6"> 
          Welcome to Gemini Chat
        </h2>

        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit(onSendOtp)} className="space-y-4">
            <div>
              <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Country Code
              </label>
              {loadingCountries ? (
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
              ) : (
                <select
                  id="countryCode"
                  {...registerPhone('countryCode')}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  aria-invalid={phoneErrors.countryCode ? "true" : "false"}
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.dialCode}>
                      {country.name} ({country.dialCode})
                    </option>
                  ))}
                </select>
              )}
              {phoneErrors.countryCode && (
                <p className="mt-1 text-sm text-red-600">{phoneErrors.countryCode.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                {...registerPhone('phoneNumber')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="e.g., 9876543210"
                aria-invalid={phoneErrors.phoneNumber ? "true" : "false"}
              />
              {phoneErrors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{phoneErrors.phoneNumber.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base sm:text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSendingOtp || loadingCountries}
              aria-label="Send OTP"
            >
              {isSendingOtp ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit(onVerifyOtp)} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Enter OTP
              </label>
              {generatedOtp && (
                <p className="text-center text-sm text-blue-600 dark:text-blue-400 mb-2">
                  Simulated OTP: <strong className="text-lg">{generatedOtp}</strong>
                </p>
              )}
              <input
                type="text"
                id="otp"
                {...registerOtp('otp')}
                maxLength="6"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-center tracking-widest"
                placeholder="XXXXXX"
                aria-invalid={otpErrors.otp ? "true" : "false"}
              />
              {otpErrors.otp && (
                <p className="mt-1 text-sm text-red-600">{otpErrors.otp.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base sm:text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isVerifyingOtp}
              aria-label="Verify OTP"
            >
              {isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 hover:text-blue-700 transition-all duration-200"
              aria-label="Back to phone number entry"
            >
              Back to Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
};