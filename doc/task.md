# Project Task Checklist: Shopify Ecom-Manage

This document outlines the complete "A to Z" development tasks for the Shopify Ecom-Manage project, based on the [SRS](srs.md) and [Technical Documentation](document.md).

---

## Phase 1: Core Infrastructure (Weeks 1–3)
**Goal:** Stable foundation for Backend and Frontend.

- [ ] **Project Setup**
    - [x] Initialize Laravel project.
    - [x] Configure Environment (`.env`) for DB, App URL, etc.
    - [x] Set up Git repository and ignore rules.
    - [x] Install React, Inertia.js, 
    - [x] Configure `vite.config.js` for React + Laravel.
    - [x] ShadCN/UI.


- [x] **Database & Authentication**
    - [x] Design initial Database Schema (Users, Roles, Permissions).
    - [x] Implement Authentication (Laravel Breeze/Jetstream or custom Fortify).
    - [x] Implement RBAC (Role-Based Access Control) for Admin, Operations, Support.
    - [x] Create User Management CRUD (Admin only).

- [x] **Queue & Job Infrastructure**
    - [x] Configure Queue Driver (Redis or Database).
    - [x] Create base `Job` classes and failure handling policies.
    - [x] Set up Supervisor (or equivalent) for local queue processing.

- [x] **Shopify API Integration (Foundation)**
    - [x] Create `ShopifyService` class for API interactions.
    - [x] Implement OAuth or Access Token management.
    - [x] Create "Read-Only" connection test (fetch shop details).

---

## Phase 2: Shopify Operations (Weeks 4–6)
**Goal:** Fully usable Shopify backend for Orders and Products.

- [x] **Product Synchronization**
    - [x] Design Database Schema for `products`, `variants`, `inventory`.
    - [x] Create `SyncProductsJob` (Queueable).
    - [ ] Implement Shopify Webhook listeners (Product Create/Update/Delete).
    - [ ] Create Product Listing UI (Search, Filter, Pagination).
    - [ ] Implement Manual "Sync Now" button/endpoint.

- [x] **Order Synchronization**
    - [x] Design Database Schema for `orders`, `order_items`, `customers`, `addresses`.
    - [x] Create `SyncOrdersJob` (Queueable, Bulk & Incremental).
    - [ ] Implement Shopify Webhook listeners (Order Create/Update).
    - [ ] Create Order Listing UI (Status tabs, Search).
    - [ ] Create Order Details View (Customer info, Line items, Payment status).

- [x] **Dashboard & UI**
    - [x] Build Main Dashboard Layout (Sidebar, Header).
    - [ ] Create "Recent Orders" widget.
    - [ ] Implement Sync Status indicators (Last sync time, Error logs).

---

## Phase 3: Courier System (Weeks 7–9)
**Goal:** Fulfillment automation and Courier Management.

- [ ] **Courier Management**
    - [ ] Design Database Schema for `couriers` (Name, API Keys, Settings).
    - [ ] Create Courier CRUD UI (Admin).
    - [ ] Implement "Enable/Disable" toggle for couriers.

- [ ] **Courier Integration**
    - [ ] Create `CourierServiceInterface` for standardizing adapters.
    - [ ] Implement adapters for specific couriers (e.g., FedEx, DHL - *Placeholders or Actual APIs*).
    - [ ] Implement `AssignCourierJob`.

- [ ] **Order Assignment Workflow**
    - [ ] Add "Courier" column to Orders table.
    - [ ] Create UI for manual Courier Assignment (Single Order).
    - [ ] Create UI for Bulk Courier Assignment (Selection checkboxes).
    - [ ] Implement "Courier-wise" Order View (Tabs or Filters).

- [ ] **Tracking**
    - [ ] Design Database Schema for `shipments` / `tracking_logs`.
    - [ ] Implement Tracking Status Sync (Webhook or Polling Job).
    - [ ] Display Tracking History in Order Details.

---

## Phase 4: Advanced Order Automation (Weeks 10–12)
**Goal:** Operational efficiency and Rules.

- [ ] **Automation Rules Engine**
    - [ ] Design Schema for `automation_rules` (Conditions, Actions).
    - [ ] Create Rule Builder UI (e.g., "If Weight > 5kg -> Assign FedEx").
    - [ ] Implement Rule Processing Engine (Service).

- [ ] **Fraud Detection (Basic)**
    - [ ] Implement Rule-based Fraud Checks (High value, Mismatched address).
    - [ ] Add "Risk Flag" to Order UI.

- [ ] **Bulk Workflows & Auditing**
    - [ ] Implement Batch Status Updates.
    - [ ] Create `OrderAuditLog` (Who changed what and when).
    - [ ] View Audit Log in Order Details.

---

## Phase 5: Social Commerce (Weeks 13–16)
**Goal:** Revenue expansion via Social Channels.

- [ ] **Social Platform Integration**
    - [ ] Create `SocialPlatformService` (Abstract/Interface).
    - [ ] Implement Integrations:
        - [ ] Facebook (Graph API).
        - [ ] WhatsApp (Business API).
        - [ ] TikTok/YouTube (Comments/DMs).
    - [ ] Implement Webhook listeners for incoming messages/comments.

- [ ] **Unified Inbox**
    - [ ] Design Schema for `conversations`, `messages`.
    - [ ] Create Unified Inbox UI (Chat-like interface).
    - [ ] Map Social User IDs to E-com Customers (Identity Resolution).

- [ ] **Manual Social Orders**
    - [ ] Create "Create Order" button within Inbox.
    - [ ] Implement "Draft Order" creation flow.
    - [ ] Send Payment Link via Chat.

---

## Phase 6: AI Automation Layer (Weeks 17–20)
**Goal:** AI-driven scale and intelligence.

- [ ] **AI Infrastructure**
    - [ ] Create `AiService` (Centralized handler).
    - [ ] Implement Drivers: OpenAI, Anthropic, Gemini, Grok, Llama.
    - [ ] Implement Fallback/Retry logic for AI APIs.
    - [ ] Create `ai_logs` table for auditing costs and prompts.

- [ ] **Intent Detection**
    - [ ] Create Prompt Templates for Intent Classification ("Buy", "Support", "Spam").
    - [ ] Implement Job to analyze incoming social messages.
    - [ ] Tag Conversations based on Intent.

- [ ] **Automated Order Creation**
    - [ ] Create Prompt for extracting Order Details (Product, Qty, Address).
    - [ ] Implement logic to parse AI JSON output -> Draft Order.
    - [ ] Create "AI Suggestion" UI for agents to approve orders.

- [ ] **Smart Replies**
    - [ ] Create Prompt for generating replies (Brand tone, Context).
    - [ ] Implement "Suggest Reply" button in Inbox.
    - [ ] (Optional) Auto-send replies for high-confidence FAQs.

---

## Phase 7: Optimization & Expansion (Weeks 21+)
**Goal:** Analytics and Enterprise readiness.

- [ ] **Analytics & Reporting**
    - [ ] Create Sales Reports (Daily, Weekly, Courier-wise).
    - [ ] Create Courier Performance Report (Delivery times, Failure rates).
    - [ ] Implement Export to CSV/Excel.

- [ ] **System Optimization**
    - [ ] Implement Redis Caching for heavy queries.
    - [ ] Optimize Database Indexes.
    - [ ] Review and Refactor Queue priorities.

- [ ] **Multi-Store Support**
    - [ ] Refactor Database to be Multi-tenant (Store ID scope).
    - [ ] Update UI to switch between stores.

---

## Technical & Non-Functional Tasks

- [ ] **Testing**
    - [ ] Setup PHPUnit / Pest.
    - [ ] Write Unit Tests for Services (Shopify, Courier, AI).
    - [ ] Write Feature Tests for Critical Flows (Order Sync, Auth).

- [ ] **Security**
    - [ ] Audit API Key storage (Ensure `.env` usage).
    - [ ] Implement API Rate Limiting.
    - [ ] Sanitize all User/AI Inputs.

- [ ] **Documentation**
    - [ ] Maintain API Documentation (if exposing internal APIs).
    - [ ] Update User Guide for Admin Panel.
