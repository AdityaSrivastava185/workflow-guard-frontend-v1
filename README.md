# Workflow Guard

**Workflow Guard** is a lightweight system designed to capture and communicate real work progress without noise. Teams often don’t lack work—they lack a clean, reliable way to share progress. Workflow Guard turns a simple progress submission into an automated backend workflow that stores history and delivers only the most important update directly to Slack.

---

## 🛠 Features

- **Progress Submission Form:** Users submit updates about their daily work.
- **Validation & Feedback:** Ensures meaningful and structured input.
- **Automated Backend Processing:** Stores full history, triggers events, and emits updates.
- **Slack Integration:** Only relevant progress summaries are sent to Slack.
- **Minimal UI:** Clean, intuitive, and polished frontend for quick reporting.

---

## 💻 Tech Stack

### Backend

- **Motia** — Unified backend runtime for APIs, background jobs, and events
- **API Step** — Accepts progress submissions
- **State Persistence** — Stores full submission history
- **Event-Driven Workflows** — Processes background tasks
- **Slack Webhook Integration** — Sends updates directly to Slack

### Frontend

- **Next.js** — React-based framework for UI
- **shadcn/ui** — Polished and responsive components
- **React Hook Form + Zod** — Form handling and validation
- **Sonner** — Toast notifications for user feedback

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js v18+  
- NPM or Yarn  
- Slack workspace for webhook integration  

## 📥 Installation

1. Clone the backend repository:

```bash
git clone <your-frontend-repo-url>
cd <your-project>
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
NEXT_PUBLIC_API_URL=<your-public-url>
```

---

## 🚀 Running Locally

Start the frontend in development mode:

```bash
npm run dev
```

The server will run at `http://localhost:3000`.

> Note: Port may change if 3000 is in use.


