/**
 * Skill-Based Matching and Recommendation Engine
 * SE331 Software Engineering Design Capstone Project
 * 
 * Supports:
 * 1. Skill-based project recommendations for students (Advanced Feature 1)
 * 2. Student matching recommendations for clients/projects (Bonus Challenge)
 */

// Normalize skill names for robust matching (e.g., "react.js" matches "react")
export function normalizeSkill(skill) {
  if (!skill) return '';
  const s = skill.toLowerCase().trim();
  const synonyms = {
    'reactjs': 'react',
    'react.js': 'react',
    'vuejs': 'vue',
    'vue.js': 'vue',
    'nodejs': 'node',
    'node.js': 'node',
    'nextjs': 'next.js',
    'next.js': 'next.js',
    'ui/ux': 'ui design',
    'ui design': 'ui design',
    'ux design': 'ui design',
    'web design': 'web design',
    'web development': 'web development',
    'landing page': 'landing page',
    'wordpress': 'wordpress',
    'graphic design': 'graphic design',
    'adobe photoshop': 'photoshop',
    'photoshop': 'photoshop',
    'figma': 'figma',
    'prototyping': 'prototyping',
    'tailwind': 'tailwind css',
    'tailwind css': 'tailwind css',
  };
  return synonyms[s] || s;
}

/**
 * Calculate match score between a student and a project
 */
export function calculateMatchScore(studentSkills = [], projectRequiredSkills = []) {
  if (!projectRequiredSkills.length) return { score: 100, matchedSkills: [], missingSkills: [] };
  if (!studentSkills.length) return { score: 0, matchedSkills: [], missingSkills: [...projectRequiredSkills] };

  const studentNormalized = studentSkills.map(s => normalizeSkill(typeof s === 'string' ? s : s.name));
  const matched = [];
  const missing = [];

  projectRequiredSkills.forEach(skill => {
    const norm = normalizeSkill(skill);
    if (studentNormalized.includes(norm)) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  });

  const percentage = Math.round((matched.length / projectRequiredSkills.length) * 100);

  return {
    score: percentage,
    matchedSkills: matched,
    missingSkills: missing,
  };
}

/**
 * Advanced Feature 1: Skill-based project recommendations for a student
 * Ranks all available projects by suitability for the student's skill profile
 */
export function getRecommendedProjects(student, projects = []) {
  if (!student || !student.skills) return projects;

  return projects
    .map(project => {
      const match = calculateMatchScore(student.skills, project.requiredSkills);
      let weightedScore = match.score;

      // Experience level bonus (+5% if level matches student level)
      if (student.experienceLevel && project.experienceLevel) {
        if (student.experienceLevel.toLowerCase() === project.experienceLevel.toLowerCase()) {
          weightedScore = Math.min(100, weightedScore + 5);
        }
      }

      return {
        ...project,
        matchScore: match.score,
        weightedScore,
        matchedSkills: match.matchedSkills,
        missingSkills: match.missingSkills,
      };
    })
    .sort((a, b) => b.weightedScore - a.weightedScore);
}

/**
 * Bonus Challenge (5 marks): Matching mechanism that recommends students
 * based on the skills required by a project
 */
export function getRecommendedStudentsForProject(project, students = []) {
  if (!project || !project.requiredSkills) return [];

  return students
    .map(student => {
      const match = calculateMatchScore(student.skills, project.requiredSkills);
      
      // Skill match is base (60%)
      let compositeScore = match.score * 0.6;

      // Rating boost (up to 20%)
      const rating = student.rating || 4.5;
      compositeScore += (rating / 5) * 20;

      // Portfolio & completed project bonus (up to 20%)
      const completedJobs = student.completedProjectsCount || 0;
      const portfolioItems = student.portfolio ? student.portfolio.length : 0;
      const activityScore = Math.min(20, (completedJobs * 3) + (portfolioItems * 2));
      compositeScore += activityScore;

      const finalScore = Math.min(100, Math.round(compositeScore));

      return {
        student,
        matchScore: match.score,
        compositeScore: finalScore,
        matchedSkills: match.matchedSkills,
        missingSkills: match.missingSkills,
        recommendationReason: generateRecommendationReason(match, student, project),
      };
    })
    .sort((a, b) => b.compositeScore - a.compositeScore);
}

function generateRecommendationReason(match, student, project) {
  if (match.score >= 80) {
    return `Excellent Match: Possesses ${match.matchedSkills.length} of ${project.requiredSkills.length} required skills with a high rating (${student.rating || 5.0}★).`;
  } else if (match.score >= 50) {
    return `Strong Potential: Matches core skills (${match.matchedSkills.join(', ')}) and has active portfolio projects.`;
  } else {
    return `Foundational skills in ${student.skills.slice(0, 2).map(s => typeof s === 'string' ? s : s.name).join(', ')}.`;
  }
}
