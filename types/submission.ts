export interface Submission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  readStatus: boolean;
  notes: string | null;
  deletedAt: string | null;
}

export interface SubmissionFilters {
  search: string;
  status: 'all' | 'read' | 'unread';
  dateRange: '7d' | '30d' | '90d' | 'all';
  sortBy: 'newest' | 'oldest' | 'name';
}

export interface SubmissionStats {
  total: number;
  unread: number;
  today: number;
  deleted: number;
}
