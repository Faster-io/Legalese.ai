# Legalese.ai

AI-powered contract risk analysis platform using a "Traffic Light" scoring system (Red/Yellow/Green) to identify high-risk clauses in legal documents.

## 🚀 Features

- **AI Clause Detection**: BERT-powered NLP engine (`nlpaueb/legal-bert-base-uncased`)
- **Traffic Light Scoring**: Visual risk assessment (Red = High Risk, Yellow = Review, Green = Safe)
- **Secure Document Vault**: Encrypted storage for all uploaded contracts
- **Instant Analysis**: Upload PDFs or Word docs and get results in seconds
- **Premium Subscriptions**: Powered by Dodo Payments ($19/mo Pro Plan)

## 🛠️ Tech Stack

### Backend (FastAPI)
- **Framework**: FastAPI + Uvicorn
- **AI/ML**: Hugging Face Transformers (Legal-BERT)
- **Database**: Supabase (PostgreSQL) with SQLAlchemy ORM
- **Document Processing**: PyMuPDF, python-docx
- **Payments**: Dodo Payments API

### Frontend (Next.js)
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Language**: TypeScript

## 📦 Installation

### Prerequisites
- Python 3.10+
- Node.js 18+
- Supabase account
- Clerk account
- Dodo Payments account

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file with your credentials:
```env
HF_TOKEN=your_huggingface_token
DODO_PAYMENTS_API_KEY=your_dodo_api_key
DODO_PAYMENTS_WEBHOOK_KEY=your_webhook_secret
DATABASE_URL=postgresql+psycopg2://user:password@host:port/database
```

4. Run the backend:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 🗂️ Project Structure

```
Legalese.ai/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── database.py          # SQLAlchemy setup
│   ├── models.py            # Database models
│   ├── ai.py                # AI inference logic
│   ├── extraction.py        # Document text extraction
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js pages
│   │   │   ├── page.tsx     # Landing page
│   │   │   ├── dashboard/   # Document vault
│   │   │   ├── subscribe/   # Pricing page
│   │   │   ├── terms/       # Terms of Service
│   │   │   └── privacy/     # Privacy Policy
│   │   └── components/      # React components
│   └── public/
│       └── assets/          # Images and icons
└── README.md
```

## 🎯 Usage

1. **Sign Up**: Create an account using Clerk authentication
2. **Upload**: Upload a contract (PDF or DOCX)
3. **Analyze**: AI scans the document and identifies risky clauses
4. **Review**: View color-coded risk cards with explanations
5. **Upgrade**: Subscribe to Pro for unlimited uploads

## 🔐 Security

- All documents are encrypted at rest
- Secure authentication via Clerk
- Database connections use SSL/TLS
- Environment variables for sensitive data

## 📄 License

This project is proprietary software. All rights reserved.

## 👨‍💻 Author

Built by Vignesh

## 📧 Support

For support, email support@legalese.ai
