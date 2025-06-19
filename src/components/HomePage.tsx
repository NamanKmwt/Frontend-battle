import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Package, Settings, Users } from 'lucide-react';
import { clients } from '../data/clients';
import * as Icons from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'products',
      title: 'Premium Tech Products',
      description: 'Discover cutting-edge technology products that push the boundaries of innovation. From AI-powered devices to quantum computing solutions.',
      icon: Package,
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-purple-600 to-blue-600'
    },
    {
      id: 'services',
      title: 'Professional Services',
      description: 'Expert consulting and development services to transform your business with the latest technologies and industry best practices.',
      icon: Settings,
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-green-600 to-teal-600'
    },
    {
      id: 'communities',
      title: 'Tech Communities',
      description: 'Join our vibrant community of innovators, developers, and tech enthusiasts sharing insights and shaping the future.',
      icon: Users,
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-orange-600 to-red-600'
    },
    
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20" />
        
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-cyan-400/20 rounded-full"
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            TechVault
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Where Innovation Meets Excellence. Explore premium products, professional services, 
            and join a community of forward-thinking technologists.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                }}
                onHoverStart={() => setHoveredSection(section.id)}
                onHoverEnd={() => setHoveredSection(null)}
                onClick={() => onPageChange(section.id)}
                className="relative group cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${section.gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-full hover:border-cyan-500/50 transition-all duration-500">
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-4 rounded-full bg-gradient-to-r ${section.gradient} mb-6`}>
                      <section.icon size={32} className="text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-white">{section.title}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{section.description}</p>
                    
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center text-cyan-400 font-semibold"
                    >
                      Explore <ArrowRight size={20} className="ml-2" />
                    </motion.div>
                  </div>
                </div>

                {/* Floating preview on hover */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ 
                    opacity: hoveredSection === section.id ? 1 : 0,
                    scale: hoveredSection === section.id ? 1 : 0.8,
                    y: hoveredSection === section.id ? -10 : 20
                  }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 pointer-events-none"
                >
                  <div className="bg-gray-800 border border-gray-600 rounded-xl p-4 shadow-2xl">
                    <img 
                      src={section.image} 
                      alt={section.title}
                      className="w-32 h-20 object-cover rounded-lg"
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Clients Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Trusted by Industry Leaders</h2>
            <p className="text-gray-300 text-lg">Join hundreds of companies that trust TechVault</p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-8 items-center">
            {clients.map((client, index) => {
              const IconComponent = Icons[client.logo as keyof typeof Icons] as React.ComponentType<any>;
              return (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center group"
                >
                  <div className="p-4 bg-gray-700/50 rounded-xl group-hover:bg-gray-600/50 transition-colors duration-300">
                    <IconComponent size={32} className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center group-hover:text-gray-300 transition-colors duration-300">
                    {client.name}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;