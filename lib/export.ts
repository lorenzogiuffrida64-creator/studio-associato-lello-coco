import * as XLSX from 'xlsx';
import type { Submission } from '@/types/submission';

// Convert submissions to CSV format
export function generateCSV(submissions: Submission[]): string {
  const data = submissions.map((s) => ({
    Data: s.timestamp,
    Nome: s.name,
    Email: s.email,
    Oggetto: s.subject,
    Messaggio: s.message,
    Letto: s.readStatus ? 'Sì' : 'No',
    Note: s.notes || '',
  }));

  // Generate CSV manually
  const headers = Object.keys(data[0] || {}).join(',');
  const rows = data.map(row =>
    Object.values(row).map(val =>
      typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))
        ? `"${val.replace(/"/g, '""')}"`
        : val
    ).join(',')
  );

  return [headers, ...rows].join('\n');
}

// Convert submissions to Excel format
export function generateExcel(submissions: Submission[]): Buffer {
  const data = submissions.map((s) => ({
    Data: s.timestamp,
    Nome: s.name,
    Email: s.email,
    Oggetto: s.subject,
    Messaggio: s.message,
    Letto: s.readStatus ? 'Sì' : 'No',
    Note: s.notes || '',
  }));

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Set column widths
  worksheet['!cols'] = [
    { wch: 20 }, // Data
    { wch: 25 }, // Nome
    { wch: 30 }, // Email
    { wch: 30 }, // Oggetto
    { wch: 50 }, // Messaggio
    { wch: 10 }, // Letto
    { wch: 40 }, // Note
  ];

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');

  // Generate buffer
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  return buffer as Buffer;
}
