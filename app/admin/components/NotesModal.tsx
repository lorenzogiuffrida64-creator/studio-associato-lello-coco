'use client';

import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import type { Submission } from '@/types/submission';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: Submission;
  onUpdate: () => void;
}

export default function NotesModal({ isOpen, onClose, submission, onUpdate }: NotesModalProps) {
  const [notes, setNotes] = useState(submission.notes || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNotes(submission.notes || '');
  }, [submission]);

  async function handleSave() {
    setSaving(true);
    try {
      await fetch(`/api/submissions/${submission.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updateNotes', notes }),
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error saving notes:', error);
    } finally {
      setSaving(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="glass rounded-2xl border-white/10 w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold">Gestisci Note</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-white/40 mb-1">Submission da:</p>
            <p className="font-medium">{submission.name}</p>
            <p className="text-sm text-white/60">{submission.email}</p>
          </div>

          <div>
            <label className="text-sm text-white/40 mb-2 block">Note:</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Aggiungi note su questa submission..."
              rows={6}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all resize-none"
            />
            <p className="text-xs text-white/30 mt-1">{notes.length} caratteri</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            Annulla
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Salvataggio...' : 'Salva'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
