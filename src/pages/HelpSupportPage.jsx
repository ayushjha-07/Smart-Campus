import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  ChevronRight, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  PhoneCall, 
  Mail, 
  Building2, 
  Laptop, 
  Headphones, 
  ShieldAlert, 
  FileText, 
  ListChecks, 
  Bell, 
  User, 
  Lock, 
  Wrench, 
  PlusCircle, 
  ClipboardList, 
  LayoutDashboard, 
  HelpCircle, 
  X, 
  CheckCircle2, 
  ExternalLink,
  Copy,
  Clock,
  MapPin
} from 'lucide-react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import campusAssets from '../assets/campusAssets';
import HeroCalligraphy from '../components/common/HeroCalligraphy';

export default function HelpSupportPage() {
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');
  const [helpSearch, setHelpSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaqs, setExpandedFaqs] = useState({ 0: true }); // First FAQ open by default
  const [contactModalDept, setContactModalDept] = useState(null);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Form state for Support Request Modal
  const [supportForm, setSupportForm] = useState({
    name: 'Ayush Kumar Jha',
    email: 'ayush.jha@cgc.edu.in',
    category: 'General Complaint Query',
    priority: 'Normal',
    subject: '',
    message: ''
  });
  const [submittingRequest, setSubmittingRequest] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Help & Support | Smart Campus Complaint & Analytics";
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  // 6 Support Categories
  const categories = [
    {
      id: 'submission',
      title: 'Complaint Submission',
      desc: 'Learn how to submit a new complaint',
      icon: FileText,
      iconColor: 'text-[#00B878]',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-500/20',
      action: () => navigate('/student/complaints/new'),
    },
    {
      id: 'tracking',
      title: 'Complaint Tracking',
      desc: 'Track status and updates',
      icon: ListChecks,
      iconColor: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-500/20',
      action: () => navigate('/student/complaints'),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      desc: 'Manage your notifications',
      icon: Bell,
      iconColor: 'text-amber-500 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-500/20',
      action: () => navigate('/student/notifications'),
    },
    {
      id: 'profile',
      title: 'Account & Profile',
      desc: 'Update your profile and personal details',
      icon: User,
      iconColor: 'text-purple-500 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-500/20',
      action: () => navigate('/student/profile'),
    },
    {
      id: 'password',
      title: 'Password & Login',
      desc: 'Reset password, login issues',
      icon: Lock,
      iconColor: 'text-rose-500 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-500/20',
      action: () => {
        setHelpSearch('password');
        setActiveCategory('password');
      },
    },
    {
      id: 'technical',
      title: 'Technical Issues',
      desc: 'Report and resolve technical problems',
      icon: Wrench,
      iconColor: 'text-teal-500 dark:text-teal-400',
      bgColor: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-500/20',
      action: () => {
        setSupportForm((prev) => ({ ...prev, category: 'Technical Problem' }));
        setSupportModalOpen(true);
      },
    },
  ];

  // FAQ Data List
  const allFaqs = [
    {
      id: 'faq-1',
      category: 'submission',
      question: 'How do I submit a complaint?',
      answer: 'Navigate to "+ Submit Complaint" from the left sidebar or the dashboard action buttons. Fill out the guided 3-step form by choosing your category (Hostel, Academics, Maintenance, IT, Cleanliness), providing a descriptive title and summary, pinpointing the campus block/room, and attaching photos if necessary. Once submitted, your grievance is assigned a unique tracking ID (e.g. SC-2026-1845) with SLA timer monitoring.',
    },
    {
      id: 'faq-2',
      category: 'tracking',
      question: 'How can I track my complaint?',
      answer: 'Click on "My Complaints" in the sidebar. You will see a complete live list of all your filed grievances. Click on any complaint card to open the interactive timeline tracking view, where you can see assigned technicians, progress steps, status transitions (Under Review → Assigned → In Progress → Resolved), and maintenance notes.',
    },
    {
      id: 'faq-3',
      category: 'profile',
      question: 'How do I update my profile?',
      answer: 'Visit the "Profile" section from the sidebar navigation. You can update your emergency contact numbers, personal phone, communication preferences, and notification channels. For university records like Roll Number, Registered Email, Department, and Semester, changes must be validated by the CGC Registrar’s academic desk.',
    },
    {
      id: 'faq-4',
      category: 'notifications',
      question: 'Why am I not receiving notifications?',
      answer: 'First check the Notifications page to see if in-app alerts are appearing. If you are not receiving alerts, visit your Profile > Notification Settings and ensure SMS, Email, and Push toggles are turned on. Also verify that your email filter has not routed alerts to Spam or Promotional folders.',
    },
    {
      id: 'faq-5',
      category: 'password',
      question: 'How can I change my password?',
      answer: 'Go to Profile > Security tab. Enter your current password followed by your new password twice. Passwords must be at least 8 characters long and contain a mix of uppercase letters, numbers, and special symbols. If you are locked out or forgot your password, click "Forgot Password" on the login portal to receive a reset OTP.',
    },
    {
      id: 'faq-6',
      category: 'submission',
      question: 'What do the complaint priority levels mean?',
      answer: 'Priority levels govern the SLA escalation resolution window: Low (72h SLA for non-urgent inquiries and cosmetic fixes), Medium (48h SLA for standard maintenance like broken chairs or bulbs), High (24h SLA for critical utilities like Wi-Fi router failures or AC chillers), and Urgent/Critical (6h SLA for safety hazards, water leaks, or power trips).',
    },
  ];

  // Filtered FAQs based on search & category
  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((faq) => {
      const matchesSearch = 
        !helpSearch.trim() ||
        faq.question.toLowerCase().includes(helpSearch.toLowerCase()) ||
        faq.answer.toLowerCase().includes(helpSearch.toLowerCase());
      
      const matchesCategory = 
        activeCategory === 'all' || faq.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [helpSearch, activeCategory]);

  const toggleFaq = (index) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Contact Department Cards Data
  const contactDepartments = [
    {
      id: 'campus',
      title: 'Campus Support',
      desc: 'General queries and campus facilities',
      icon: Building2,
      iconColor: 'text-[#00B878]',
      iconBg: 'bg-emerald-100 dark:bg-emerald-950/60',
      email: 'facilities@cgc.edu.in',
      phone: '+91 172 5070 800',
      ext: 'Ext: 2104',
      hours: 'Mon - Sat: 9:00 AM - 5:00 PM',
      location: 'Block 2, Ground Floor, Central Campus'
    },
    {
      id: 'it',
      title: 'IT & Technical Support',
      desc: 'Login issues, technical problems',
      icon: Laptop,
      iconColor: 'text-blue-500 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-950/60',
      email: 'itsupport@cgc.edu.in',
      phone: '+91 172 5070 850',
      ext: 'Ext: 3108',
      hours: 'Mon - Sat: 8:30 AM - 6:30 PM',
      location: 'IT Tower, 3rd Floor, Server Room Desk'
    },
    {
      id: 'grievance',
      title: 'Complaint Assistance',
      desc: 'Help with complaint submission and tracking',
      icon: Headphones,
      iconColor: 'text-teal-600 dark:text-teal-400',
      iconBg: 'bg-teal-100 dark:bg-teal-950/60',
      email: 'grievance.cell@cgc.edu.in',
      phone: '+91 172 5070 899',
      ext: 'Ext: 1102',
      hours: 'Mon - Sat: 9:00 AM - 5:30 PM',
      location: 'Student Welfare Centre, Room 104'
    },
    {
      id: 'security',
      title: 'Emergency / Campus Security',
      desc: 'Urgent issues and safety concerns',
      icon: ShieldAlert,
      iconColor: 'text-rose-500 dark:text-rose-400',
      iconBg: 'bg-rose-100 dark:bg-rose-950/60',
      email: 'security.control@cgc.edu.in',
      phone: '+91 172 5070 999',
      ext: 'Hotline (24x7)',
      hours: '24 Hours / 7 Days a Week',
      location: 'Main University Gate 1 Control Room'
    },
  ];

  const handleSupportFormSubmit = (e) => {
    e.preventDefault();
    if (!supportForm.subject.trim() || !supportForm.message.trim()) {
      showToast('Please fill out both Subject and Message fields.');
      return;
    }
    setSubmittingRequest(true);
    setTimeout(() => {
      setSubmittingRequest(false);
      setSupportModalOpen(false);
      setSupportForm((prev) => ({ ...prev, subject: '', message: '' }));
      showToast('Support ticket #SUP-2026-0418 created! Our team will contact you shortly.');
    }, 900);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard?.writeText(text);
    showToast(`${label} copied to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] dark:bg-[#050D12] text-[#10233D] dark:text-[#F5F7F5] flex antialiased selection:bg-[#00B878] selection:text-white transition-colors duration-200">
      
      {/* 1. LEFT SIDEBAR (Standard Smart Campus Sidebar) */}
      <DashboardSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Flow */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[280px]">
        
        {/* 2. TOP HEADER */}
        <DashboardHeader
          onToggleMobile={() => setMobileSidebarOpen(true)}
          searchQuery={headerSearch}
          onSearchChange={setHeaderSearch}
        />

        {/* 3. MAIN BODY CONTAINER */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          
          {/* Breadcrumb & Page Header */}
          <div className="space-y-2">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-[#607080] dark:text-[#9AA9A6]">
              <Link
                to="/student/dashboard"
                className="inline-flex items-center gap-1.5 hover:text-[#00B878] dark:hover:text-[#10E894] transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-[#A8B3B0]" />
              <span className="font-semibold text-[#10233D] dark:text-[#F5F7F5]">
                Help & Support
              </span>
            </div>

            {/* Header Row with Right Speech Bubble */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#10233D] dark:text-[#F5F7F5] tracking-tight leading-tight">
                  Help & Support
                </h1>
                <p className="text-xs sm:text-sm text-[#607080] dark:text-[#9AA9A6] mt-1 font-medium max-w-2xl leading-relaxed">
                  Get help with complaints, account settings, notifications, and Smart Campus services.
                </p>
              </div>

              {/* Right: Friendly Support Illustration Badge matching mockup */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white dark:bg-[#0B171D] border border-[#DDE7E2] dark:border-white/10 shadow-xs shrink-0 self-start sm:self-auto">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-[#00B878] shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="pr-1">
                  <span className="font-['Dancing_Script',cursive] text-lg sm:text-xl font-bold text-[#00B878] dark:text-[#10E894] leading-none block">
                    We're here to help you!
                  </span>
                  <span className="text-[10px] text-[#607080] dark:text-[#9AA9A6] font-medium block">
                    Student Helpdesk 24/7
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* ================================================== */}
          {/* 4. HERO SUPPORT BANNER (CGC University Aerial Photo) */}
          {/* ================================================== */}
          <div className="relative rounded-3xl overflow-hidden border border-[#DDE7E2] dark:border-white/10 p-6 sm:p-7 lg:p-8 shadow-xl min-h-[220px] sm:min-h-[250px] flex items-center transition-all">
            
            {/* Campus Aerial Background */}
            <img
              src={campusAssets.aerialImage}
              alt="CGC University Mohali Aerial Campus"
              className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none"
            />

            {/* Left 45% Dark Gradient for text readability */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, rgba(4, 15, 22, 0.92) 0%, rgba(5, 22, 24, 0.85) 24%, rgba(5, 20, 24, 0.50) 40%, transparent 52%)'
              }}
            />

            {/* Foreground Content */}
            <div className="relative z-10 space-y-3.5 max-w-xl w-full">
              
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                  How can we help you?
                </h2>
                <p className="text-xs sm:text-sm text-slate-100 max-w-lg leading-relaxed font-medium drop-shadow-xs">
                  Search our help articles or browse categories to find what you need.
                </p>
              </div>

              {/* Large Search Field with Green Search Button */}
              <div className="pt-1 w-full max-w-lg">
                <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={helpSearch}
                    onChange={(e) => setHelpSearch(e.target.value)}
                    placeholder="Search help articles, FAQs, or topics..."
                    className="w-full pl-10 pr-24 py-3 rounded-2xl bg-white text-[#10233D] placeholder-slate-400 text-xs sm:text-sm font-medium border border-transparent shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00B878]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (helpSearch.trim()) {
                        showToast(`Showing results for "${helpSearch}"`);
                      }
                    }}
                    className="absolute right-1.5 px-4 py-1.5 rounded-xl bg-[#00B878] hover:bg-[#009e66] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                  >
                    Search
                  </button>
                </div>
              </div>

            </div>

            {/* Upper-Right Subtle Slogan matching Master Hero style */}
            <div className="hidden sm:block absolute top-5 right-6 lg:top-6 lg:right-9 z-10 pointer-events-none">
              <HeroCalligraphy />
            </div>

          </div>

          {/* ================================================== */}
          {/* 5. SUPPORT CATEGORIES (6 Equal Responsive Cards) */}
          {/* ================================================== */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={cat.action}
                    className={`rounded-2xl p-4 text-left transition-all duration-200 border flex flex-col justify-between group hover:-translate-y-1 hover:shadow-md cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-[#00B878] shadow-sm'
                        : 'bg-white dark:bg-[#0B171D] border-[#DDE7E2] dark:border-white/10 shadow-2xs'
                    }`}
                  >
                    <div>
                      {/* Circular Colored Icon Badge */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 border transition-transform duration-200 group-hover:scale-105 ${cat.bgColor}`}>
                        <Icon className={`w-5 h-5 ${cat.iconColor}`} />
                      </div>

                      <h3 className="text-xs sm:text-sm font-bold text-[#10233D] dark:text-[#F5F7F5] leading-snug group-hover:text-[#00B878] transition-colors">
                        {cat.title}
                      </h3>

                      <p className="text-[11px] text-[#607080] dark:text-[#9AA9A6] mt-1 leading-relaxed line-clamp-2">
                        {cat.desc}
                      </p>
                    </div>

                    <div className="pt-3 flex items-center justify-end text-slate-400 group-hover:text-[#00B878] transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================================================== */}
          {/* 6. MAIN CONTENT — TWO-COLUMN BALANCED LAYOUT */}
          {/* ================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* LEFT COLUMN: Frequently Asked Questions (Accordion) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* FAQ Section Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-[#00B878] shrink-0">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-[#10233D] dark:text-[#F5F7F5] tracking-tight">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-xs text-[#607080] dark:text-[#9AA9A6]">
                      Find quick answers to common questions.
                    </p>
                  </div>
                </div>

                {activeCategory !== 'all' || helpSearch ? (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('all');
                      setHelpSearch('');
                    }}
                    className="text-xs font-bold text-[#00B878] hover:underline cursor-pointer"
                  >
                    View All FAQs →
                  </button>
                ) : (
                  <span className="text-xs font-bold text-[#00B878]">
                    {filteredFaqs.length} Answers Available
                  </span>
                )}
              </div>

              {/* Accordion List */}
              <div className="space-y-2.5">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => {
                    const isOpen = expandedFaqs[index];

                    return (
                      <div
                        key={faq.id}
                        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                          isOpen
                            ? 'bg-white dark:bg-[#0B171D] border-[#DDE7E2] dark:border-white/15 shadow-sm'
                            : 'bg-white dark:bg-[#0B171D] border-[#DDE7E2] dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(index)}
                          className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between text-left gap-3 cursor-pointer"
                        >
                          <span className="text-xs sm:text-sm font-bold text-[#10233D] dark:text-[#F5F7F5] leading-snug">
                            {faq.question}
                          </span>
                          <span className="text-slate-400 shrink-0">
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 text-[#00B878]" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </span>
                        </button>

                        {isOpen && (
                          <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-slate-100 dark:border-white/5 text-xs text-[#607080] dark:text-[#9AA9A6] leading-relaxed animate-fadeIn">
                            <p>{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center rounded-2xl bg-white dark:bg-[#0B171D] border border-dashed border-slate-300 dark:border-white/15">
                    <p className="text-sm font-bold text-slate-500">No questions found matching "{helpSearch}".</p>
                    <button
                      type="button"
                      onClick={() => setHelpSearch('')}
                      className="mt-2 text-xs font-bold text-[#00B878] hover:underline"
                    >
                      Clear search filter
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT COLUMN: Contact Support Cards & Quick Actions */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Contact Support Header */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-[#00B878] shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-[#10233D] dark:text-[#F5F7F5] tracking-tight">
                    Contact Support
                  </h2>
                  <p className="text-xs text-[#607080] dark:text-[#9AA9A6]">
                    Reach out to the right department for assistance.
                  </p>
                </div>
              </div>

              {/* 4 Contact Cards (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {contactDepartments.map((dept) => {
                  const Icon = dept.icon;

                  return (
                    <div
                      key={dept.id}
                      className="rounded-2xl p-4 bg-white dark:bg-[#0B171D] border border-[#DDE7E2] dark:border-white/10 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-all"
                    >
                      <div>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 ${dept.iconBg}`}>
                          <Icon className={`w-4 h-4 ${dept.iconColor}`} />
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-[#10233D] dark:text-[#F5F7F5] leading-snug">
                          {dept.title}
                        </h3>
                        <p className="text-[11px] text-[#607080] dark:text-[#9AA9A6] mt-0.5 leading-tight">
                          {dept.desc}
                        </p>
                      </div>

                      <div className="pt-3 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setContactModalDept(dept)}
                          className="px-3 py-1 rounded-lg text-xs font-bold text-[#00B878] bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/20 hover:bg-[#00B878] hover:text-white transition-all cursor-pointer"
                        >
                          Contact
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Highlighted "Still need help?" Card */}
              <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-emerald-50/80 to-teal-50/50 dark:from-[#081F1A] dark:to-[#091C22] border border-emerald-200 dark:border-emerald-500/30 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00B878]/15 border border-[#00B878]/30 flex items-center justify-center text-[#00B878] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#10233D] dark:text-[#F5F7F5]">
                      Still need help?
                    </h3>
                    <p className="text-xs text-[#607080] dark:text-[#9AA9A6] mt-0.5">
                      Create a support request and our campus support team will assist you.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSupportModalOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#00B878] hover:bg-[#009e66] transition-all shadow-sm hover:-translate-y-0.5 shrink-0 cursor-pointer"
                >
                  Create Support Request →
                </button>
              </div>

              {/* Quick Navigation Action Buttons Row (3 buttons) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <Link
                  to="/student/complaints/new"
                  className="px-3 py-2.5 rounded-xl bg-white dark:bg-[#0B171D] border border-[#DDE7E2] dark:border-white/10 hover:border-[#00B878] text-[#10233D] dark:text-[#F5F7F5] font-bold text-xs flex items-center justify-center gap-2 shadow-2xs hover:-translate-y-0.5 transition-all text-center"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-[#00B878]" />
                  <span>Submit a Complaint</span>
                </Link>

                <Link
                  to="/student/complaints"
                  className="px-3 py-2.5 rounded-xl bg-white dark:bg-[#0B171D] border border-[#DDE7E2] dark:border-white/10 hover:border-[#D4A84F] text-[#10233D] dark:text-[#F5F7F5] font-bold text-xs flex items-center justify-center gap-2 shadow-2xs hover:-translate-y-0.5 transition-all text-center"
                >
                  <ClipboardList className="w-3.5 h-3.5 text-[#D4A84F]" />
                  <span>View My Complaints</span>
                </Link>

                <Link
                  to="/student/dashboard"
                  className="px-3 py-2.5 rounded-xl bg-white dark:bg-[#0B171D] border border-[#DDE7E2] dark:border-white/10 hover:border-blue-500 text-[#10233D] dark:text-[#F5F7F5] font-bold text-xs flex items-center justify-center gap-2 shadow-2xs hover:-translate-y-0.5 transition-all text-center"
                >
                  <Home className="w-3.5 h-3.5 text-blue-500" />
                  <span>Go to Dashboard</span>
                </Link>
              </div>

            </div>

          </div>

        </main>

      </div>

      {/* ================================================== */}
      {/* 7. CONTACT DEPARTMENT DETAILS MODAL */}
      {/* ================================================== */}
      {contactModalDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#0B171D] border border-[#DDE7E2] dark:border-white/10 p-6 shadow-2xl space-y-5 animate-scaleUp">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${contactModalDept.iconBg}`}>
                  <contactModalDept.icon className={`w-5 h-5 ${contactModalDept.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#10233D] dark:text-[#F5F7F5]">
                    {contactModalDept.title}
                  </h3>
                  <p className="text-xs text-[#607080] dark:text-[#9AA9A6]">
                    {contactModalDept.desc}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setContactModalDept(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Details Table */}
            <div className="space-y-3 text-xs bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5">
              
              <div className="flex items-center justify-between py-1">
                <span className="text-[#607080] dark:text-[#9AA9A6] flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#00B878]" />
                  <span>Email:</span>
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(contactModalDept.email, 'Email address')}
                  className="font-mono font-bold text-[#00B878] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{contactModalDept.email}</span>
                  <Copy className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-center justify-between py-1 border-t border-slate-200/60 dark:border-white/5">
                <span className="text-[#607080] dark:text-[#9AA9A6] flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-[#00B878]" />
                  <span>Helpline:</span>
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(contactModalDept.phone, 'Phone number')}
                  className="font-bold text-[#10233D] dark:text-[#F5F7F5] hover:text-[#00B878] flex items-center gap-1 cursor-pointer"
                >
                  <span>{contactModalDept.phone}</span>
                  <span className="text-[10px] text-slate-400">({contactModalDept.ext})</span>
                  <Copy className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-center justify-between py-1 border-t border-slate-200/60 dark:border-white/5">
                <span className="text-[#607080] dark:text-[#9AA9A6] flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#D4A84F]" />
                  <span>Hours:</span>
                </span>
                <span className="font-semibold text-[#10233D] dark:text-[#F5F7F5]">
                  {contactModalDept.hours}
                </span>
              </div>

              <div className="flex items-start justify-between py-1 border-t border-slate-200/60 dark:border-white/5">
                <span className="text-[#607080] dark:text-[#9AA9A6] flex items-center gap-2 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span>Office:</span>
                </span>
                <span className="font-semibold text-right text-[#10233D] dark:text-[#F5F7F5] max-w-[200px]">
                  {contactModalDept.location}
                </span>
              </div>

            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setContactModalDept(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                Close
              </button>

              <a
                href={`mailto:${contactModalDept.email}`}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#00B878] hover:bg-[#009e66] shadow-sm flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* 8. CREATE SUPPORT REQUEST MODAL */}
      {/* ================================================== */}
      {supportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#0B171D] border border-[#DDE7E2] dark:border-white/10 p-6 shadow-2xl space-y-4 animate-scaleUp">
            
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-black text-[#10233D] dark:text-[#F5F7F5]">
                  Create Support Request
                </h3>
                <p className="text-xs text-[#607080] dark:text-[#9AA9A6] mt-0.5">
                  Our campus helpdesk team responds to requests within 4 hours.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSupportModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Support Form */}
            <form onSubmit={handleSupportFormSubmit} className="space-y-3.5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#607080] dark:text-[#9AA9A6] mb-1">
                    Student Name
                  </label>
                  <input
                    type="text"
                    disabled
                    value={supportForm.name}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-500 font-medium cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#607080] dark:text-[#9AA9A6] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    disabled
                    value={supportForm.email}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-500 font-medium cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#607080] dark:text-[#9AA9A6] mb-1">
                    Department / Topic
                  </label>
                  <select
                    value={supportForm.category}
                    onChange={(e) => setSupportForm({ ...supportForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#07121A] border border-[#DDE7E2] dark:border-white/10 text-xs text-[#10233D] dark:text-[#F5F7F5] font-semibold focus:outline-none focus:ring-2 focus:ring-[#00B878]"
                  >
                    <option value="General Complaint Query">General Complaint Query</option>
                    <option value="Technical Problem">Technical Problem</option>
                    <option value="Password & Authentication">Password & Authentication</option>
                    <option value="Hostel & Facilities">Hostel & Facilities</option>
                    <option value="Urgent Assistance">Urgent Assistance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#607080] dark:text-[#9AA9A6] mb-1">
                    Urgency Level
                  </label>
                  <select
                    value={supportForm.priority}
                    onChange={(e) => setSupportForm({ ...supportForm, priority: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#07121A] border border-[#DDE7E2] dark:border-white/10 text-xs text-[#10233D] dark:text-[#F5F7F5] font-semibold focus:outline-none focus:ring-2 focus:ring-[#00B878]"
                  >
                    <option value="Normal">Normal (Within 24 Hours)</option>
                    <option value="High">High (Within 6 Hours)</option>
                    <option value="Urgent">Urgent (Immediate Assistance)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#607080] dark:text-[#9AA9A6] mb-1">
                  Subject / Summary <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={supportForm.subject}
                  onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                  placeholder="e.g., Cannot view complaint SC-2026-1845 updates"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#07121A] border border-[#DDE7E2] dark:border-white/10 text-xs text-[#10233D] dark:text-[#F5F7F5] font-medium focus:outline-none focus:ring-2 focus:ring-[#00B878]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#607080] dark:text-[#9AA9A6] mb-1">
                  How can we help? (Detailed Description) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={supportForm.message}
                  onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                  placeholder="Please describe the issue or question in detail..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#07121A] border border-[#DDE7E2] dark:border-white/10 text-xs text-[#10233D] dark:text-[#F5F7F5] font-medium focus:outline-none focus:ring-2 focus:ring-[#00B878]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setSupportModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submittingRequest}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#00B878] hover:bg-[#009e66] shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submittingRequest ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <span>Submit Request</span>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#07121A] text-white border border-[#00B878]/40 shadow-2xl text-xs font-semibold animate-slideUp">
          <CheckCircle2 className="w-4 h-4 text-[#00B878]" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
