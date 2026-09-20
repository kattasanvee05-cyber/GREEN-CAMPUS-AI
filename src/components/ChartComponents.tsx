import React from 'react';

// Responsive SVG Line Chart
export const SimpleLineChart: React.FC<{
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  unit?: string;
}> = ({ data, height = 180, color = '#15803d', unit = '' }) => {
  if (!data || data.length === 0) return null;

  const padding = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = 500;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values) * 0.9;
  const maxVal = Math.max(...values) * 1.1;

  const getX = (index: number) => padding.left + (index / (data.length - 1)) * chartWidth;
  const getY = (val: number) => padding.top + chartHeight - ((val - minVal) / (maxVal - minVal || 1)) * chartHeight;

  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');
  const areaPoints = `${getX(0)},${padding.top + chartHeight} ${points} ${getX(data.length - 1)},${padding.top + chartHeight}`;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-[220px]">
        <defs>
          <linearGradient id={`grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.5, 1].map((pct, i) => {
          const y = padding.top + chartHeight * (1 - pct);
          const val = Math.round(minVal + pct * (maxVal - minVal));
          return (
            <g key={i}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
              <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#64748b">
                {val}
              </text>
            </g>
          );
        })}

        {/* Gradient fill */}
        <polygon points={areaPoints} fill={`url(#grad-${color.replace('#', '')})`} />

        {/* Line */}
        <polyline fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={points} />

        {/* Dots & Labels */}
        {data.map((d, i) => (
          <g key={i}>
            <circle cx={getX(i)} cy={getY(d.value)} r="4" fill="#ffffff" stroke={color} strokeWidth="2.5" />
            <text x={getX(i)} y={height - 8} textAnchor="middle" fontSize="11" fill="#475569" fontWeight="500">
              {d.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// Responsive SVG Bar Chart
export const SimpleBarChart: React.FC<{
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
}> = ({ data, height = 180, color = '#0f766e' }) => {
  if (!data || data.length === 0) return null;

  const padding = { top: 20, right: 20, bottom: 30, left: 45 };
  const width = 500;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxVal = Math.max(...data.map((d) => d.value)) * 1.15;
  const barWidth = Math.min(36, (chartWidth / data.length) * 0.65);

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-[220px]">
        {/* Horizontal grid lines */}
        {[0, 0.5, 1].map((pct, i) => {
          const y = padding.top + chartHeight * (1 - pct);
          const val = Math.round(pct * maxVal);
          return (
            <g key={i}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
              <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#64748b">
                {val}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const x = padding.left + (i + 0.5) * (chartWidth / data.length) - barWidth / 2;
          const barH = (d.value / maxVal) * chartHeight;
          const y = padding.top + chartHeight - barH;

          return (
            <g key={i} className="group cursor-pointer">
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                fill={color}
                rx="4"
                className="transition-opacity hover:opacity-85"
              />
              <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" fontSize="10" fill="#334155" fontWeight="600">
                {d.value}
              </text>
              <text x={x + barWidth / 2} y={height - 8} textAnchor="middle" fontSize="11" fill="#475569" fontWeight="500">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// Donut / Pie distribution chart
export const SimpleDonutChart: React.FC<{
  items: { label: string; percentage: number; color: string }[];
  size?: number;
}> = ({ items, size = 180 }) => {
  let accumulated = 0;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          {items.map((item, idx) => {
            const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -accumulated;
            accumulated += (item.percentage / 100) * circumference;

            return (
              <circle
                key={idx}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs text-slate-500 font-medium">Distribution</span>
          <span className="text-lg font-bold text-slate-800">100%</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 text-xs text-slate-700">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="font-medium text-slate-800">{item.percentage}%</span>
            <span className="text-slate-600 truncate max-w-[130px]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
