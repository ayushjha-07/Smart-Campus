import React, { useEffect } from 'react';
import LoginVisual from '../components/auth/LoginVisual';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Sign In | Smart Campus Complaint & Analytics System";
  }, []);

  return (
    <div className="min-h-screen bg-[#07121A] flex flex-col lg:flex-row antialiased overflow-x-hidden animate-fadeIn">
      {/* Left Column: Visual (~55% on Desktop) */}
      <LoginVisual />

      {/* Right Column: Form (~45% on Desktop) */}
      <LoginForm />
    </div>
  );
}
