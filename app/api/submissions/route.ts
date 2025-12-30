import { NextResponse } from 'next/server';
import { getMergedSubmissions, getSubmissionStats } from '@/lib/merge-data';

// GET /api/submissions - Get all submissions
export async function GET() {
  try {
    const submissions = await getMergedSubmissions(false); // Exclude deleted
    const stats = await getSubmissionStats();

    return NextResponse.json({
      submissions,
      stats,
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
