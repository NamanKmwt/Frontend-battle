import { Service } from '../types';

export const services: Service[] = [
  {
    id: '1',
    title: 'AI Development',
    description: 'Custom AI solutions and machine learning model development for your business needs.',
    icon: 'Brain',
    features: ['Machine Learning Models', 'Neural Networks', 'Data Analysis', '24/7 Support'],
    pricing: 'Starting at $5,000',
    duration: '2-6 months'
  },
  {
    id: '2',
    title: 'Cloud Infrastructure',
    description: 'Scalable cloud solutions with enterprise-grade security and performance optimization.',
    icon: 'Cloud',
    features: ['Auto-scaling', 'Load Balancing', 'Security Monitoring', 'Backup Solutions'],
    pricing: 'Starting at $500/month',
    duration: 'Ongoing'
  },
  {
    id: '3',
    title: 'Cybersecurity',
    description: 'Comprehensive security audits and protection systems for digital assets.',
    icon: 'Shield',
    features: ['Penetration Testing', 'Vulnerability Assessment', 'Security Training', 'Incident Response'],
    pricing: 'Starting at $2,000',
    duration: '1-3 months'
  },
  {
    id: '4',
    title: 'Data Analytics',
    description: 'Transform your data into actionable insights with advanced analytics platforms.',
    icon: 'BarChart',
    features: ['Real-time Dashboards', 'Predictive Analytics', 'Data Visualization', 'Report Generation'],
    pricing: 'Starting at $3,000',
    duration: '1-4 months'
  },
  {
    id: '5',
    title: 'IoT Solutions',
    description: 'Internet of Things integration for smart devices and automated systems.',
    icon: 'Wifi',
    features: ['Device Integration', 'Sensor Networks', 'Remote Monitoring', 'Automation'],
    pricing: 'Starting at $4,000',
    duration: '2-5 months'
  },
  {
    id: '6',
    title: 'Blockchain Development',
    description: 'Secure blockchain solutions and smart contract development.',
    icon: 'Link',
    features: ['Smart Contracts', 'DApp Development', 'Token Creation', 'Security Audits'],
    pricing: 'Starting at $8,000',
    duration: '3-8 months'
  }
];