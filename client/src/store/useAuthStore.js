import {create} from 'zustand';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast'; // Import the useToast hook

// Create a Zustand store for authentication
export const useAuthStore = create((set) => ({
  user: null,
  loginError: null,
  signupError: null,
  otpVerifyError:null,
  isAuthenticated:false,

  // Signup function
  signup: async ({ firstName, lastName, email, password }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        firstName,
        lastName,
        email,
        password,
      });

      console.log("response",response);
      // Assuming the response contains user data
      // set({ user: response.data.user, signupError: null });
       return response; 
    } catch (error) {
      // Handle error (e.g., set error message)
      set({ signupError: error.response?.data?.message || 'Signup failed' });
      throw error; // Rethrow the error to handle it in the component
    }
  },

  verifyOtp: async ({ email, otp }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/verify`, { email, otp });

      console.log("response",response);
      // Assuming the response contains user data
      // set({ user: response.data.user, otpVerifyError: null });
       return response; 
    } catch (error) {
      // Handle error (e.g., set error message)
      set({ otpVerifyError: error.response?.data?.message || 'Otp verification failed' });
      throw error; // Rethrow the error to handle it in the component
    }
  },

  // Login function
  login: async ({ email, password }) => {
   
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      // Assuming the response contains user data
      set({ user: response.data.user,isAuthenticated: true, loginError: null });
      // toast({
      //   message: 'Login successful!',
      //   type: 'success', // Show success toast
      // });
      return response.data; // Return the response for further handling if needed
    } catch (error) {
      // Handle error (e.g., set error message)
      set({ loginError: error.response?.data?.message || 'Login failed' });
      throw error; // Rethrow the error to handle it in the component
    }
  },

  // Logout function
  logout: () => {
    set({ user: null, loginError: null, signupError: null });
  },
}));


