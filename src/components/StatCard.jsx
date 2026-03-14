export default function StatCard({ title, value, icon, trend, color = 'primary', subtitle }) {
  const colorMap = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/20 text-purple-600',
    accent: 'bg-accent/20 text-orange-500',
    success: 'bg-success/10 text-success',
    danger: 'bg-danger/10 text-danger',
  }

  const trendColor = trend > 0 ? 'text-success' : trend < 0 ? 'text-danger' : 'text-slate-400'

  return (
    <div className="card card-hover animate-slide-up">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${colorMap[color]}`}>
          {icon}
        </div>
        {trend !== undefined && (
          <span className={`text-xs font-semibold font-inter flex items-center gap-1 ${trendColor}`}>
            {trend > 0 ? '↑' : trend < 0 ? '↓' : '–'}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold font-poppins text-darkText mb-0.5">{value}</p>
        <p className="text-sm font-semibold text-slate-600 font-inter">{title}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-1 font-inter">{subtitle}</p>}
      </div>
    </div>
  )
}