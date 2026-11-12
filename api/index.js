import express from 'express';
import cors from 'cors';

const INITIAL_PROJECTS = [
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
  }
];

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', platform: 'Prilans Student Marketplace' });
});

app.get('/api/projects', (req, res) => {
  res.json(INITIAL_PROJECTS);
});

export default app;
