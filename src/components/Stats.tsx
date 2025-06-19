import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Calendar, Tag, ArrowLeft } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const StatsPage: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<string>('growth');
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const createRipple = (x: number, y: number) => {
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 1000);
  };

  const handleCardClick = (event: React.MouseEvent, metric: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    createRipple(x, y);
    setSelectedMetric(metric);
  };

  // Sample data
  const growthData = [
    { month: 'Jan', users: 1200, revenue: 2400, posts: 340 },
    { month: 'Feb', users: 1800, revenue: 3200, posts: 520 },
    { month: 'Mar', users: 2500, revenue: 4100, posts: 680 },
    { month: 'Apr', users: 3200, revenue: 5500, posts: 890 },
    { month: 'May', users: 4100, revenue: 7200, posts: 1240 },
    { month: 'Jun', users: 5200, revenue: 9100, posts: 1560 },
  ];

  const userEngagementData = [
    { name: 'Active Users', value: 68, color: '#ea580c' },
    { name: 'Inactive Users', value: 23, color: '#dc2626' },
    { name: 'New Users', value: 9, color: '#f97316' },
  ];

  const deviceData = [
    { device: 'Mobile', users: 4200, percentage: 65 },
    { device: 'Desktop', users: 1800, percentage: 28 },
    { device: 'Tablet', users: 450, percentage: 7 },
  ];

  const topicData = [
    { topic: 'AI/ML', posts: 245, engagement: 89 },
    { topic: 'Web Dev', posts: 189, engagement: 76 },
    { topic: 'Mobile', posts: 156, engagement: 82 },
    { topic: 'DevOps', posts: 134, engagement: 71 },
    { topic: 'Design', posts: 98, engagement: 85 },
  ];

  const stats = [
    { label: 'Total Users', value: '12.4K', growth: '+23%', color: 'from-orange-400 to-red-600' },
    { label: 'Monthly Active', value: '8.7K', growth: '+18%', color: 'from-red-400 to-orange-600' },
    { label: 'Total Posts', value: '3.2K', growth: '+34%', color: 'from-orange-500 to-red-500' },
    { label: 'Engagement Rate', value: '78%', growth: '+12%', color: 'from-red-500 to-orange-500' },
  ];

  const metrics = [
    { id: 'growth', label: 'Growth Overview', icon: '📈' },
    { id: 'users', label: 'User Analytics', icon: '👥' },
    { id: 'engagement', label: 'Engagement', icon: '💬' },
    { id: 'topics', label: 'Popular Topics', icon: '🔥' },
  ];

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
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Track growth, analyze user behavior, and monitor platform performance
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative overflow-hidden cursor-pointer"
              onClick={(e) => handleCardClick(e, 'stats')}
            >
              {/* Ripple Effects */}
              {ripples.map((ripple) => (
                <motion.div
                  key={ripple.id}
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="absolute pointer-events-none"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: 20,
                    height: 20,
                    marginLeft: -10,
                    marginTop: -10,
                    borderRadius: '50%',
                    background: 'rgba(234, 88, 12, 0.3)',
                  }}
                />
              ))}
              
              {/* Glowing border effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-500 group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-gray-300 text-sm font-medium">{stat.label}</h3>
                  <span className="text-green-400 text-sm font-bold">{stat.growth}</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Metric Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-3 mb-8 justify-center"
        >
          {metrics.map((metric) => (
            <motion.button
              key={metric.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMetric(metric.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedMetric === metric.id
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-orange-400'
              }`}
            >
              <span className="text-lg">{metric.icon}</span>
              {metric.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Charts Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMetric}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {selectedMetric === 'growth' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Growth Chart */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-2xl">📈</span>
                    User Growth Trend
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={growthData}>
                      <defs>
                        <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ea580c" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#ea580c" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#ea580c" 
                        strokeWidth={2}
                        fill="url(#growthGradient)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Revenue Chart */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-2xl">💰</span>
                    Revenue Growth
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#dc2626" 
                        strokeWidth={3}
                        dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {selectedMetric === 'users' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* User Distribution */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-2xl">👥</span>
                    User Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={userEngagementData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {userEngagementData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Device Distribution */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-2xl">📱</span>
                    Device Usage
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={deviceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="device" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }} 
                      />
                      <Bar dataKey="users" fill="#ea580c" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {selectedMetric === 'engagement' && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="text-2xl">💬</span>
                  Monthly Engagement
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={growthData}>
                    <defs>
                      <linearGradient id="postsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#dc2626" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="posts" 
                      stroke="#dc2626" 
                      strokeWidth={2}
                      fill="url(#postsGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            {selectedMetric === 'topics' && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  Popular Topics
                </h3>
                <div className="space-y-4">
                  {topicData.map((topic, index) => (
                    <motion.div
                      key={topic.topic}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{topic.topic}</h4>
                          <p className="text-gray-400 text-sm">{topic.posts} posts</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-orange-400 font-bold">{topic.engagement}%</div>
                        <div className="text-gray-400 text-sm">engagement</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StatsPage;
