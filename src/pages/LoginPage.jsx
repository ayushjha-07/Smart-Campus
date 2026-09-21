import React, { useEffect } from 'react';
import LoginVisual from '../components/auth/LoginVisual';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Sign In | Smart Campus Complaint & Analytics System";
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7F5] dark:bg-[#050A0C] flex flex-col md:flex-row antialiased overflow-x-hidden transition-colors duration-300">
      {/* Left Column: Visual (~55% on Desktop, ~45% on Tablet) */}
      <LoginVisual />

      {/* Right Column: Form (~45% on Desktop, ~55% on Tablet, 100% on Mobile) */}
      <LoginForm />
    </div>
  );
}
