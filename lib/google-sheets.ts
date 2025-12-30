import { google } from 'googleapis';
import { createHash } from 'crypto';

// Initialize Google Sheets API
function getAuth() {
  // Hardcoded credentials to avoid .env parsing issues
  const credentials = {
    client_email: 'admin-dashboard-service@gen-lang-client-0649095025.iam.gserviceaccount.com',
    private_key: `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCiUgcLjSDw+i1X
1e7ux3uI2pZriJkmdAI2gjdo/mn14VvUllsQGKET9ZOhXaMpe7bU/52109ECfGEk
tlrE+fbA3SerFt9BMz7Q5XLMgFjGR7nr7zJHx0L1d9Xrid+aemqnXV/TZno577aa
iZZ3i5iA2OyrnzJFcpWpXbXmAoCBs0XEETgLYDUz3o+DI49gdpb4fsL3tO95k2Nn
B40hvK0GwQYY8GOC/Nyz9A826j/0IuT5lghJ+QZgE/+0RiVnMk3KLexD6r8bOG0w
bJgZcQ48pUZYmMoKJf35RSdc4S2b3gyGTD1P3WAgjBcyHsgMhnPSJ9sW3GQ16mDD
yqdVIXXLAgMBAAECggEAP76o559nxVrqPalVKM6MNAVrtxUw18oNKGzg58mpwRbc
YlMdteeGMnlpnaBRODROa71qqQJi/W/tEmbOpLZpcfon3uefi1Jdo9nHyInK0ytN
11rbSxb0s8N47gP6HQdgJRPlUvbWnzQFaREJVy8qF8eYwhlFu8IxBg84JPjskII+
xDUAQbmib+RX3wLg8oCSpVwkFtknwwO+4V4OBJEotnjJEnjxw0narq4syZbwKjAb
G6t2AtXIf9kVj/CJLWpM5o2MRvvE0G2M7lff7lJ0LYU8krVIJfxqHlON835DAzNF
hmAZqhlkhODm5TCJLLB4cpCpyHnQpVHTrUQvRQ+OGQKBgQDhX32EE5Gg07gxj0IQ
zq9ZZaJRC7CxvVkbYjgu4kH9dqhTDFli927zhy8bA4AIH64KqxDnPzvcUwsuLUi+
93h7646TKRMWgRit/OoYikImpUdEK1Ffj4PBAe5HEOKOjpHZUCh7s+YFmboVHTKR
Z0NGZlToOIJImeWtjZFRpoZqXwKBgQC4YP+Z1y7A16SBHGgOAg1fq/+sB/RhQ3Bi
AjHWW+U5DQDILvnFbd32dVy/NPCDCULbe5Az97uRx4zq3IqA/B6oMbGDNtUI3/dy
7jFR6WBvQWm+qKPnBRZQ30qURfHiaCiX5Wzk/OgopBHRo9p+oMo2oay60S+7wEeS
fGtw8ZbEFQKBgQDLNMFEXCybWSqkLOpBo0pBjb0L3EGGERcN9MJ5q3Iaqmlc8C6M
aFM26vXTIpXHPWE8pz+HceF0Z8AV86i63wFYomycTZWzXdU102vzkn3QwIeAdJpb
UlhWp3oDw7qzFON2kKrf1rYY6KH6tafJqNTk3hHCjGkUMwb/ND0J5N8fewKBgQCW
Ur8R9lav8yC0Ayzy/slYjyrMX0/nXMxrm852LkYc1XUlwObzCDhHkDglzEurCgnw
WDWhqQDMQh2p/lUOBIAaMSnBCRt3OOLOWVTsq5FsI7DLOUMoPwWKugJcEQq8xJ8T
+IFn0KqXN+0vNqAVTZKQKBBj39lDAelYjQgr9UwuYQKBgFTeVB9cg/KxyaleMf5n
7AwilqVe0yOnqgJnHeaMqYA+KYWJAL7QOhnyPpjaYPHPfyBZcHssSM1XOcxXD1CZ
QcMmPGxbOnnfdrIqwa32tNEgpTNJ7Ul373wXmfxtIDFwOw9fiGYa669MJCIP6WwH
Vm/9vP1o464WO1/U1oo1U1in
-----END PRIVATE KEY-----`,
  };

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

// Initialize sheets client
function getSheetsClient() {
  const auth = getAuth();
  return google.sheets({ version: 'v4', auth });
}

// Generate unique ID from email and timestamp
export function generateSubmissionId(email: string, timestamp: string): string {
  return createHash('sha256')
    .update(`${email}-${timestamp}`)
    .digest('hex')
    .substring(0, 16);
}

export interface SheetSubmission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Get all submissions from Google Sheets
export async function getSubmissions(): Promise<SheetSubmission[]> {
  try {
    const sheets = getSheetsClient();
    const spreadsheetId = '1Ik_4TgptJnI2NlTTOwivlYfAphxFTIVermWOEMlRKww';

    // First, get the list of sheets to find the first one
    const metadata = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const firstSheet = metadata.data.sheets?.[0]?.properties?.title || 'Sheet1';

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${firstSheet}!A:E`,
    });

    const rows = response.data.values || [];

    if (rows.length === 0) {
      return [];
    }

    // Check if first row is headers
    const hasHeaders = rows[0]?.[0]?.toLowerCase().includes('timestamp') ||
                       rows[0]?.[0]?.toLowerCase().includes('data');

    const dataRows = hasHeaders ? rows.slice(1) : rows;

    return dataRows.map((row) => ({
      id: generateSubmissionId(row[2] || '', row[0] || ''), // email + timestamp
      timestamp: row[0] || '',
      name: row[1] || '',
      email: row[2] || '',
      subject: row[3] || '',
      message: row[4] || '',
    }));
  } catch (error) {
    console.error('Error fetching submissions from Google Sheets:', error);
    throw error;
  }
}

// Append new submission to Google Sheets
export async function appendSubmission(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  try {
    const sheets = getSheetsClient();
    const spreadsheetId = '1Ik_4TgptJnI2NlTTOwivlYfAphxFTIVermWOEMlRKww';

    // First, get the list of sheets to find the first one
    const metadata = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const firstSheet = metadata.data.sheets?.[0]?.properties?.title || 'Sheet1';

    // Check if sheet is empty and needs headers
    const checkResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${firstSheet}!A1:E1`,
    });

    const isEmpty = !checkResponse.data.values || checkResponse.data.values.length === 0;

    // If empty, add headers first
    if (isEmpty) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${firstSheet}!A1:E1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [['Timestamp', 'Name', 'Email', 'Subject', 'Message']],
        },
      });
    }

    const timestamp = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${firstSheet}!A:E`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          timestamp,
          data.name,
          data.email,
          data.subject,
          data.message,
        ]],
      },
    });
  } catch (error) {
    console.error('Error appending submission to Google Sheets:', error);
    throw error;
  }
}
