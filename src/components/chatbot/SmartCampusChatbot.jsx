import React, { useState, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/useApp';
import { useAuth } from '../../context/AuthContext';
import ChatbotButton from './ChatbotButton';
import ChatbotPanel from './ChatbotPanel';
import { generateChatbotResponse } from './chatbotKnowledge';

/**
 * SmartCampusChatbot — Master floating AI assistant for the Smart Campus student portal.
 * Maintains conversation state across student routes, provides contextual answers,
 * tracks complaints in real-time, and enables functional in-app navigation.
 */
export default function SmartCampusChatbot() {
  const location = useLocation();
  const navigate = useNavigate();
  const { complaints = [], notifications = [], unreadNotificationCount = 0 } = useApp();
  const { currentUser } = useAuth();

  // Show strictly on student portal routes
  const isStudentRoute = location.pathname.startsWith('/student');

  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Dynamically resolve student greeting name from auth state / localStorage
  const studentName = 
    currentUser?.name || 
    currentUser?.first_name || 
    currentUser?.firstName || 
    currentUser?.full_name?.split(' ')[0] || 
    'Student';

  // Initial welcome message
  const initialMessages = useMemo(() => [
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Hi ${studentName}! I’m your Smart Campus Assistant. How can I help you today?`,
      timestamp: 'Just now',
      actions: [
        { label: '+ Submit a Complaint', route: '/student/complaints/new', primary: true },
        { label: 'Track My Complaints', route: '/student/complaints' },
        { label: 'Campus Help & Support', route: '/student/help-support' }
      ]
    }
  ], [studentName]);

  const [messages, setMessages] = useState(initialMessages);

  // Reset conversation to initial state
  const handleReset = useCallback(() => {
    setMessages(initialMessages);
    setIsTyping(false);
  }, [initialMessages]);

  // Handle user query submission
  const handleSendMessage = useCallback((text) => {
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Realistic brief assistant thinking delay (550ms)
    setTimeout(() => {
      const response = generateChatbotResponse(text, { complaints, notifications });
      const assistantMsg = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        complaints: response.complaints,
        actions: response.actions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 550);
  }, [complaints, notifications]);

  // Handle clicking quick suggestions
  const handleSelectQuickAction = useCallback((actionLabel) => {
    handleSendMessage(actionLabel);
  }, [handleSendMessage]);

  // Handle navigation from action cards
  const handleNavigate = useCallback((route) => {
    navigate(route);
  }, [navigate]);

  if (!isStudentRoute) {
    return null;
  }

  return (
    <>
      {/* Floating Trigger Button (displayed when panel is closed) */}
      {!isOpen && (
        <ChatbotButton
          isOpen={isOpen}
          onClick={() => setIsOpen(true)}
          unreadCount={unreadNotificationCount}
        />
      )}

      {/* Floating Chat Panel Window */}
      <ChatbotPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onMinimize={() => setIsOpen(false)}
        onReset={handleReset}
        messages={messages}
        isTyping={isTyping}
        onSendMessage={handleSendMessage}
        onSelectQuickAction={handleSelectQuickAction}
        onNavigate={handleNavigate}
      />
    </>
  );
}
