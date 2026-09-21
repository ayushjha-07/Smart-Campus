import React from 'react';
import { Link } from 'react-router-dom';
import campusAssets from '../../assets/campusAssets';

export default function WelcomeCard() {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-[#DDE7E2] dark:border-white/10 shadow-xl aspect-[1024/341] min-h-[170px] sm:min-h-0 bg-[#050D12] select-none transition-all">
      
      {/* 1. Exact Uploaded CGC University Hero Banner Image (100% natural, sharp, zero wash) */}
      <img
        src={campusAssets.heroBannerMaster}
        alt="Good to see you, Ayush! CGC University Mohali Campus"
        className="absolute inset-0 w-full h-full object-cover object-left sm:object-center pointer-events-none"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 2. Interactive Clickable Link Hotspots Pixel-Aligned with Image Buttons */}
      
      {/* "+ Submit Complaint" button hotspot */}
      <Link
        to="/student/complaints/new"
        title="Submit a Complaint"
        aria-label="Submit a Complaint"
        className="absolute z-10 rounded-xl cursor-pointer hover:ring-2 hover:ring-white/50 hover:bg-white/5 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
        style={{
          left: '4.4%',
          top: '66.0%',
          width: '14.4%',
          height: '18.5%',
        }}
      />

      {/* "View My Complaints" button hotspot */}
      <Link
        to="/student/complaints"
        title="View My Complaints"
        aria-label="View My Complaints"
        className="absolute z-10 rounded-xl cursor-pointer hover:ring-2 hover:ring-white/50 hover:bg-white/5 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
        style={{
          left: '19.4%',
          top: '66.0%',
          width: '15.4%',
          height: '18.5%',
        }}
      />

      {/* 3. Screen-Reader & Semantic Fallback Content */}
      <div className="sr-only">
        <span>Active Grievance SLA Monitoring</span>
        <h2>Good to see you, Ayush!</h2>
        <p>Track your complaints, report new issues, and help make your CGC campus better.</p>
        <nav aria-label="Hero Quick Actions">
          <Link to="/student/complaints/new">Submit Complaint</Link>
          <Link to="/student/complaints">View My Complaints</Link>
        </nav>
        <ul>
          <li>Clean Campus</li>
          <li>Better Facilities</li>
          <li>Quick Resolutions</li>
          <li>Stronger Community</li>
        </ul>
        <p>Your Voice / A Better Campus</p>
      </div>

    </div>
  );
}
