import { NextRequest, NextResponse } from 'next/server';
import { getMergedSubmissionById } from '@/lib/merge-data';
import { upsertMetadata, softDelete, updateNotes, toggleReadStatus } from '@/lib/db';

// GET /api/submissions/[id] - Get single submission
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const submission = await getMergedSubmissionById(id);

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error('Error fetching submission:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submission' },
      { status: 500 }
    );
  }
}

// PATCH /api/submissions/[id] - Update submission metadata
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { action, notes, readStatus } = data;

    switch (action) {
      case 'toggleRead':
        const newStatus = toggleReadStatus(id);
        return NextResponse.json({ readStatus: newStatus });

      case 'updateNotes':
        if (notes === undefined) {
          return NextResponse.json(
            { error: 'Notes field is required' },
            { status: 400 }
          );
        }
        updateNotes(id, notes);
        return NextResponse.json({ notes });

      case 'setReadStatus':
        if (readStatus === undefined) {
          return NextResponse.json(
            { error: 'readStatus field is required' },
            { status: 400 }
          );
        }
        upsertMetadata(id, { read_status: readStatus ? 1 : 0 });
        return NextResponse.json({ readStatus });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    );
  }
}

// DELETE /api/submissions/[id] - Soft delete submission
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    softDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting submission:', error);
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 }
    );
  }
}
