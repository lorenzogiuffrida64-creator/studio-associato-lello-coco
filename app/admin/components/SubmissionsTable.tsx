'use client';

import { useState } from 'react';
import { Eye, EyeOff, FileText, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import type { Submission } from '@/types/submission';
import NotesModal from './NotesModal';
import DeleteConfirmModal from './DeleteConfirmModal';

interface SubmissionsTableProps {
  submissions: Submission[];
  onUpdate: () => void;
}

export default function SubmissionsTable({ submissions, onUpdate }: SubmissionsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  async function handleToggleRead(submission: Submission) {
    try {
      await fetch(`/api/submissions/${submission.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggleRead' }),
      });
      onUpdate();
    } catch (error) {
      console.error('Error toggling read status:', error);
    }
  }

  function openNotesModal(submission: Submission) {
    setSelectedSubmission(submission);
    setNotesModalOpen(true);
  }

  function openDeleteModal(submission: Submission) {
    setSelectedSubmission(submission);
    setDeleteModalOpen(true);
  }

  if (submissions.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 border-white/10 text-center">
        <p className="text-white/40">Nessuna submission trovata</p>
      </div>
    );
  }

  return (
    <>
      <div className="glass rounded-2xl border-white/10 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-xs uppercase tracking-widest text-white/30 font-semibold">
                  Status
                </th>
                <th className="text-left p-4 text-xs uppercase tracking-widest text-white/30 font-semibold">
                  Data
                </th>
                <th className="text-left p-4 text-xs uppercase tracking-widest text-white/30 font-semibold">
                  Nome
                </th>
                <th className="text-left p-4 text-xs uppercase tracking-widest text-white/30 font-semibold">
                  Email
                </th>
                <th className="text-left p-4 text-xs uppercase tracking-widest text-white/30 font-semibold">
                  Oggetto
                </th>
                <th className="text-right p-4 text-xs uppercase tracking-widest text-white/30 font-semibold">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr
                  key={submission.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        submission.readStatus ? 'bg-white/20' : 'bg-purple-400'
                      }`}
                    />
                  </td>
                  <td className="p-4 text-sm text-white/60">
                    {format(new Date(submission.timestamp), 'dd MMM yyyy', { locale: it })}
                  </td>
                  <td className="p-4 text-sm font-medium">{submission.name}</td>
                  <td className="p-4 text-sm text-white/60">{submission.email}</td>
                  <td className="p-4 text-sm">{submission.subject}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleRead(submission)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title={submission.readStatus ? 'Segna come non letto' : 'Segna come letto'}
                      >
                        {submission.readStatus ? (
                          <Eye className="w-4 h-4 text-white/40" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-purple-400" />
                        )}
                      </button>
                      <button
                        onClick={() => openNotesModal(submission)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="Gestisci note"
                      >
                        <FileText className="w-4 h-4 text-white/40" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(submission)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="Elimina"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          {submissions.map((submission) => {
            const isExpanded = expandedId === submission.id;

            return (
              <div
                key={submission.id}
                className="border-b border-white/5 last:border-b-0"
              >
                <div
                  className="p-4 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : submission.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-3 h-3 rounded-full mt-1 ${
                          submission.readStatus ? 'bg-white/20' : 'bg-purple-400'
                        }`}
                      />
                      <div>
                        <p className="font-medium">{submission.name}</p>
                        <p className="text-sm text-white/40">{submission.email}</p>
                      </div>
                    </div>
                    <p className="text-xs text-white/30">
                      {format(new Date(submission.timestamp), 'dd MMM', { locale: it })}
                    </p>
                  </div>
                  <p className="text-sm ml-6">{submission.subject}</p>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 ml-6 space-y-3">
                    <div className="p-3 bg-white/5 rounded-lg">
                      <p className="text-sm text-white/60">{submission.message}</p>
                    </div>
                    {submission.notes && (
                      <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <p className="text-xs text-purple-300/60 mb-1">Note:</p>
                        <p className="text-sm">{submission.notes}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleRead(submission);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm"
                      >
                        {submission.readStatus ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        <span>{submission.readStatus ? 'Letto' : 'Non letto'}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openNotesModal(submission);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Note</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(submission);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors text-sm text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Elimina</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {selectedSubmission && (
        <>
          <NotesModal
            isOpen={notesModalOpen}
            onClose={() => setNotesModalOpen(false)}
            submission={selectedSubmission}
            onUpdate={onUpdate}
          />
          <DeleteConfirmModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            submission={selectedSubmission}
            onUpdate={onUpdate}
          />
        </>
      )}
    </>
  );
}
