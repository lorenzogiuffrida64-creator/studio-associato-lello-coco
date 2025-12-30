import { Search, Download } from 'lucide-react';
import type { SubmissionFilters } from '@/types/submission';

interface FilterBarProps {
  filters: SubmissionFilters;
  onChange: (filters: SubmissionFilters) => void;
}

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  async function handleExport(format: 'csv' | 'excel') {
    try {
      const url = `/api/export?format=${format}`;
      window.open(url, '_blank');
    } catch (error) {
      console.error('Export error:', error);
    }
  }

  return (
    <div className="glass rounded-2xl p-4 md:p-6 border-white/10 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input
            type="text"
            placeholder="Cerca per nome, email, oggetto..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value as any })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all cursor-pointer"
          >
            <option value="all">Tutti</option>
            <option value="unread">Non Letti</option>
            <option value="read">Letti</option>
          </select>
        </div>

        {/* Date Range */}
        <div>
          <select
            value={filters.dateRange}
            onChange={(e) => onChange({ ...filters, dateRange: e.target.value as any })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all cursor-pointer"
          >
            <option value="7d">Ultimi 7 giorni</option>
            <option value="30d">Ultimi 30 giorni</option>
            <option value="90d">Ultimi 90 giorni</option>
            <option value="all">Tutti</option>
          </select>
        </div>
      </div>

      {/* Export buttons */}
      <div className="flex flex-wrap gap-3 mt-4">
        <button
          onClick={() => handleExport('csv')}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-medium transition-all text-sm"
        >
          <Download className="w-4 h-4" />
          <span>Esporta CSV</span>
        </button>
        <button
          onClick={() => handleExport('excel')}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-medium transition-all text-sm"
        >
          <Download className="w-4 h-4" />
          <span>Esporta Excel</span>
        </button>
      </div>
    </div>
  );
}
