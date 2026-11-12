import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMatchScore,
  normalizeSkill,
  getRecommendedProjects,
  getRecommendedStudentsForProject
} from '../src/utils/matchingAlgorithm.js';

test('normalizeSkill handles variations correctly', () => {
  assert.equal(normalizeSkill('React.js'), 'react');
  assert.equal(normalizeSkill('UI/UX'), 'ui design');
  assert.equal(normalizeSkill('Tailwind CSS'), 'tailwind css');
  assert.equal(normalizeSkill('WordPress'), 'wordpress');
});

test('calculateMatchScore calculates skill overlap accurately', () => {
  const studentSkills = ['React', 'Figma', 'UI Design', 'Tailwind CSS'];
  const projectSkills = ['Figma', 'UI Design', 'Landing Page', 'WordPress'];

  const result = calculateMatchScore(studentSkills, projectSkills);
  assert.equal(result.matchedSkills.length, 2);
  assert.equal(result.missingSkills.length, 2);
  assert.equal(result.score, 50); // 2 out of 4 is 50%
});

test('calculateMatchScore handles 100% match', () => {
  const studentSkills = ['Web Design', 'UI Design', 'WordPress'];
  const projectSkills = ['UI Design', 'WordPress'];

  const result = calculateMatchScore(studentSkills, projectSkills);
  assert.equal(result.score, 100);
  assert.equal(result.missingSkills.length, 0);
});

test('getRecommendedStudentsForProject ranks highest matching talent first', () => {
  const project = {
    id: 'proj-1',
    title: 'Website Redesign',
    requiredSkills: ['Figma', 'UI Design', 'Web Development'],
    experienceLevel: 'Intermediate'
  };

  const students = [
    {
      id: 's1',
      name: 'Novice Student',
      skills: ['Python'],
      rating: 4.0,
      completedProjectsCount: 1,
      portfolio: []
    },
    {
      id: 's2',
      name: 'Expert Designer',
      skills: ['Figma', 'UI Design', 'Web Development', 'Tailwind CSS'],
      rating: 5.0,
      completedProjectsCount: 4,
      portfolio: [{ id: 'p1' }, { id: 'p2' }]
    }
  ];

  const recommendations = getRecommendedStudentsForProject(project, students);
  assert.equal(recommendations.length, 2);
  assert.equal(recommendations[0].student.id, 's2');
  assert.equal(recommendations[0].matchScore, 100);
  assert.ok(recommendations[0].compositeScore > recommendations[1].compositeScore);
});
