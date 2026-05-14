interface Metric {
  label: string;
  value: string;
  statusColor: 'green' | 'red' | 'gray';
}

export default function MetricCard({ metric }: { metric: Metric }) {
  const colorClass = metric.statusColor === 'green' ? 'text-green-600' : metric.statusColor === 'red' ? 'text-red-600' : 'text-gray-600';
  
  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="text-sm text-gray-500 mb-1">{metric.label}</div>
      <div className={`text-2xl font-bold ${colorClass}`}>{metric.value}</div>
    </div>
  );
}
