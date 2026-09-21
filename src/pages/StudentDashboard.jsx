import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import WelcomeCard from '../components/dashboard/WelcomeCard';
import StatCardsSection from '../components/dashboard/StatCardsSection';
import ComplaintOverview from '../components/dashboard/ComplaintOverview';
import PriorityDistribution from '../components/dashboard/PriorityDistribution';
import RecentComplaints from '../components/dashboard/RecentComplaints';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import LatestNotifications from '../components/dashboard/LatestNotifications';
import CampusInsight from '../components/dashboard/CampusInsight';

export default function StudentDashboard() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Student Dashboard | Smart Campus Complaint & Analytics";
  }, []);

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

        {/* Scrollable Dashboard Body in Normal Document Flow */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          
          {/* SECTION 1: HERO / WELCOME SECTION (CGC Aerial Campus Wide Banner) */}
          <WelcomeCard />

          {/* SECTION 2: FOUR STATISTICS CARDS */}
          <StatCardsSection />

          {/* SECTION 3: ANALYTICS ROW (Complaint Overview + Priority Distribution) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            <ComplaintOverview />
            <PriorityDistribution />
          </div>

          {/* SECTION 4: RECENT COMPLAINTS TABLE (Full Width) */}
          <div className="w-full">
            <RecentComplaints />
          </div>

          {/* SECTION 5: QUICK ACTIONS (3 Action Cards) */}
          <div className="w-full">
            <QuickActions />
          </div>

          {/* SECTION 6 & 7: RECENT ACTIVITY + LATEST NOTIFICATIONS + CAMPUS INSIGHT */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-[18px] items-stretch">
            <RecentActivity />
            <LatestNotifications />
            <div className="col-span-full w-full">
              <CampusInsight />
            </div>
          </div>
        </main>
      </div>

    </div>
  );
}
