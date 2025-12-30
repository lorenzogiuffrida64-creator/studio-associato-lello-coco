# Admin Dashboard Setup Instructions

## Generate Admin Password Hash

Run this command to generate a password hash (replace `YourSecurePassword123!` with your desired password):

```bash
npx ts-node -e "import('bcryptjs').then(bcrypt => bcrypt.hash('YourSecurePassword123!', 12).then(hash => console.log('ADMIN_PASSWORD_HASH=' + hash)))"
```

Copy the output and paste it into `.env.local` replacing the `ADMIN_PASSWORD_HASH` value.

## Configure Google Sheets Credentials

1. Open the JSON file you downloaded from Google Cloud
2. Find the `client_email` field and copy it to `GOOGLE_SERVICE_ACCOUNT_EMAIL` in `.env.local`
3. Find the `private_key` field and copy it to `GOOGLE_PRIVATE_KEY` in `.env.local`
   - **Important**: Keep the quotes and the `\n` characters exactly as they appear
   - Example: `"-----BEGIN PRIVATE KEY-----\nMIIEvQIBA...\n-----END PRIVATE KEY-----\n"`

4. Copy your Google Sheet ID from the URL and paste it into `GOOGLE_SHEET_ID`

## Verify Your Google Sheet Structure

Your Google Sheet should have these columns in this order:
- Column A: Timestamp
- Column B: Name
- Column C: Email
- Column D: Subject
- Column E: Message

The first row should be headers (optional, will be skipped).

## Test the Setup

After configuring `.env.local`, run:

```bash
npm run dev
```

Then visit:
- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin/login

Use the password you set when generating the hash.
