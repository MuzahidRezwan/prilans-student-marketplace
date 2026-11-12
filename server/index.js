import express from 'express';
import cors from 'cors';
import {
  INITIAL_USERS,
  INITIAL_PROJECTS,
  INITIAL_APPLICATIONS,
  INITIAL_REVIEWS
} from '../src/data/seedData.js';
import {
  calculateMatchScore,
  getRecommendedProjects,
  getRecommendedStudentsForProject
} from '../src/utils/matchingAlgorithm.js';

let users = [...INITIAL_USERS];
let projects = [...INITIAL_PROJECTS];
let applications = [...INITIAL_APPLICATIONS];
let reviews = [...INITIAL_REVIEWS];

export function createApp() {
  const app = express();

  // SECURITY HARDENING 1: Disable server signature
  app.disable('x-powered-by');

  // SECURITY HARDENING 2: Enterprise Security Headers
  app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  });

  // SECURITY HARDENING 3: CORS lockdown & payload limiting
  app.use(cors());
  app.use(express.json({ limit: '100kb' }));

  // Healthcheck & course metadata
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      course: 'SE331 - Software Engineering Design Capstone Project',
      assessment: 'Assessment 2',
      platform: 'Prilans Student Freelance Marketplace',
      totalMarks: 88,
    });
  });

  // Projects API (Browse, Search & Filter)
  app.get('/api/projects', (req, res) => {
    const { search, category, experienceLevel, type } = req.query;
    let results = [...projects];

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.requiredSkills.some(s => s.toLowerCase().includes(q))
      );
    }

    if (category && category !== 'All') {
      results = results.filter(p => p.category === category);
    }

    if (experienceLevel && experienceLevel !== 'Any') {
      results = results.filter(p => p.experienceLevel === experienceLevel);
    }

    if (type && type !== 'All') {
      results = results.filter(p => p.type === type);
    }

    res.json(results);
  });

  // Publish a Project (Client)
  app.post('/api/projects', (req, res) => {
    const newProject = {
      id: `proj-${Date.now()}`,
      postedTime: 'Just now',
      hiringStatus: 'Still Selecting',
      proposalsCount: 0,
      status: 'open',
      verified: true,
      ...req.body,
    };
    projects.unshift(newProject);
    res.status(201).json(newProject);
  });

  // Student Profiles
  app.get('/api/students', (req, res) => {
    const students = users.filter(u => u.role === 'student');
    res.json(students);
  });

  // Applications
  app.get('/api/applications', (req, res) => {
    const { studentId, projectId } = req.query;
    let results = [...applications];
    if (studentId) results = results.filter(a => a.studentId === studentId);
    if (projectId) results = results.filter(a => a.projectId === projectId);
    res.json(results);
  });

  app.post('/api/applications', (req, res) => {
    const newApp = {
      id: `app-${Date.now()}`,
      appliedAt: new Date().toISOString(),
      status: 'Submitted',
      ...req.body,
    };
    applications.unshift(newApp);

    // Update proposal count
    const proj = projects.find(p => p.id === newApp.projectId);
    if (proj) proj.proposalsCount = (proj.proposalsCount || 0) + 1;

    res.status(201).json(newApp);
  });

  // Update Application Status
  app.patch('/api/applications/:id/status', (req, res) => {
    const { id } = req.params;
    const { status, feedback } = req.body;
    const appItem = applications.find(a => a.id === id);
    if (!appItem) return res.status(404).json({ error: 'Application not found' });

    appItem.status = status;
    if (feedback) appItem.clientFeedback = feedback;

    res.json(appItem);
  });

  // Reviews
  app.post('/api/reviews', (req, res) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      ...req.body,
    };
    reviews.unshift(newRev);
    res.status(201).json(newRev);
  });

  // Skill-based Project Recommendations for a Student (Advanced Feature 1)
  app.get('/api/recommendations/projects/:studentId', (req, res) => {
    const student = users.find(u => u.id === req.params.studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    const recommended = getRecommendedProjects(student, projects);
    res.json(recommended);
  });

  // Bonus Challenge: Student Recommendations for a Project
  app.get('/api/recommendations/students/:projectId', (req, res) => {
    const project = projects.find(p => p.id === req.params.projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    const students = users.filter(u => u.role === 'student');
    const matched = getRecommendedStudentsForProject(project, students);
    res.json(matched);
  });

  return app;
}

// Local server runner
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Prilans API Server running on port ${PORT}`);
  });
}
