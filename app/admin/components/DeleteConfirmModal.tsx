'use client';

import { useState } from 'react';
import { X, Trash2, AlertTriangle } from 'lucide-react';
import type { Submission } from '@/types/submission';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: Submission;
  onUpdate: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  submission,
  onUpdate,
}: DeleteConfirmModalProps) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      await fetch(`/api/submissions/${submission.id}`, {
        method: 'DELETE',
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error deleting submission:', error);
    } finally {
      setDeleting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="glass rounded-2xl border-white/10 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-xl font-semibold">Conferma Eliminazione</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-white/60">
            Sei sicuro di voler eliminare questa submission? Questa azione è reversibile solo
            manualmente dal database.
          </p>

          <div className="p-4 bg-white/5 rounded-xl">
            <p className="text-sm text-white/40 mb-1">Da:</p>
            <p className="font-medium">{submission.name}</p>
            <p className="text-sm text-white/60">{submission.email}</p>
            <p className="text-sm text-white/40 mt-2">Oggetto:</p>
            <p className="text-sm">{submission.subject}</p>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-sm text-red-400">
              <strong>Nota:</strong> La submission verrà contrassegnata come eliminata ma rimarrà
              nel database. Non verrà rimossa da Google Sheets.
            </p>
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
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            <span>{deleting ? 'Eliminazione...' : 'Elimina'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
