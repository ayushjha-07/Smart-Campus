import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Lightbulb, Compass, Sprout, PlusCircle, ClipboardList } from 'lucide-react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ComplaintForm from '../components/complaint/ComplaintForm';
import AIAnalysisPreview from '../components/complaint/AIAnalysisPreview';
import SubmissionGuidelines from '../components/complaint/SubmissionGuidelines';
import ComplaintSuccess from '../components/complaint/ComplaintSuccess';
import { analyzeComplaint } from '../utils/mockAIAnalysis';
import { useApp } from '../context/useApp';
import { complaintApi } from '../services/complaintApi';
import { mapComplaint } from '../utils/mapper';
import { isMockMode } from '../services/dataSource';
import campusAssets from '../assets/campusAssets';
import HeroCalligraphy from '../components/common/HeroCalligraphy';

export default function SubmitComplaint() {
  const { addComplaint, showToast } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [currentTextLength, setCurrentTextLength] = useState(0);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Submit a Complaint | Smart Campus Complaint & Analytics";
  }, []);

  const handleDescriptionChange = (description, category) => {
    setCurrentTextLength(description.length);
    if (!description.trim() || description.trim().length < 5) {
      setAiAnalysis(null);
      return;
    }
    const analysis = analyzeComplaint(description, category);
    setAiAnalysis(analysis);
  };

  const handleFormSuccess = async (formData, imageFile) => {
    if (!isMockMode) {
      try {
        const created = await complaintApi.createComplaint({
          title: formData.title.trim(),
          description: formData.description.trim(),
          category: formData.category,
          location: formData.location.trim(),
          priority: formData.priority,
          images: imageFile ? [imageFile] : [],
        });
        const mapped = mapComplaint(created);
        setSubmittedData(mapped);
        addComplaint(mapped);
        showToast('Complaint submitted successfully.', 'success');
        return;
      } catch (err) {
        showToast(err.message || 'Failed to submit complaint to server', 'error');
        return;
      }
    }

    const newRecord = {
      id: `CGC-CMP-${Date.now().toString().slice(-4)}`,
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      location: formData.location.trim(),
      priority: formData.priority,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submittedBy: {
        id: 'usr-student-01',
        name: 'Ayush Kumar Jha',
        rollNo: '21051992',
        branch: 'B.Tech CSE',
        year: '4th Year'
      },
      image: imageFile ? URL.createObjectURL(imageFile) : null,
      timeline: [
        {
          status: 'submitted',
          label: 'Complaint Submitted',
          date: new Date().toISOString(),
          note: 'Complaint received and pending initial review.'
        }
      ]
    };

    setSubmittedData(newRecord);
    addComplaint(newRecord);
    showToast('Complaint submitted successfully.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] dark:bg-[#050D12] text-[#10233D] dark:text-[#F5F7F5] flex antialiased selection:bg-[#078B5B] selection:text-white transition-colors duration-200">
      
      {/* 1. LEFT SIDEBAR (Fixed 300px width on desktop) */}
      <DashboardSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[280px]">
        
        {/* 2. TOP HEADER */}
        <DashboardHeader
          onToggleMobile={() => setMobileSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Scrollable Page Body in Normal Document Flow */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* 3. HERO / BANNER: Master CGC Aerial Campus Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden border border-[#DDE7E2] dark:border-white/10 p-6 sm:p-7 lg:p-8 shadow-xl min-h-[195px] sm:min-h-[215px] flex items-center justify-between transition-all">
            
            {/* Real CGC Aerial Campus Photo (100% Opacity, Sharp, Real Photograph) */}
            <img
              src={campusAssets.aerialImage}
              alt="CGC University Mohali Aerial Campus"
              className="absolute inset-0 w-full h-full object-cover object-[center_35%] z-0 filter brightness-[1.0] contrast-[1.02]"
            />

            {/* Master Directional Contrast Gradient for Text Readability:
                - Left 45%: strong dark navy/black overlay (~82-84% opacity)
                - Middle 45%: smooth transition to transparent (down to ~18-20% opacity)
                - Right 10%: almost completely transparent, keeping CGC University building sharp & bright
            */}
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, rgba(5, 13, 18, 0.85) 0%, rgba(5, 13, 18, 0.80) 40%, rgba(5, 13, 18, 0.40) 65%, rgba(5, 13, 18, 0.12) 85%, rgba(5, 13, 18, 0.0) 100%)'
              }}
            />
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background: 'linear-gradient(0deg, rgba(5, 13, 18, 0.70) 0%, rgba(5, 13, 18, 0.20) 28%, transparent 55%)'
              }}
            />

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 w-full">
              
              {/* Left: Badge, Heading, Description, Buttons */}
              <div className="space-y-2.5 max-w-xl">
                
                {/* Top Pill Badge: Smart Campus */}
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#050D12]/75 backdrop-blur-md border border-white/20 text-white shadow-sm">
                    <span>Smart Campus</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                    Submit a <span className="text-[#10E894]">Complaint</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-100 font-medium drop-shadow-xs max-w-lg leading-relaxed">
                    Report a campus issue and let Smart Campus route it to the right department.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <a
                    href="#complaint-form"
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#078A5A] hover:bg-[#06734B] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 shadow-md"
                  >
                    <PlusCircle className="w-4 h-4 stroke-[2.5]" />
                    <span>Submit Complaint</span>
                  </a>

                  <Link
                    to="/student/complaints"
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#10213A] bg-white hover:bg-slate-100 border border-slate-200/80 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 shadow-md"
                  >
                    <ClipboardList className="w-4 h-4 text-[#10213A]" />
                    <span>View My Complaints</span>
                  </Link>
                </div>

              </div>

              {/* Right Side: Script Calligraphy Overlay with Soft White Blur Cloud */}
              <HeroCalligraphy />

            </div>
          </div>

          {/* 4. MAIN CONTENT — TWO COLUMN BALANCED LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Complaint Form Card (cols 8 on Desktop) */}
            <div className="lg:col-span-8">
              <ComplaintForm
                onDescriptionChange={handleDescriptionChange}
                onSubmitSuccess={handleFormSuccess}
              />
            </div>

            {/* Right Column: AI Analysis Card + Before You Submit Card (cols 4 on Desktop) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Dynamic AI Complaint Analysis Card */}
              <AIAnalysisPreview
                analysis={aiAnalysis}
                textLength={currentTextLength}
              />

              {/* Before You Submit Card */}
              <SubmissionGuidelines />

            </div>

          </div>

          {/* Minimal Light Footer */}
          <div className="pt-6 pb-2 text-center text-xs text-[#64748B] border-t border-[#DDE7E2] flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>&copy; {new Date().getFullYear()} Smart Campus Complaint & Analytics System • CGC University Mohali</span>
            <span className="text-[#168A5B] font-semibold">Report. Track. Resolve. Improve.</span>
          </div>

        </main>

      </div>

      {/* Success Modal upon submission */}
      {submittedData && (
        <ComplaintSuccess
          complaintId={submittedData.id}
          priority={submittedData.priority}
          title={submittedData.title}
          category={submittedData.category}
          department={submittedData.department}
          confidence={submittedData.confidence}
        />
      )}

    </div>
  );
}
