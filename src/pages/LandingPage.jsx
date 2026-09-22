import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import ProblemSection from '../components/ProblemSection';
import SolutionWorkflow from '../components/SolutionWorkflow';
import FeaturesSection from '../components/FeaturesSection';
import AISection from '../components/AISection';
import TrackingTimeline from '../components/TrackingTimeline';
import BenefitsSection from '../components/BenefitsSection';
import DeveloperSection from '../components/DeveloperSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import ComplaintModal from '../components/ComplaintModal';

export default function LandingPage() {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F9F8] dark:bg-[#07121A] text-[#071A2B] dark:text-[#F5F5F0] transition-colors duration-300 flex flex-col selection:bg-[#008F63] selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar onOpenSubmitModal={() => setIsSubmitModalOpen(true)} />

      {/* Main Landing Content */}
      <main className="flex-1">
        {/* 1. Hero Section with Campus Image & High-impact headline */}
        <Hero onOpenSubmitModal={() => setIsSubmitModalOpen(true)} />

        {/* 2. 4 Compact Trust / Quick Stats */}
        <Stats />

        {/* 3. The Problem Section */}
        <ProblemSection />

        {/* 4. Solution Horizontal Workflow Pipeline */}
        <SolutionWorkflow />

        {/* 5. 6 Key Features Grid */}
        <FeaturesSection />

        {/* 6. AI Natural Language Processing Section */}
        <AISection />

        {/* 7. Real-time Tracking Timeline */}
        <TrackingTimeline />

        {/* 8. Dual Benefits Section: Students & Administrators */}
        <BenefitsSection onOpenSubmitModal={() => setIsSubmitModalOpen(true)} />

        {/* 9. Final Conversion Call to Action */}
        <CTASection onOpenSubmitModal={() => setIsSubmitModalOpen(true)} />

        {/* 10. Developer Introduction: Prachi Priya Spotlight */}
        <DeveloperSection />
      </main>

      {/* Comprehensive Academic Footer */}
      <Footer />

      {/* Interactive Mock Modal for Hero Complaint Preview */}
      <ComplaintModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />
    </div>
  );
}
