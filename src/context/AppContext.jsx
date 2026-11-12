import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USERS,
  INITIAL_PROJECTS,
  INITIAL_APPLICATIONS,
  INITIAL_REVIEWS,
  INITIAL_MESSAGES
} from '../data/seedData';
import { calculateMatchScore } from '../utils/matchingAlgorithm';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Load from localStorage or seed
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('prilans_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('prilans_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Student Akmal by default
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('prilans_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('prilans_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('prilans_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('prilans_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  // Navigation & Active View State
  const [currentView, setCurrentView] = useState('find-projects'); // 'find-projects' | 'find-students' | 'my-projects' | 'my-proposals' | 'messages' | 'admin' | 'profile'

  // Filter state for Project Marketplace (Matching Image 2 UI)
  const [filters, setFilters] = useState({
    searchQuery: '',
    location: '',
    category: 'All',
    experienceLevel: 'Any', // 'Any' | 'Entry Level' | 'Intermediate' | 'Expert'
    projectType: 'All', // 'All' | 'Hourly' | 'Fixed Price'
    budgetRange: 'Any', // 'Any' | 'Less than $100' | '$100 to $500' | '$500 to $1k' | '$1k to $5k' | '$5k+'
    proposalsRange: 'Any', // 'Any' | 'Less than 5' | '5 to 10' | '10 to 15' | '15 to 20'
    sortBy: 'Newest', // 'Newest' | 'Highest Budget' | 'Most Proposals' | 'Best Skill Match'
    viewMode: 'grid', // 'grid' | 'list'
  });

  // Modals
  const [activeModal, setActiveModal] = useState(null); // 'apply' | 'postJob' | 'projectDetails' | 'editProfile' | 'addPortfolio' | 'submitReview' | 'talentMatcher' | 'authModal'
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reviewTargetApp, setReviewTargetApp] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('prilans_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('prilans_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('prilans_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('prilans_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('prilans_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('prilans_messages', JSON.stringify(messages));
  }, [messages]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Switch role / user
  const switchUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      showToast(`Switched account to: ${user.name} (${user.role.toUpperCase()})`);
      if (user.role === 'admin' && currentView !== 'admin') {
        setCurrentView('admin');
      } else if (user.role === 'client' && currentView === 'my-proposals') {
        setCurrentView('my-projects');
      } else if (user.role === 'student' && currentView === 'my-projects') {
        setCurrentView('find-projects');
      }
    }
  };

  // Auth: Register User
  const registerUser = (userData) => {
    const newUser = {
      id: `user-${userData.role}-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0,
      completedProjectsCount: 0,
      skills: [],
      portfolio: [],
      avatar: userData.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData.name)}`,
      ...userData,
    };
    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    showToast(`Welcome ${newUser.name}! Your ${newUser.role} account has been created.`);
    return newUser;
  };

  // Auth: Login User
  const loginUser = (email, role) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      showToast(`Welcome back, ${user.name}!`);
      return true;
    } else {
      showToast(`No account found with ${email}. Please check details or register.`, 'error');
      return false;
    }
  };

  // Update User Profile
  const updateUserProfile = (userId, updatedFields) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const updated = { ...u, ...updatedFields };
        if (currentUser.id === userId) {
          setCurrentUser(updated);
        }
        return updated;
      }
      return u;
    }));
    showToast('Profile updated successfully!');
  };

  // Add Portfolio Item to Student Profile
  const addPortfolioItem = (studentId, item) => {
    const newPort = {
      id: `port-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      ...item,
    };
    setUsers(prev => prev.map(u => {
      if (u.id === studentId) {
        const updatedPort = [newPort, ...(u.portfolio || [])];
        const updated = { ...u, portfolio: updatedPort };
        if (currentUser.id === studentId) setCurrentUser(updated);
        return updated;
      }
      return u;
    }));
    showToast('Portfolio item added successfully!');
  };

  // Delete Portfolio Item
  const deletePortfolioItem = (studentId, portId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === studentId) {
        const updatedPort = (u.portfolio || []).filter(p => p.id !== portId);
        const updated = { ...u, portfolio: updatedPort };
        if (currentUser.id === studentId) setCurrentUser(updated);
        return updated;
      }
      return u;
    }));
    showToast('Portfolio item removed.');
  };

  // Publish a Project / Job Request (Client)
  const createProject = (projectData) => {
    const newProject = {
      id: `proj-${Date.now()}`,
      clientId: currentUser.id,
      clientName: currentUser.name || currentUser.company || 'Verified Client',
      location: currentUser.location || 'United States',
      countryCode: currentUser.countryCode || 'US',
      verified: true,
      postedTime: 'Just now',
      hiringStatus: 'Still Selecting',
      proposalsCount: 0,
      status: 'open',
      ...projectData,
    };
    setProjects(prev => [newProject, ...prev]);
    showToast('Project published successfully! It is now live in the marketplace.');
    return newProject;
  };

  // Delete / Moderate Project
  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    showToast('Project deleted.');
  };

  // Apply for a Project (Student)
  const submitApplication = ({ projectId, proposedRate, deliveryDays, coverLetter, portfolioSamples }) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return false;

    // Check duplicate application
    const existing = applications.find(a => a.projectId === projectId && a.studentId === currentUser.id);
    if (existing) {
      showToast('You have already applied for this project!', 'error');
      return false;
    }

    const match = calculateMatchScore(currentUser.skills || [], project.requiredSkills || []);

    const newApp = {
      id: `app-${Date.now()}`,
      projectId,
      projectTitle: project.title,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      studentAvatar: currentUser.avatar,
      proposedRate: Number(proposedRate),
      rateType: project.type === 'Hourly' ? 'hourly' : 'fixed',
      deliveryDays: Number(deliveryDays),
      coverLetter,
      portfolioSamples: portfolioSamples || [],
      appliedAt: new Date().toISOString(),
      status: 'Submitted',
      matchScore: match.score,
      clientFeedback: 'Application under preliminary review.',
    };

    setApplications(prev => [newApp, ...prev]);

    // Update proposal count on project
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return { ...p, proposalsCount: (p.proposalsCount || 0) + 1 };
      }
      return p;
    }));

    showToast('Application submitted successfully! Track status in "My Proposals".');
    return newApp;
  };

  // Project Application Status Updates (Client / Admin)
  const updateApplicationStatus = (appId, newStatus, feedback = '') => {
    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          status: newStatus,
          clientFeedback: feedback || a.clientFeedback,
        };
      }
      return a;
    }));

    showToast(`Application status updated to "${newStatus}"`);
  };

  // Rating and Review System (Client rates Student or vice versa)
  const submitReview = ({ projectId, projectTitle, studentId, studentName, rating, comment }) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      projectId,
      projectTitle,
      studentId,
      studentName,
      clientId: currentUser.id,
      clientName: currentUser.name || currentUser.company,
      rating: Number(rating),
      comment,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };

    setReviews(prev => [newRev, ...prev]);

    // Recalculate student average rating
    setUsers(prev => prev.map(u => {
      if (u.id === studentId) {
        const studentRevs = [newRev, ...reviews.filter(r => r.studentId === studentId)];
        const avg = (studentRevs.reduce((acc, r) => acc + r.rating, 0) / studentRevs.length).toFixed(1);
        const updated = {
          ...u,
          rating: Number(avg),
          reviewsCount: studentRevs.length,
          completedProjectsCount: (u.completedProjectsCount || 0) + 1,
        };
        if (currentUser.id === studentId) setCurrentUser(updated);
        return updated;
      }
      return u;
    }));

    showToast('Review and 5-star rating submitted successfully!');
  };

  // Direct Message
  const sendMessage = ({ toId, toName, projectTitle, content }) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      fromId: currentUser.id,
      fromName: currentUser.name || currentUser.company,
      toId,
      toName,
      projectTitle,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setMessages(prev => [newMsg, ...prev]);
    showToast(`Message sent to ${toName}!`);
  };

  // Reset to initial demo state
  const resetDemoData = () => {
    localStorage.removeItem('prilans_users');
    localStorage.removeItem('prilans_current_user');
    localStorage.removeItem('prilans_projects');
    localStorage.removeItem('prilans_applications');
    localStorage.removeItem('prilans_reviews');
    localStorage.removeItem('prilans_messages');
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[0]);
    setProjects(INITIAL_PROJECTS);
    setApplications(INITIAL_APPLICATIONS);
    setReviews(INITIAL_REVIEWS);
    setMessages(INITIAL_MESSAGES);
    showToast('Platform reset to default capstone demo state.');
  };

  return (
    <AppContext.Provider
      value={{
        users,
        currentUser,
        switchUser,
        registerUser,
        loginUser,
        updateUserProfile,
        addPortfolioItem,
        deletePortfolioItem,
        projects,
        createProject,
        deleteProject,
        applications,
        submitApplication,
        updateApplicationStatus,
        reviews,
        submitReview,
        messages,
        sendMessage,
        filters,
        setFilters,
        currentView,
        setCurrentView,
        activeModal,
        setActiveModal,
        selectedProject,
        setSelectedProject,
        selectedStudent,
        setSelectedStudent,
        reviewTargetApp,
        setReviewTargetApp,
        toastMessage,
        showToast,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
