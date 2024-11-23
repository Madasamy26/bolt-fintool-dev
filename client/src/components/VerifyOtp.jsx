import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOtp } = useAuthStore();

  const { email } = location.state || {}; // Get the email from the state

  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // State to hold OTP values
  const [error, setError] = useState(null);


  
  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value; // Update the specific index with the new value
    setOtp(newOtp); // Update the state with the new OTP array
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const otpString = otp.join(''); // Convert the OTP array to a string

    try {
      // Call your API to verify the OTP
      const response = await verifyOtp({ email, otpString });
      // Handle successful verification (e.g., log the user in)
      console.log("OTP verified successfully:", response.data);
      //navigate('/dashboard'); // Redirect to the dashboard or another page
      if (response.data.ok) {
        navigate("/login");
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center">Verify OTP</h2>
        <p className="text-center mx-10">
          An OTP has been sent to {email}. Please enter it below:
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center space-y-10">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              {otp.map((value, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  value={value} // Pass the current value to the slot
                  onChange={(e) => {console.log(e)}} // Handle change
                />
              ))}
            </InputOTPGroup>
            
            
          </InputOTP>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
         
          <Button type="submit" className="w-full bg-[#0C7FDA] text-white">
            Verify OTP
          </Button>
          
        </form>
      </div>
    </div>
  );
}
