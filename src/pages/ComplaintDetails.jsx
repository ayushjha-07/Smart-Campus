import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Info, 
  Check, 
  Sparkles, 
  X
} from 'lucide-react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ComplaintHeader from '../components/complaintDetails/ComplaintHeader';
import ComplaintSummary from '../components/complaintDetails/ComplaintSummary';
import ComplaintDescription from '../components/complaintDetails/ComplaintDescription';
import ComplaintAttachment from '../components/complaintDetails/ComplaintAttachment';
import AIAnalysisCard from '../components/complaintDetails/AIAnalysisCard';
import ComplaintTimeline from '../components/complaintDetails/ComplaintTimeline';
import ResolutionProgress from '../components/complaintDetails/ResolutionProgress';
import StatusHistory from '../components/complaintDetails/StatusHistory';
import LatestUpdate from '../components/complaintDetails/LatestUpdate';
import StudentActions from '../components/complaintDetails/StudentActions';
import FeedbackSection from '../components/complaintDetails/FeedbackSection';
import RelatedComplaints from '../components/complaintDetails/RelatedComplaints';
import ComplaintInfoPanel from '../components/complaintDetails/ComplaintInfoPanel';
import ContactDepartmentModal from '../components/complaintDetails/ContactDepartmentModal';
import AdditionalInformationModal from '../components/complaintDetails/AdditionalInformationModal';
import ImagePreviewModal from '../components/complaintDetails/ImagePreviewModal';
import { getComplaintById } from '../data/mockComplaints';
import { complaintApi } from '../services/complaintApi';
import { mapComplaint } from '../utils/mapper';
import { dataSource } from '../services/dataSource';
import { ComplaintDetailsSkeleton } from '../components/common/Skeletons';
import ApiErrorState from '../components/common/ApiErrorState';

export default function ComplaintDetails() {
  const { id } = useParams();
  return <ComplaintDetailsContent key={id} id={id} />;
}

function ComplaintDetailsContent({ id }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Complaint state, loading, and error states
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Interactive modal states
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAddInfoModalOpen, setIsAddInfoModalOpen] = useState(false);
  const [showNotificationBanner, setShowNotificationBanner] = useState(true);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState(null);

  const timelineRef = useRef(null);

  const fetchComplaintData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (dataSource.isMockMode()) {
        const mock = getComplaintById(id);
        if (!mock) throw new Error(`Complaint ${id} not found in mock store.`);
        setComplaint(mock);
      } else {
        const res = await complaintApi.getComplaint(id);
        setComplaint(mapComplaint(res));
      }
    } catch (err) {
      console.error('Error fetching complaint details:', err);
      // Fallback to mock data if exists
      const fallback = getComplaintById(id);
      if (fallback) {
        setComplaint(fallback);
      } else {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaintData();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (complaint) {
      document.title = `${complaint.id} - ${complaint.title} | Smart Campus`;
    }
  }, [complaint]);

  // Toast notification helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Track status action: scrolls to timeline section smoothly
  const handleTrackStatus = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    showToast('Live tracking status updated');
  };

  // Additional information submitted
  const handleAddInfoSubmit = async (noteText) => {
    try {
      if (!dataSource.isMockMode() && complaint) {
        await complaintApi.addUpdate(complaint.rawId || complaint.id, {
          message: noteText,
          is_internal: false
        });
      }
      const newLog = {
        id: Date.now(),
        dateTime: 'Just now',
        status: complaint.status,
        updatedBy: 'Complainant Student',
        remarks: noteText,
      };

      setComplaint((prev) => ({
        ...prev,
        statusHistory: [...(prev.statusHistory || []), newLog],
        latestUpdate: {
          text: `Student added note: "${noteText}"`,
          updatedAt: 'Just now',
          staffName: 'You (Student)',
          staffAvatar: 'ST',
          role: 'Complainant Student',
        },
      }));

      showToast('Supplemental information logged to audit history');
    } catch (err) {
      console.error('Failed to add update:', err);
      showToast(err.message || 'Failed to submit additional note');
    }
  };

  // Direct message sent to department
  const handleDepartmentMessageSent = () => {
    showToast(`Inquiry dispatched to ${complaint.assignedStaff || 'Maintenance Dept'}`);
  };

  // Download official complaint report text file
  const handleDownloadReport = () => {
    const reportText = `
============================================================
SMART CAMPUS COMPLAINT & ANALYTICS SYSTEM
OFFICIAL COMPLAINT STATUS REPORT
============================================================
Complaint ID        : ${complaint.id}
Title               : ${complaint.title}
Category            : ${complaint.category}
Priority            : ${complaint.priority}
Current Status      : ${complaint.status}
Resolution Progress : ${complaint.resolutionProgress}%
Submitted Date      : ${complaint.submittedDate}
Last Updated        : ${complaint.lastUpdated}
Campus Location     : ${complaint.location}

ASSIGNED PERSONNEL:
Department          : ${complaint.department}
Assigned Staff      : ${complaint.assignedStaff} (${complaint.staffRole})
Contact Email       : ${complaint.departmentEmail}
Helpline            : ${complaint.departmentPhone}

COMPLAINT DESCRIPTION:
${complaint.description}

AI AUTOMATED CLASSIFICATION:
Detected Category   : ${complaint.aiAnalysis?.category || complaint.category}
Detected Priority   : ${complaint.aiAnalysis?.priority || complaint.priority}
Confidence Score    : ${complaint.aiAnalysis?.confidence || 90}%
Keywords            : ${(complaint.aiAnalysis?.keywords || []).join(', ')}
Assessment Reason   : ${complaint.aiAnalysis?.reason || 'Standard campus maintenance workflow.'}

CHRONOLOGICAL STATUS HISTORY:
${(complaint.statusHistory || []).map(h => `[${h.dateTime}] ${h.status} - By ${h.updatedBy}: ${h.remarks}`).join('\n')}

LATEST VERIFIED NOTE:
"${complaint.latestUpdate?.text || 'Team actively investigating.'}"
Updated: ${complaint.latestUpdate?.updatedAt || complaint.lastUpdated}

============================================================
Generated from Smart Campus Portal: ${new Date().toLocaleString()}
============================================================
    `.trim();

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SmartCampus_Complaint_${complaint.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Downloaded status report for ${complaint.id}`);
  };

  // Download supporting evidence image
  const handleDownloadImage = () => {
    if (complaint.attachment?.url) {
      const link = document.createElement('a');
      link.href = complaint.attachment.url;
      link.download = complaint.attachment.name || 'hostel-water-issue.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Downloaded supporting evidence image');
    }
  };

  // Feedback submit handler
  const handleFeedbackSubmit = () => {
    showToast('Feedback submitted successfully. Thank you!');
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] dark:bg-[#050D12] text-[#14213D] dark:text-[#F5F5F0] flex antialiased">
      
      {/* Sidebar with active link on "My Complaints" */}
      <DashboardSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[280px]">
        
        {/* Sticky Dashboard Header */}
        <DashboardHeader
          onToggleMobile={() => setMobileSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Scrollable Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {loading ? (
            <ComplaintDetailsSkeleton />
          ) : error && !complaint ? (
            <ApiErrorState error={error} onRetry={fetchComplaintData} />
          ) : complaint ? (
            <>
              {/* Top Page Header (Breadcrumbs, Title, Back & Download buttons) */}
              <ComplaintHeader
                complaintId={complaint.id}
                onDownloadReport={handleDownloadReport}
              />

          {/* Green/Gold Notification Banner */}
          {showNotificationBanner && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-gradient-to-r dark:from-[#315C3A]/25 dark:via-[#13242E] dark:to-[#315C3A]/25 border border-emerald-200 dark:border-[#315C3A]/60 flex items-center justify-between gap-3 text-xs animate-fadeIn">
              <div className="flex items-center gap-2.5 text-[#14213D] dark:text-[#F5F5F0]">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-[#315C3A] text-[#168A5B] dark:text-[#D4A84F] flex items-center justify-center shrink-0">
                  <Info className="w-3.5 h-3.5" />
                </div>
                <span>
                  Your complaint is currently being handled by the{' '}
                  <strong className="text-[#168A5B] dark:text-[#D4A84F]">{complaint.department}</strong>.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowNotificationBanner(false)}
                className="text-[#64748B] dark:text-[#A8B3B0] hover:text-[#14213D] dark:hover:text-[#F5F5F0] p-1 rounded-lg hover:bg-emerald-100/50 dark:hover:bg-[#07121A] transition-colors shrink-0"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Main 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Left Primary Column (Takes 2 cols on lg) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Complaint Summary Main Card */}
              <ComplaintSummary complaint={complaint} />

              {/* Mobile Info Panel: shows right under summary on screens < lg */}
              <div className="block lg:hidden">
                <ComplaintInfoPanel
                  complaint={complaint}
                  onOpenContactModal={() => setIsContactModalOpen(true)}
                />
              </div>

              {/* Complaint Description */}
              <ComplaintDescription description={complaint.description} />

              {/* Supporting Evidence Attachment */}
              <ComplaintAttachment
                attachment={complaint.attachment}
                onViewImage={() => setIsImageModalOpen(true)}
                onDownloadImage={handleDownloadImage}
              />

              {/* Status Tracking: Timeline (Horizontal on desktop, Vertical on mobile) */}
              <div ref={timelineRef}>
                <ComplaintTimeline timeline={complaint.timeline} />
              </div>

              {/* Progress Bar */}
              <ResolutionProgress
                progress={complaint.resolutionProgress}
                status={complaint.status}
              />

              {/* AI Analysis Card */}
              <AIAnalysisCard aiAnalysis={complaint.aiAnalysis} />

              {/* Latest Admin/Staff Update */}
              <LatestUpdate
                latestUpdate={complaint.latestUpdate}
                staffName={complaint.assignedStaff}
                staffRole={complaint.staffRole}
              />

              {/* Chronological Status History */}
              <StatusHistory statusHistory={complaint.statusHistory} />

              {/* Student Action Buttons */}
              <StudentActions
                onTrackStatus={handleTrackStatus}
                onOpenContactModal={() => setIsContactModalOpen(true)}
                onOpenAddInfoModal={() => setIsAddInfoModalOpen(true)}
              />

              {/* Feedback Section (Active if Resolved, Locked if In Progress) */}
              <FeedbackSection
                status={complaint.status}
                onFeedbackSubmit={handleFeedbackSubmit}
              />

              {/* Related Complaints */}
              <RelatedComplaints relatedComplaints={complaint.relatedComplaints} />

            </div>

            {/* Right Secondary Column (Takes 1 col on lg, hidden on small screens because rendered above) */}
            <div className="hidden lg:block space-y-6 sticky top-24">
              <ComplaintInfoPanel
                complaint={complaint}
                onOpenContactModal={() => setIsContactModalOpen(true)}
              />

              {/* Campus Resolution Guarantee Tip */}
              <div className="p-5 rounded-3xl bg-white dark:bg-[#0D1B22]/80 border border-[#DDE7E2] dark:border-white/5 space-y-2 text-xs text-[#64748B] dark:text-[#A8B3B0] shadow-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#168A5B] dark:text-[#D4A84F]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Resolution Protocol</span>
                </div>
                <p className="leading-relaxed text-[11px]">
                  All campus tickets undergo automated AI routing and supervisor inspection. Average turnaround time for High Priority maintenance issues is 24 hours.
                </p>
              </div>
            </div>

          </div>
            </>
          ) : null}

        </main>
      </div>

      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-[#0D1B22] border border-[#DDE7E2] dark:border-[#315C3A] text-xs font-semibold text-[#14213D] dark:text-[#F5F5F0] shadow-2xl animate-fadeIn">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Contact Department Modal */}
      {complaint && (
        <ContactDepartmentModal
          complaint={complaint}
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          onMessageSent={handleDepartmentMessageSent}
        />
      )}

      {/* Additional Information Modal */}
      {complaint && (
        <AdditionalInformationModal
          isOpen={isAddInfoModalOpen}
          complaintId={complaint.id}
          onClose={() => setIsAddInfoModalOpen(false)}
          onSubmitUpdate={handleAddInfoSubmit}
        />
      )}

      {/* Image Preview Modal */}
      {complaint && (
        <ImagePreviewModal
          isOpen={isImageModalOpen}
          attachment={complaint.attachment}
          onClose={() => setIsImageModalOpen(false)}
          onDownload={handleDownloadImage}
        />
      )}

    </div>
  );
}
