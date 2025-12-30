'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, LogOut } from 'lucide-react';
import type { Submission, SubmissionFilters, SubmissionStats } from '@/types/submission';
import StatsBar from './components/StatsBar';
import FilterBar from './components/FilterBar';
import SubmissionsTable from './components/SubmissionsTable';
import { filterSubmissions } from './utils/filterSubmissions';

export default function AdminDashboard() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState<SubmissionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<SubmissionFilters>({
    search: '',
    status: 'all',
    dateRange: '30d',
    sortBy: 'newest',
  });

  useEffect(() => {
    fetchSubmissions();
  }, []);

  async function fetchSubmissions() {
    try {
      const response = await fetch('/api/submissions');

      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }

      const data = await response.json();
      setSubmissions(data.submissions || []);
      setStats(data.stats || null);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  const filteredSubmissions = filterSubmissions(submissions, filters);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-black pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-lg max-h-lg bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif mb-2">Admin Dashboard</h1>
            <p className="text-white/40 text-sm">Studio Associato Giuliano Lello Coco</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-medium transition-all text-sm md:text-base"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-purple-400 mb-4" />
            <p className="text-white/40">Caricamento submissions...</p>
          </div>
        ) : (
          <>
            {/* Stats */}
            {stats && <StatsBar stats={stats} />}

            {/* Filters */}
            <FilterBar filters={filters} onChange={setFilters} />

            {/* Submissions Table */}
            <SubmissionsTable
              submissions={filteredSubmissions}
              onUpdate={fetchSubmissions}
            />
          </>
        )}
      </div>
    </div>
  );
}
