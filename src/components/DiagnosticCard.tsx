import React from 'react';
import { Icons } from './Icons';

interface DiagnosticCardProps {
  title: string;
  children: React.ReactNode;
  icon?: keyof typeof Icons;
  status?: 'success' | 'warning' | 'error';
}

export function DiagnosticCard({ title, children, icon, status }: DiagnosticCardProps) {
  const statusColors = {
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    error: 'bg-red-50 border-red-200',
    default: 'bg-white'
  };

  const bgColor = status ? statusColors[status] : statusColors.default;

  return (
    <div className={`p-4 rounded-lg shadow-sm border ${bgColor} transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-center gap-2 mb-3">
        {icon && <span className="text-gray-500">{Icons[icon]}</span>}
        <h2 className="font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
}