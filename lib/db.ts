import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'admin.db');
const db = new Database(dbPath);

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS submission_metadata (
    id TEXT PRIMARY KEY,
    read_status INTEGER DEFAULT 0,
    notes TEXT,
    deleted_at TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_deleted ON submission_metadata(deleted_at);
  CREATE INDEX IF NOT EXISTS idx_read_status ON submission_metadata(read_status);
`);

export interface SubmissionMetadata {
  id: string;
  read_status: number;
  notes: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

// Get metadata for a specific submission
export function getMetadata(id: string): SubmissionMetadata | undefined {
  const stmt = db.prepare('SELECT * FROM submission_metadata WHERE id = ?');
  return stmt.get(id) as SubmissionMetadata | undefined;
}

// Get all metadata
export function getAllMetadata(): SubmissionMetadata[] {
  const stmt = db.prepare('SELECT * FROM submission_metadata');
  return stmt.all() as SubmissionMetadata[];
}

// Upsert (insert or update) metadata
export function upsertMetadata(
  id: string,
  data: Partial<Pick<SubmissionMetadata, 'read_status' | 'notes' | 'deleted_at'>>
) {
  const existing = getMetadata(id);

  if (existing) {
    // Update existing
    const updates: string[] = [];
    const values: any[] = [];

    if (data.read_status !== undefined) {
      updates.push('read_status = ?');
      values.push(data.read_status);
    }
    if (data.notes !== undefined) {
      updates.push('notes = ?');
      values.push(data.notes);
    }
    if (data.deleted_at !== undefined) {
      updates.push('deleted_at = ?');
      values.push(data.deleted_at);
    }

    if (updates.length > 0) {
      updates.push('updated_at = CURRENT_TIMESTAMP');
      values.push(id);

      const stmt = db.prepare(
        `UPDATE submission_metadata SET ${updates.join(', ')} WHERE id = ?`
      );
      stmt.run(...values);
    }
  } else {
    // Insert new
    const stmt = db.prepare(`
      INSERT INTO submission_metadata (id, read_status, notes, deleted_at)
      VALUES (?, ?, ?, ?)
    `);
    stmt.run(
      id,
      data.read_status ?? 0,
      data.notes ?? null,
      data.deleted_at ?? null
    );
  }
}

// Toggle read status
export function toggleReadStatus(id: string): boolean {
  const metadata = getMetadata(id);
  const newStatus = metadata?.read_status ? 0 : 1;
  upsertMetadata(id, { read_status: newStatus });
  return Boolean(newStatus);
}

// Soft delete a submission
export function softDelete(id: string) {
  upsertMetadata(id, { deleted_at: new Date().toISOString() });
}

// Restore a soft-deleted submission
export function restore(id: string) {
  upsertMetadata(id, { deleted_at: null });
}

// Add or update notes
export function updateNotes(id: string, notes: string) {
  upsertMetadata(id, { notes });
}

export default db;
