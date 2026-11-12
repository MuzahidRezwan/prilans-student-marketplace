import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USERS,
  INITIAL_PROJECTS,
  INITIAL_APPLICATIONS,
  INITIAL_REVIEWS,
  INITIAL_MESSAGES
} from '../data/seedData';
import { calculateMatchScore } from '../utils/matchingAlgorithm';

// Add default passwords to initial seed users if not present
const SEED_USERS_WITH_PASSWORD = INITIAL_USERS.map(u => ({
  ...u,
  password: u.password || 'password123'
}));

const AppContext = createContext();

export function AppProvider({ children }) {
  // Load users from localStorage or seed
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('prilans_users');
    return saved ? JSON.parse(saved) : SEED_USERS_WITH_PASSWORD;
  });

  // Current logged in user (null by default if logged out)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('prilans_current_user');
    return saved ? JSON.parse(saved) : null;
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

  // Navigation state
  const [currentView, setCurrentView] = useState('find-projects');

  // Filter state
  const [filters, setFilters] = useState({
    searchQuery: '',
    location: '',
    category: 'All',
    experienceLevel: 'Any',
    projectType: 'All',
    budgetRange: 'Any',
    proposalsRange: 'Any',
    sortBy: 'Newest',
    viewMode: 'grid',
  });

  // Modals
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reviewTargetApp, setReviewTargetApp] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('prilans_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('prilans_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('prilans_current_user');
    }
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
      showToast(`Switched account to: ${user.name}`);
      if (user.role === 'admin' && currentView !== 'admin') {
        setCurrentView('admin');
      } else if (user.role === 'client' && currentView === 'my-proposals') {
        setCurrentView('my-projects');
      } else if (user.role === 'student' && currentView === 'my-projects') {
        setCurrentView('find-projects');
      }
    }
  };

  // Auth: Register / Sign Up User (saves account, then prompts user to Sign In)
  const registerUser = (userData) => {
    const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      showToast('An account with this email already exists. Please Sign In.', 'info');
      return existing;
    }

    const newUser = {
      id: `user-${userData.role}-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0,
      completedProjectsCount: 0,
      skills: [],
      portfolio: [],
      avatar: userData.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData.name)}`,
      password: userData.password || 'password123',
      ...userData,
    };

    setUsers(prev => [newUser, ...prev]);
    return newUser;
  };

  // Auth: Sign In with Email & Password
  const loginUser = (email, password) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      showToast('No account found with this email. Please click Sign Up first!', 'error');
      return false;
    }

    if (user.password && password && user.password !== password) {
      showToast('Incorrect password. Please check your credentials.', 'error');
      return false;
    }

    // Login successful
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}!`);
    if (user.role === 'admin') {
      setCurrentView('admin');
    } else if (user.role === 'client') {
      setCurrentView('my-projects');
    } else {
      setCurrentView('find-projects');
    }
    return true;
  };

  // Auth: Google Sign In / Sign Up
  const loginWithGoogle = (role = 'student') => {
    const isClient = role === 'client';
    const email = isClient ? 'client.google@gmail.com' : 'student.google@gmail.com';
    const googleUser = {
      id: `user-google-${Date.now()}`,
      name: isClient ? 'Google Business Client' : 'Google Verified Student',
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      company: isClient ? 'Google Partner Ventures' : undefined,
      industry: isClient ? 'Technology & Digital Media' : undefined,
      university: isClient ? undefined : 'Faculty of Science & IT',
      department: isClient ? undefined : 'Software Engineering',
      studentId: isClient ? undefined : 'GOOGLE-2026',
      headline: isClient ? 'Verified Client & Employer' : 'Google Verified Student Developer',
      bio: isClient ? 'Hiring student developers for web & mobile apps.' : 'Enthusiastic software engineering student.',
      hourlyRate: 22,
      experienceLevel: 'Intermediate',
      availability: 'Part-Time',
      rating: 5.0,
      reviewsCount: 0,
      completedProjectsCount: 0,
      skills: isClient ? [] : ['React', 'JavaScript', 'UI Design', 'Tailwind CSS', 'WordPress'],
      portfolio: [],
      password: 'google-oauth-token',
    };

    const existing = users.find(u => u.email === googleUser.email);
    if (existing) {
      setCurrentUser(existing);
      showToast(`Signed in with Google as ${existing.name}`);
    } else {
      setUsers(prev => [googleUser, ...prev]);
      setCurrentUser(googleUser);
      showToast('Signed up and logged in with Google successfully!');
    }
    if (role === 'client') {
      setCurrentView('my-projects');
    } else {
      setCurrentView('find-projects');
    }
    return true;
  };

  // Auth: Logout User
  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('prilans_current_user');
    setCurrentView('find-projects');
    showToast('Logged out successfully.');
  };

  // Update User Profile
  const updateUserProfile = (userId, updatedFields) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const updated = { ...u, ...updatedFields };
        if (currentUser?.id === userId) {
          setCurrentUser(updated);
        }
        return updated;
      }
      return u;
    }));
    showToast('Profile updated successfully!');
  };

  // Add Portfolio Item
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
        if (currentUser?.id === studentId) setCurrentUser(updated);
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
        if (currentUser?.id === studentId) setCurrentUser(updated);
        return updated;
      }
      return u;
    }));
    showToast('Portfolio item removed.');
  };

  // Publish a Project / Job Request
  const createProject = (projectData) => {
    const newProject = {
      id: `proj-${Date.now()}`,
      clientId: currentUser ? currentUser.id : 'user-client-1',
      clientName: currentUser ? (currentUser.name || currentUser.company) : 'Verified Client',
      location: currentUser?.location || 'United States',
      countryCode: currentUser?.countryCode || 'US',
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

  // Delete Project
  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    showToast('Project removed.');
  };

  // Apply for a Project (Always works smoothly!)
  const submitApplication = ({ projectId, proposedRate, deliveryDays, coverLetter, portfolioSamples }) => {
    if (!currentUser) {
      showToast('Please Sign In to apply for projects', 'error');
      return false;
    }

    const project = projects.find(p => p.id === projectId);
    if (!project) return false;

    const existing = applications.find(a => a.projectId === projectId && a.studentId === currentUser.id);

    // If already applied, update the proposal!
    if (existing) {
      setApplications(prev => prev.map(a => {
        if (a.id === existing.id) {
          return {
            ...a,
            proposedRate: Number(proposedRate) || a.proposedRate,
            deliveryDays: Number(deliveryDays) || a.deliveryDays,
            coverLetter: coverLetter || a.coverLetter,
            portfolioSamples: portfolioSamples || a.portfolioSamples,
            status: 'Submitted',
            appliedAt: new Date().toISOString(),
          };
        }
        return a;
      }));
      showToast('Proposal updated successfully! Check "My Proposals".');
      return existing;
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
      proposedRate: Number(proposedRate) || project.rate || 20,
      rateType: project.type === 'Hourly' ? 'hourly' : 'fixed',
      deliveryDays: Number(deliveryDays) || 7,
      coverLetter: coverLetter || "I am enthusiastic about this project and have the required skills to deliver outstanding results.",
      portfolioSamples: portfolioSamples || [],
      appliedAt: new Date().toISOString(),
      status: 'Submitted',
      matchScore: match.score,
      clientFeedback: 'Application under review.',
    };

    setApplications(prev => [newApp, ...prev]);

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return { ...p, proposalsCount: (p.proposalsCount || 0) + 1 };
      }
      return p;
    }));

    showToast('Proposal submitted successfully! Check status in "My Proposals".');
    return newApp;
  };

  // Status Updates (Shortlist, Accept, Complete)
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

    showToast(`Candidate status updated to "${newStatus}"!`);
  };

  // Review & Rating
  const submitReview = ({ projectId, projectTitle, studentId, studentName, rating, comment }) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      projectId,
      projectTitle,
      studentId,
      studentName,
      clientId: currentUser?.id,
      clientName: currentUser?.name || currentUser?.company || 'Verified Client',
      rating: Number(rating) || 5,
      comment: comment || 'Excellent work delivered on time with great communication.',
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
        if (currentUser?.id === studentId) setCurrentUser(updated);
        return updated;
      }
      return u;
    }));

    showToast('Job marked completed and 5-star review published!');
  };

  // Direct Message
  const sendMessage = ({ toId, toName, projectTitle, content }) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      fromId: currentUser ? currentUser.id : 'user-client-1',
      fromName: currentUser ? (currentUser.name || currentUser.company) : 'Client',
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
    localStorage.clear();
    setUsers(SEED_USERS_WITH_PASSWORD);
    setCurrentUser(SEED_USERS_WITH_PASSWORD[0]);
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
        loginWithGoogle,
        logoutUser,
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
