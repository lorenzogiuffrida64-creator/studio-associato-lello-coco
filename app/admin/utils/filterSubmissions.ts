import type { Submission, SubmissionFilters } from '@/types/submission';

export function filterSubmissions(
  submissions: Submission[],
  filters: SubmissionFilters
): Submission[] {
  let filtered = [...submissions];

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(searchLower) ||
        s.email.toLowerCase().includes(searchLower) ||
        s.subject.toLowerCase().includes(searchLower) ||
        s.message.toLowerCase().includes(searchLower)
    );
  }

  // Status filter
  if (filters.status === 'read') {
    filtered = filtered.filter((s) => s.readStatus);
  } else if (filters.status === 'unread') {
    filtered = filtered.filter((s) => !s.readStatus);
  }

  // Date range filter
  if (filters.dateRange !== 'all') {
    const now = new Date();
    const days = filters.dateRange === '7d' ? 7 : filters.dateRange === '30d' ? 30 : 90;
    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    filtered = filtered.filter((s) => new Date(s.timestamp) >= cutoff);
  }

  // Sort
  filtered.sort((a, b) => {
    if (filters.sortBy === 'newest') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else if (filters.sortBy === 'oldest') {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    } else {
      // name
      return a.name.localeCompare(b.name);
    }
  });

  return filtered;
}
