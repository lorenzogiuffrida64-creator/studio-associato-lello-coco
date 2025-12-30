import { NextRequest, NextResponse } from 'next/server';
import { getMergedSubmissions } from '@/lib/merge-data';
import { generateCSV, generateExcel } from '@/lib/export';

export async function GET(request: NextRequest) {
  try {
    const format = request.nextUrl.searchParams.get('format') || 'csv';
    const submissions = await getMergedSubmissions(false); // Exclude deleted

    const timestamp = new Date().toISOString().split('T')[0];

    if (format === 'csv') {
      // Generate CSV with proper header row
      const headers = 'Data,Nome,Email,Oggetto,Messaggio,Letto,Note\n';
      const csvData = submissions.map((s) => {
        const row = [
          s.timestamp,
          s.name,
          s.email,
          s.subject,
          s.message.replace(/"/g, '""').replace(/\n/g, ' '),
          s.readStatus ? 'Sì' : 'No',
          (s.notes || '').replace(/"/g, '""').replace(/\n/g, ' '),
        ];
        return row.map(val => `"${val}"`).join(',');
      }).join('\n');

      const csv = headers + csvData;

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="submissions-${timestamp}.csv"`,
        },
      });
    } else if (format === 'excel') {
      const excel = generateExcel(submissions);

      return new NextResponse(excel, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="submissions-${timestamp}.xlsx"`,
        },
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid format. Use "csv" or "excel".' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Failed to generate export' },
      { status: 500 }
    );
  }
}
