
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, TrendingDown, Users, Calendar, CheckCircle, AlertTriangle, Clock, Target } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const ITGovernancePerformance = () => {
  // Sample performance data
  const boardPerformanceData = [
    { name: 'IT Steering', meetings: 8, decisions: 12, completion: 95 },
    { name: 'Architecture', meetings: 6, decisions: 8, completion: 87 },
    { name: 'Security', meetings: 10, decisions: 15, completion: 92 },
    { name: 'Audit', meetings: 4, decisions: 6, completion: 78 },
    { name: 'Contract', meetings: 7, decisions: 9, completion: 88 }
  ];

  const decisionTrendData = [
    { month: 'Jan', approved: 15, pending: 3, rejected: 2 },
    { month: 'Feb', approved: 18, pending: 5, rejected: 1 },
    { month: 'Mar', approved: 22, pending: 4, rejected: 3 },
    { month: 'Apr', approved: 19, pending: 2, rejected: 1 },
    { month: 'May', approved: 25, pending: 6, rejected: 2 },
    { month: 'Jun', approved: 21, pending: 3, rejected: 1 }
  ];

  const riskData = [
    { name: 'Low Risk', value: 45, color: '#10B981' },
    { name: 'Medium Risk', value: 35, color: '#F59E0B' },
    { name: 'High Risk', value: 20, color: '#EF4444' }
  ];

  const kpiData = [
    {
      title: 'Board Meeting Attendance',
      value: '87%',
      trend: '+5%',
      trendDirection: 'up',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Decision Approval Rate',
      value: '92%',
      trend: '+2%',
      trendDirection: 'up',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Meeting Efficiency',
      value: '78%',
      trend: '-3%',
      trendDirection: 'down',
      icon: Clock,
      color: 'text-red-600'
    },
    {
      title: 'Policy Compliance',
      value: '94%',
      trend: '+1%',
      trendDirection: 'up',
      icon: Target,
      color: 'text-green-600'
    }
  ];

  const chartConfig = {
    approved: { label: 'Approved', color: '#10B981' },
    pending: { label: 'Pending', color: '#F59E0B' },
    rejected: { label: 'Rejected', color: '#EF4444' }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">IT Governance Performance</h1>
          <p className="text-gray-600 mt-2">Executive dashboard for monitoring governance effectiveness</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <BarChart3 className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trendDirection === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className="h-8 w-8 text-blue-600" />
                <div className={`flex items-center ${kpi.color}`}>
                  <TrendIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">{kpi.trend}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</p>
                <p className="text-sm text-gray-600">{kpi.title}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Board Performance Chart */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Board Performance Overview</h2>
          <ChartContainer config={chartConfig} className="h-80">
            <BarChart data={boardPerformanceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="completion" fill="#3B82F6" radius={4} />
            </BarChart>
          </ChartContainer>
        </Card>

        {/* Risk Distribution */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Risk Distribution</h2>
          <ChartContainer config={chartConfig} className="h-80">
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                dataKey="value"
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {riskData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Decision Trends */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Decision Trends</h2>
        <ChartContainer config={chartConfig} className="h-80">
          <LineChart data={decisionTrendData}>
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="approved"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="pending"
              stroke="#F59E0B"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="rejected"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </Card>

      {/* Board Performance Details */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Detailed Board Performance</h2>
        <div className="space-y-4">
          {boardPerformanceData.map((board, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{board.name} Committee</h3>
                <Badge
                  className={
                    board.completion >= 90
                      ? 'bg-green-100 text-green-800'
                      : board.completion >= 80
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }
                >
                  {board.completion}% Complete
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{board.meetings} meetings held</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>{board.decisions} decisions made</span>
                </div>
                <div className="flex items-center">
                  {board.completion >= 90 ? (
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600" />
                  )}
                  <span>Performance {board.completion >= 90 ? 'Excellent' : 'Needs Attention'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ITGovernancePerformance;
