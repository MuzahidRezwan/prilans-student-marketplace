import React from 'react';
import { useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FindProjectsPage from './pages/FindProjectsPage';
import FindStudentsPage from './pages/FindStudentsPage';
import ClientProjectsPage from './pages/ClientProjectsPage';
import MyProposalsPage from './pages/MyProposalsPage';
import StudentProfilePage from './pages/StudentProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import MessagesPage from './pages/MessagesPage';
import AuthPage from './pages/AuthPage';

// Modals
import ProjectDetailsModal from './components/ProjectDetailsModal';
import ApplyModal from './components/ApplyModal';
import PostJobModal from './components/PostJobModal';
import TalentMatcherModal from './components/TalentMatcherModal';
import ReviewModal from './components/ReviewModal';

export default function App() {
  const {
    currentUser,
    currentView,
    activeModal,
    toastMessage
  } = useApp();

  // AUTHENTICATION GATE:
  // If the user is not signed in, gate the platform and display the Sign In / Sign Up page!
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
        <AuthPage />
        {toastMessage && (
          <div className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-xl text-xs font-bold text-white transition-all transform animate-in slide-in-from-bottom-5 ${
            toastMessage.type === 'error' ? 'bg-rose-600' : 'bg-slate-900'
          }`}>
            {toastMessage.message}
          </div>
        )}
      </div>
    );
  }

  // Once signed in, enter the main project platform!
  return (
    <div className="flex min-h-screen bg-slate-50/70 font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Left Sidebar (Matching Mockup in Image 2) */}
      <Sidebar />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header & Search Hero */}
        <Header />

        {/* View Router */}
        <main className="flex-1 pb-16">
          {currentView === 'find-projects' && <FindProjectsPage />}
          {currentView === 'find-students' && <FindStudentsPage />}
          {currentView === 'my-projects' && <ClientProjectsPage />}
          {currentView === 'my-proposals' && <MyProposalsPage />}
          {currentView === 'profile' && <StudentProfilePage />}
          {currentView === 'admin' && <AdminDashboardPage />}
          {currentView === 'messages' && <MessagesPage />}
        </main>
      </div>

      {/* Interactive Modals */}
      {activeModal === 'projectDetails' && <ProjectDetailsModal />}
      {activeModal === 'apply' && <ApplyModal />}
      {activeModal === 'postJob' && <PostJobModal />}
      {activeModal === 'talentMatcher' && <TalentMatcherModal />}
      {activeModal === 'submitReview' && <ReviewModal />}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-xl text-xs font-bold text-white transition-all transform animate-in slide-in-from-bottom-5 ${
          toastMessage.type === 'error' ? 'bg-rose-600' : 'bg-slate-900'
        }`}>
          {toastMessage.message}
        </div>
      )}
    </div>
  );
}
