/**
 * Seed Data for Prilans Student Talent Marketplace
 * Reflects exact UI from Course SE331 Mockup
 */

export const INITIAL_USERS = [
  {
    id: 'user-student-1',
    name: 'Akmal Nasrulloh',
    email: 'akmalnasrulloh@gmail.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    university: 'Faculty of Science and Information Technology (FSIT)',
    department: 'Dept. of Software Engineering',
    studentId: 'SE-2023-7841',
    headline: 'Full-Stack Developer & UI/UX Designer',
    bio: 'Passionate 3rd-year Software Engineering student dedicated to crafting responsive web applications, sleek Figma mockups, and modern frontend experiences.',
    hourlyRate: 20,
    experienceLevel: 'Intermediate',
    availability: 'Part-Time (20 hrs/week)',
    rating: 4.9,
    reviewsCount: 14,
    completedProjectsCount: 8,
    skills: [
      'UI Design',
      'Web Design',
      'Landing Page',
      'Web Development',
      'WordPress',
      'React',
      'Tailwind CSS',
      'Figma'
    ],
    github: 'https://github.com/MuzahidRezwan',
    portfolioUrl: 'https://akmal.design',
    portfolio: [
      {
        id: 'port-1',
        title: 'EduTrack - Student Learning Portal',
        category: 'Web Development',
        description: 'A comprehensive LMS portal featuring live attendance, grade calculators, and responsive assignment submissions.',
        liveUrl: 'https://edutrack-demo.vercel.app',
        githubUrl: 'https://github.com/MuzahidRezwan/edutrack',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
        tags: ['React', 'Tailwind CSS', 'Vite', 'Node.js'],
        date: 'October 2026'
      },
      {
        id: 'port-2',
        title: 'FinFlow - Minimalist SaaS Landing Page',
        category: 'UI/UX Design',
        description: 'Figma wireframes to production-ready landing page for a modern fintech dashboard with high conversion rate.',
        liveUrl: 'https://finflow.preview.site',
        githubUrl: 'https://github.com/MuzahidRezwan/finflow',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
        tags: ['Figma', 'UI Design', 'Landing Page', 'Web Design'],
        date: 'September 2026'
      },
      {
        id: 'port-3',
        title: 'Artisan Bakery E-Commerce Shop',
        category: 'WordPress',
        description: 'Complete custom WooCommerce shop with custom cart drawer, menu layout, and Stripe checkout integration.',
        liveUrl: 'https://artisan-bakery.example.com',
        githubUrl: '',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
        tags: ['WordPress', 'Web Design', 'Responsive Design'],
        date: 'August 2026'
      }
    ]
  },
  {
    id: 'user-student-2',
    name: 'Sarah Chen',
    email: 'sarah.chen@university.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    university: 'School of Computing & Data Science',
    department: 'Computer Science',
    studentId: 'CS-2024-1102',
    headline: 'Creative Graphic Designer & Brand Specialist',
    bio: 'Visual communicator with over 3 years of digital illustration and branding experience. Proven track record helping startups build memorable identities.',
    hourlyRate: 25,
    experienceLevel: 'Expert',
    availability: 'Freelance (15 hrs/week)',
    rating: 5.0,
    reviewsCount: 19,
    completedProjectsCount: 12,
    skills: [
      'Adobe Photoshop',
      'Figma',
      'Prototyping',
      'Logo Design',
      'Graphic Design',
      'UI Design'
    ],
    github: 'https://github.com',
    portfolioUrl: 'https://sarahchen.art',
    portfolio: [
      {
        id: 'port-4',
        title: 'Brand Identity for Apex Robotics',
        category: 'Graphic Design',
        description: 'Complete logo suite, color typography guidelines, and vector icon system for autonomous drone startup.',
        liveUrl: 'https://behance.net/sample',
        githubUrl: '',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=80',
        tags: ['Logo Design', 'Graphic Design', 'Adobe Photoshop'],
        date: 'July 2026'
      }
    ]
  },
  {
    id: 'user-student-3',
    name: 'Tariq Al-Mansoor',
    email: 'tariq.mansoor@student.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    university: 'Dept. of Software Engineering',
    department: 'Software Engineering',
    studentId: 'SE-2023-3901',
    headline: 'Python, AI & Data Science Enthusiast',
    bio: 'Junior software engineer specializing in backend REST APIs, machine learning pipelines, and interactive data visualization dashboards.',
    hourlyRate: 18,
    experienceLevel: 'Entry Level',
    availability: 'Part-Time (10 hrs/week)',
    rating: 4.8,
    reviewsCount: 6,
    completedProjectsCount: 4,
    skills: [
      'Python',
      'Data Visualization',
      'Web Development',
      'FastAPI',
      'Pandas',
      'React'
    ],
    github: 'https://github.com',
    portfolioUrl: '',
    portfolio: []
  },
  {
    id: 'user-client-1',
    name: 'HAV Media Group',
    email: 'contact@havmedia.de',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80',
    company: 'HAV Creative Agency',
    location: 'Germany',
    countryCode: 'DE',
    verified: true,
    rating: 4.9,
    totalSpent: '$14,200',
    projectsPosted: 12
  },
  {
    id: 'user-client-2',
    name: 'NextLevel Academics',
    email: 'hiring@nextlevelcourses.com',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    company: 'NextLevel Education LLC',
    location: 'United States',
    countryCode: 'US',
    verified: true,
    rating: 5.0,
    totalSpent: '$8,950',
    projectsPosted: 7
  },
  {
    id: 'user-admin-1',
    name: 'Prof. Dennis Vance',
    email: 'admin.director@university.edu',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    title: 'Department Head & SE331 Course Coordinator',
    university: 'Faculty of Science & IT'
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    title: "Let's Collaborate on HAV's Website Redesign",
    clientId: 'user-client-1',
    clientName: 'HAV Media Group',
    location: 'Germany',
    countryCode: 'DE',
    verified: true,
    experienceLevel: 'Entry Level',
    postedTime: '15 mins ago',
    hiringStatus: 'Still Selecting',
    category: 'Web Development',
    type: 'Hourly',
    rate: 15.00,
    budgetRange: 'Less than $100',
    proposalsCount: 16,
    description: 'We are looking for a creative person who can redesign & build beautiful landing pages in WordPress sites. Perfect for a university student looking to build a real-world agency portfolio.',
    requiredSkills: [
      'UI Design',
      'Web Design',
      'Landing Page',
      'Web Development',
      'WordPress',
      'Graphic Design'
    ],
    deadline: '2 weeks',
    status: 'open'
  },
  {
    id: 'proj-2',
    title: 'Build/Edit Landing Page for Online Course',
    clientId: 'user-client-2',
    clientName: 'NextLevel Academics',
    location: 'United States',
    countryCode: 'US',
    verified: true,
    experienceLevel: 'Entry Level',
    postedTime: '20 mins ago',
    hiringStatus: 'Still Selecting',
    category: 'UI/UX Design',
    type: 'Hourly',
    rate: 20.00,
    budgetRange: 'Less than $100',
    proposalsCount: 20,
    description: 'Have a current landing page for my website/course already. Can either edit that one for my new course or make a new one. Needs high visual appeal and clear CTA hierarchy.',
    requiredSkills: [
      'Website Redesign',
      'Web Design',
      'Landing Page',
      'Graphic Design',
      'Logo Design',
      'UI/UX'
    ],
    deadline: '10 days',
    status: 'open'
  },
  {
    id: 'proj-3',
    title: 'Web Designer for E-Commerce Website',
    clientId: 'user-client-1',
    clientName: 'Bengal Artisan Craft',
    location: 'Bangladesh',
    countryCode: 'BD',
    verified: true,
    experienceLevel: 'Intermediate',
    postedTime: '25 mins ago',
    hiringStatus: 'Still Selecting',
    category: 'Web Development',
    type: 'Hourly',
    rate: 25.00,
    budgetRange: 'Less than $100',
    proposalsCount: 16,
    description: 'Install new e-commerce responsive WordPress theme, Redesign menu, layout and create pages and posts. Seeking an ambitious computer science or software engineering student.',
    requiredSkills: [
      'Web Design',
      'Responsive Design',
      'Web Development',
      'WordPress'
    ],
    deadline: '3 weeks',
    status: 'open'
  },
  {
    id: 'proj-4',
    title: 'Website Designer',
    clientId: 'user-client-2',
    clientName: 'Kodiak Cloud Systems',
    location: 'Canada',
    countryCode: 'CA',
    verified: true,
    experienceLevel: 'Expert',
    postedTime: '53 mins ago',
    hiringStatus: 'Still Selecting',
    category: 'UI/UX Design',
    type: 'Hourly',
    rate: 50.00,
    budgetRange: 'Less than $100',
    proposalsCount: 19,
    description: "We're looking for a website designer who can help us redesign our company website, we prefer based designs using Figma with clean component architecture and interactive prototypes.",
    requiredSkills: [
      'Web Design',
      'Adobe Photoshop',
      'Figma',
      'Prototyping',
      'Logo Design'
    ],
    deadline: '1 month',
    status: 'open'
  },
  {
    id: 'proj-5',
    title: 'Mobile App UI/UX Design for Student Fitness Tracker',
    clientId: 'user-client-1',
    clientName: 'PulseFit Tech',
    location: 'United Kingdom',
    countryCode: 'GB',
    verified: true,
    experienceLevel: 'Intermediate',
    postedTime: '2 hours ago',
    hiringStatus: 'Still Selecting',
    category: 'UI/UX Design',
    type: 'Fixed Price',
    rate: 450.00,
    budgetRange: '$100 to $500',
    proposalsCount: 8,
    description: 'Design 12 modern mobile screens in Figma for a student workout & water tracking mobile app. Includes dark mode variations and design tokens.',
    requiredSkills: [
      'Figma',
      'UI Design',
      'Prototyping',
      'Graphic Design'
    ],
    deadline: '2 weeks',
    status: 'open'
  },
  {
    id: 'proj-6',
    title: 'Interactive Python Data Dashboard for Environmental NGO',
    clientId: 'user-client-2',
    clientName: 'GreenEarth Observatory',
    location: 'Germany',
    countryCode: 'DE',
    verified: true,
    experienceLevel: 'Entry Level',
    postedTime: '3 hours ago',
    hiringStatus: 'Still Selecting',
    category: 'AI & Data Science',
    type: 'Fixed Price',
    rate: 320.00,
    budgetRange: '$100 to $500',
    proposalsCount: 4,
    description: 'Transform CSV sensor data into clean charts using Python, Pandas, and Streamlit or Dash. Great beginner project for data science students.',
    requiredSkills: [
      'Python',
      'Data Visualization',
      'Web Development'
    ],
    deadline: '1 week',
    status: 'open'
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'app-1',
    projectId: 'proj-1',
    projectTitle: "Let's Collaborate on HAV's Website Redesign",
    studentId: 'user-student-1',
    studentName: 'Akmal Nasrulloh',
    studentEmail: 'akmalnasrulloh@gmail.com',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    proposedRate: 15.00,
    rateType: 'hourly',
    deliveryDays: 14,
    coverLetter: "Hi team! I'm a 3rd-year Software Engineering student with high proficiency in WordPress, Figma, and modern responsive layouts. I have built 8+ custom client landing pages and would love to collaborate on HAV's redesign.",
    portfolioSamples: [
      'EduTrack - Student Learning Portal',
      'FinFlow - Minimalist SaaS Landing Page'
    ],
    appliedAt: '2026-11-12T09:30:00Z',
    status: 'In Review', // 'Submitted' | 'In Review' | 'Shortlisted' | 'Accepted' | 'Declined' | 'Completed'
    matchScore: 100,
    clientFeedback: 'Profile looks very solid, reviewing portfolio live links.'
  },
  {
    id: 'app-2',
    projectId: 'proj-4',
    projectTitle: 'Website Designer',
    studentId: 'user-student-2',
    studentName: 'Sarah Chen',
    studentEmail: 'sarah.chen@university.edu',
    studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    proposedRate: 48.00,
    rateType: 'hourly',
    deliveryDays: 20,
    coverLetter: "Hello Kodiak Cloud Systems! I specialize in design systems, Figma prototyping, and clean visual branding. Please check out my Apex Robotics portfolio case study.",
    portfolioSamples: [
      'Brand Identity for Apex Robotics'
    ],
    appliedAt: '2026-11-12T08:15:00Z',
    status: 'Shortlisted',
    matchScore: 100,
    clientFeedback: 'Exceptional Figma showcase. Scheduled a video chat for Friday.'
  },
  {
    id: 'app-3',
    projectId: 'proj-2',
    projectTitle: 'Build/Edit Landing Page for Online Course',
    studentId: 'user-student-1',
    studentName: 'Akmal Nasrulloh',
    studentEmail: 'akmalnasrulloh@gmail.com',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    proposedRate: 20.00,
    rateType: 'hourly',
    deliveryDays: 7,
    coverLetter: "I've reviewed your current course layout. I can revamp the typography, optimize the mobile CTA, and ensure 95+ Google Lighthouse speed.",
    portfolioSamples: [
      'FinFlow - Minimalist SaaS Landing Page'
    ],
    appliedAt: '2026-11-11T14:20:00Z',
    status: 'Completed',
    matchScore: 83,
    clientFeedback: 'Delivered in 4 days! Outstanding design and very friendly student.'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    projectId: 'proj-2',
    projectTitle: 'Build/Edit Landing Page for Online Course',
    studentId: 'user-student-1',
    studentName: 'Akmal Nasrulloh',
    clientId: 'user-client-2',
    clientName: 'NextLevel Academics',
    rating: 5,
    comment: 'Akmal is a phenomenal student talent. He took our rough concept and created a high-converting course landing page ahead of schedule. Highly recommended!',
    date: 'November 12, 2026'
  },
  {
    id: 'rev-2',
    projectId: 'proj-legacy-1',
    projectTitle: 'Figma Mobile App Redesign',
    studentId: 'user-student-2',
    studentName: 'Sarah Chen',
    clientId: 'user-client-1',
    clientName: 'HAV Media Group',
    rating: 5,
    comment: 'Sarah’s design eye is professional agency grade. Fantastic communication throughout the project.',
    date: 'November 05, 2026'
  }
];

export const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    fromId: 'user-client-1',
    fromName: 'HAV Media Group',
    toId: 'user-student-1',
    toName: 'Akmal Nasrulloh',
    projectTitle: "HAV's Website Redesign",
    content: "Hi Akmal! We saw your proposal and really loved the EduTrack portfolio item. Are you available for a brief sync tomorrow?",
    timestamp: '2026-11-12T10:14:00Z',
    read: false
  }
];
