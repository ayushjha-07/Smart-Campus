import React, { useEffect } from 'react';
import RegisterVisual from '../components/register/RegisterVisual';
import RegisterForm from '../components/register/RegisterForm';

export default function RegisterPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Create Your Account | Smart Campus Complaint & Analytics System";
  }, []);

  return (
    <div className="min-h-screen bg-[#07121A] flex flex-col lg:flex-row antialiased overflow-x-hidden animate-fadeIn">
      {/* Left Column: Visual (~45% on Desktop) */}
      <RegisterVisual />

      {/* Right Column: Registration Form (~55% on Desktop) */}
      <RegisterForm />
    </div>
  );
}
