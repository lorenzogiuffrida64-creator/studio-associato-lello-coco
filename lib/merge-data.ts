import { getSubmissions, type SheetSubmission } from './google-sheets';
import { getMetadata, getAllMetadata } from './db';

export interface MergedSubmission extends SheetSubmission {
  readStatus: boolean;
  notes: string | null;
  deletedAt: string | null;
}

// Merge Google Sheets data with SQLite metadata
export async function getMergedSubmissions(includeDeleted: boolean = false): Promise<MergedSubmission[]> {
  try {
    // Fetch all submissions from Google Sheets
    const sheetData = await getSubmissions();

    // Merge with metadata
    const merged = sheetData.map((submission) => {
      const metadata = getMetadata(submission.id) || {
        read_status: 0,
        notes: null,
        deleted_at: null,
      };

      return {
        ...submission,
        readStatus: Boolean(metadata.read_status),
        notes: metadata.notes,
        deletedAt: metadata.deleted_at,
      };
    });

    // Filter out soft-deleted submissions unless explicitly requested
    if (!includeDeleted) {
      return merged.filter((s) => !s.deletedAt);
    }

    return merged;
  } catch (error) {
    console.error('Error merging submissions data:', error);
    throw error;
  }
}

// Get a single merged submission by ID
export async function getMergedSubmissionById(id: string): Promise<MergedSubmission | null> {
  try {
    const submissions = await getMergedSubmissions(true); // Include deleted to find any submission
    return submissions.find((s) => s.id === id) || null;
  } catch (error) {
    console.error('Error getting submission by ID:', error);
    throw error;
  }
}

// Get submission stats
export async function getSubmissionStats() {
  try {
    const submissions = await getMergedSubmissions(false);
    const metadata = getAllMetadata();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaySubmissions = submissions.filter((s) => {
      const submissionDate = new Date(s.timestamp);
      submissionDate.setHours(0, 0, 0, 0);
      return submissionDate.getTime() === today.getTime();
    });

    return {
      total: submissions.length,
      unread: submissions.filter((s) => !s.readStatus).length,
      today: todaySubmissions.length,
      deleted: metadata.filter((m) => m.deleted_at !== null).length,
    };
  } catch (error) {
    console.error('Error getting submission stats:', error);
    throw error;
  }
}
