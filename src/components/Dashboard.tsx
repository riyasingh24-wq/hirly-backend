import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { TrendingUp, Users, Briefcase, Clock } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  value,
  change,
  isPositive
}) => (
  <div className="bg-white/5 rounded-xl p-4">
    <div className="flex items-center justify-between mb-2">
      <div className="text-white/60">{icon}</div>
      <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {change}
      </span>
    </div>
    <h3 className="text-white/80 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Sample data for charts
  const applicationsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Applications',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const candidateSourcesData = {
    labels: ['LinkedIn', 'Indeed', 'Referrals', 'Direct', 'Other'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(147, 51, 234, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
      },
    ],
  };

  const skillsDemandData = {
    labels: ['React', 'Python', 'Node.js', 'Java', 'AWS', 'Docker'],
    datasets: [
      {
        label: 'Demand',
        data: [85, 75, 65, 60, 55, 50],
        backgroundColor: 'rgba(147, 51, 234, 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
    },
  };

  if (!isExpanded) {
    return (
      <div className={`
        bg-white/10 backdrop-blur-md rounded-2xl p-6
        border border-white/20 shadow-xl overflow-hidden
        transition-all duration-300 ease-in-out
        w-[350px]
      `}>
        <div className="flex flex-col h-[500px]">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Dashboard</h2>
            <p className="text-white/60 text-sm">Key metrics and insights</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <MetricCard
              icon={<TrendingUp className="w-5 h-5" />}
              title="Total Applications"
              value="1,234"
              change="+12.5%"
              isPositive={true}
            />
            <MetricCard
              icon={<Users className="w-5 h-5" />}
              title="Active Candidates"
              value="456"
              change="+8.2%"
              isPositive={true}
            />
            <MetricCard
              icon={<Briefcase className="w-5 h-5" />}
              title="Open Positions"
              value="23"
              change="-2.1%"
              isPositive={false}
            />
            <MetricCard
              icon={<Clock className="w-5 h-5" />}
              title="Avg. Time to Hire"
              value="28 days"
              change="-5.3%"
              isPositive={true}
            />
          </div>

          <button
            onClick={() => setIsExpanded(true)}
            className="mt-auto px-4 py-2 bg-purple-600 text-white rounded-xl
                     hover:bg-purple-500 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            View More
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`
      bg-white/10 backdrop-blur-md rounded-2xl p-6
      border border-white/20 shadow-xl overflow-hidden
      transition-all duration-300 ease-in-out
      w-[700px]
    `}>
      <div className="flex flex-col h-[500px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Dashboard</h2>
            <p className="text-white/60 text-sm">Detailed metrics and analytics</p>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="px-4 py-2 bg-white/10 text-white rounded-xl
                     hover:bg-white/20 transition-colors duration-200"
          >
            Collapse
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <MetricCard
            icon={<TrendingUp className="w-5 h-5" />}
            title="Total Applications"
            value="1,234"
            change="+12.5%"
            isPositive={true}
          />
          <MetricCard
            icon={<Users className="w-5 h-5" />}
            title="Active Candidates"
            value="456"
            change="+8.2%"
            isPositive={true}
          />
          <MetricCard
            icon={<Briefcase className="w-5 h-5" />}
            title="Open Positions"
            value="23"
            change="-2.1%"
            isPositive={false}
          />
          <MetricCard
            icon={<Clock className="w-5 h-5" />}
            title="Avg. Time to Hire"
            value="28 days"
            change="-5.3%"
            isPositive={true}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-2 gap-6 flex-1">
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-4">Applications Over Time</h3>
            <Line data={applicationsData} options={chartOptions} />
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-4">Candidate Sources</h3>
            <Doughnut data={candidateSourcesData} options={chartOptions} />
          </div>
          <div className="bg-white/5 rounded-xl p-4 col-span-2">
            <h3 className="text-white font-semibold mb-4">Skills in Demand</h3>
            <Bar data={skillsDemandData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 