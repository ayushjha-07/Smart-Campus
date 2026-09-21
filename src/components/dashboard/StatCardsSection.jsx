import React from 'react';
import StatCard from './StatCard';

export default function StatCardsSection() {
  const cards = [
    {
      id: 'total',
      label: 'TOTAL COMPLAINTS',
      value: '2',
      trend: '↑ 12% this month',
      description: 'Cumulative student filings',
      iconName: 'FileText',
      accentColor: 'green',
    },
    {
      id: 'in-progress',
      label: 'IN PROGRESS',
      value: '0',
      trend: '→ 0% this month',
      description: 'Under investigation & repair',
      iconName: 'Activity',
      accentColor: 'olive',
    },
    {
      id: 'pending',
      label: 'PENDING TRIAGE',
      value: '1',
      trend: '↑ 50% this month',
      description: 'Under initial review',
      iconName: 'Clock',
      accentColor: 'blue',
    },
    {
      id: 'resolved',
      label: 'RESOLVED',
      value: '1',
      trend: '↑ 100% this month',
      description: 'Successfully addressed',
      iconName: 'CheckCircle2',
      accentColor: 'green',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
