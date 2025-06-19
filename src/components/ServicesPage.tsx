import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, DollarSign, Check } from 'lucide-react';
import { services } from '../data/services';
import { Service } from '../types';
import * as Icons from 'lucide-react';

const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-teal-600 bg-clip-text text-transparent">
            Professional Services
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Transform your business with our cutting-edge technology services and expert consulting
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ComponentType<any>;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => handleServiceClick(service)}
                className="group cursor-pointer relative"
              >
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-500 h-full">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={28} className="text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Pricing and Duration */}
                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex items-center gap-2 text-green-400">
                      <DollarSign size={16} />
                      <span className="font-semibold">{service.pricing}</span>
                    </div>
                    <div className="flex items-center gap-2 text-teal-400">
                      <Clock size={16} />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                  </div>

                  {/* Features Preview */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {service.features.slice(0, 2).map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 2 && (
                        <span className="text-gray-400 text-sm">
                          +{service.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Learn More Button */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center text-green-400 font-semibold"
                  >
                    Learn More <ArrowRight size={20} className="ml-2" />
                  </motion.div>

                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-teal-600/5 rounded-2xl pointer-events-none"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6"
              onClick={closeModal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                      {(() => {
                        const IconComponent = Icons[selectedService.icon as keyof typeof Icons] as React.ComponentType<any>;
                        return <IconComponent size={28} className="text-white" />;
                      })()}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">{selectedService.title}</h2>
                      <p className="text-green-400 font-semibold">{selectedService.pricing}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white transition-colors text-2xl"
                  >
                    ×
                  </motion.button>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-3">Service Overview</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedService.description}</p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">What's Included</h3>
                  <div className="grid gap-3">
                    {selectedService.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check size={14} className="text-white" />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-3">Timeline</h3>
                  <div className="flex items-center gap-2 text-teal-400">
                    <Clock size={20} />
                    <span>{selectedService.duration}</span>
                  </div>
                </div>

                {/* How to Use */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">How It Works</h3>
                  <div className="space-y-4">
                    {[
                      'Initial consultation to understand your requirements',
                      'Detailed proposal and project timeline',
                      'Development and implementation phase',
                      'Testing, optimization, and deployment',
                      'Ongoing support and maintenance'
                    ].map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-300 pt-1">{step}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-300"
                >
                  Get Started with {selectedService.title}
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesPage;