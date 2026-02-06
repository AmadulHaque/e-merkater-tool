## Overview
This document serves dual purposes: 
1. **As a Comprehensive AI Prompt**: You can copy-paste the "Master AI Development Prompt" section directly into an AI model (e.g., Grok, GPT-4, Claude) to generate code, architecture designs, or implementation guides for the project. It encapsulates all project requirements, including core features, expansions, and AI automations.
2. **As Project Documentation**: It provides a structured guide on how AI is integrated into the Shopify Ecom-Manage system, including technical details, best practices, and extensibility. This ensures the project leverages AI for automation while maintaining scalability and security.

The project is built with: ShadCN (UI components), React.js (frontend), Inertia.js (server-side rendering bridge), Laravel (backend), MySQL (database). Focus on modular, automated features with multiple AI model integrations.

## Project Recap
- **Core Features** (Basic Version):
  - Shopify API integration for syncing all orders and products using Laravel queue jobs.
  - Default setup for multi-courier management (e.g., FedEx, UPS, DHL).
  - Display orders courier-wise with detailed views.
- **Expansion Features** (New/Post-Core):
  - Social media management (Facebook, WhatsApp, YouTube, TikTok, Instagram, etc.).
  - AI-automated order creation from social interactions (e.g., detect purchase intent in comments/DMs).
  - AI-generated automated social media messages (e.g., replies, promotions).
  - Connection to multiple AI models (e.g., OpenAI, Grok, Claude, Gemini, Llama).
  - Additional automations (e.g., auto-replies, sentiment analysis, inventory predictions).
  - New UI designs and enhancements.

## AI Integration Architecture
### Key Components
- **AI Model Connector System**: A centralized Laravel service/module to handle API calls to various AI providers. Use environment variables for API keys. Support switching models dynamically (e.g., via config or user settings).
  - Providers: OpenAI (GPT series), Anthropic (Claude), Google (Gemini), xAI (Grok), Meta (Llama via Hugging Face), etc.
  - Features: Rate limiting, error handling, caching responses, fallback to secondary models.
- **AI Usage Points**:
  - **Social Media Automation**: Analyze incoming messages/comments for intent; generate responses/orders.
  - **Order Processing**: Detect fraud, suggest couriers, predict demand.
  - **Content Generation**: Product descriptions, promotional posts.
  - **Analytics**: Sentiment on reviews, trend forecasting.
- **Data Flow**:
  1. Social/Shopify webhooks trigger Laravel jobs.
  2. Jobs queue AI tasks (e.g., process message with AI).
  3. AI service calls external APIs, processes results.
  4. Store outputs in MySQL (e.g., generated messages, created orders).
  5. Frontend (React/Inertia) displays results with ShadCN components.
- **Security & Ethics**:
  - Anonymize user data before AI processing.
  - Comply with GDPR/CCPA; obtain consents for AI usage.
  - Monitor for biases in AI outputs (e.g., in messaging).
  - Use secure HTTPS for API calls; rotate keys.

### Technical Implementation Guidelines
- **Laravel Setup for AI**:
  - Create a `AiService` class with methods like `generateResponse($prompt, $model)`, `analyzeIntent($text, $model)`.
  - Use Guzzle or Laravel HTTP for API requests.
  - Queue AI-heavy tasks to avoid timeouts.
- **Frontend Integration**:
  - React components for AI previews (e.g., message generator UI).
  - Inertia props to pass AI-generated data.
  - ShadCN for modals, alerts, and dashboards showing AI insights.
- **Database Schema Additions**:
  - Table: `ai_logs` (model_used, input, output, timestamp).
  - Table: `social_interactions` (platform, message, ai_response, order_id).
- **Testing**:
  - Unit tests for AI service (mock API responses).
  - Integration tests for end-to-end flows (e.g., social message → AI → order creation).
  - Monitor AI accuracy with manual reviews initially.

## Master AI Development Prompt
Use this as a standalone prompt for AI tools to generate specific outputs (e.g., code snippets, diagrams). Customize the [TASK] placeholder as needed (e.g., "Generate Laravel code for AI order creation").

---

**System Prompt for AI Development Assistant:**

You are an expert full-stack developer specializing in Laravel, React.js, Inertia.js, ShadCN, MySQL, and AI integrations (OpenAI, Claude, Gemini, Grok, Llama). Your goal is to build or expand a Shopify E-Commerce Management system called "Ecom-Manage". The system automates order/product syncing, courier management, and adds AI-driven social media features.

**Project Details:**
- **Core Backend**: Laravel handles API integrations, queues (for syncing Shopify orders/products), and MySQL storage.
- **Frontend**: React.js with Inertia.js for seamless routing; ShadCN for modern UI components (buttons, tables, modals, etc.).
- **Integrations**:
  - Shopify API: Sync orders/products via queues.
  - Couriers: Default multi-courier setup (FedEx, UPS, DHL); show orders courier-wise with details.
  - Social Media: Facebook, WhatsApp, YouTube, TikTok, Instagram – manage posts, messages.
  - AI: Connect multiple models; use for automated order creation from social (e.g., detect "I want to buy" in comment → create draft order), generate social messages (personalized replies/promotions).
- **Automations**:
  - Queue jobs for syncs and AI tasks.
  - AI features: Intent detection, sentiment analysis, product recommendations, fraud detection, auto-replies, review requests, inventory alerts.
  - Extensibility: Add new designs (e.g., responsive dashboards), more features (e.g., analytics).
- **Best Practices**:
  - Modular code: Services for AI, controllers for routes.
  - Secure: API keys in .env; validate inputs.
  - Scalable: Use queues, caching.
  - UI: Clean, responsive with ShadCN themes.
  - Error Handling: Logs, retries for AI calls.

**User Task:** [TASK] – Provide complete, working code where applicable. Explain reasoning step-by-step. Use tables for comparisons/lists. Output in markdown for clarity.

**Examples of Tasks:**
- Generate Laravel service for connecting multiple AI models.
- Create React component for AI-generated message preview.
- Design database schema for AI logs.
- Implement queue job for social message analysis → order creation.
- Suggest 5 new automated features with implementation outlines.

**Constraints:**
- No external package installs beyond defaults (e.g., use built-in HTTP for AI calls).
- Ensure compatibility with PHP 8+, React 18+.
- Focus on automation and user-friendliness.

---
