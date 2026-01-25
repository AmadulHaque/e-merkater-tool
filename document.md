## 3.12.1 Multi-Tenancy Model

### Tenant Definition

* Each **tenant = one business / company**
* A tenant owns:

  * Users & roles
  * Facebook pages & WhatsApp numbers
  * Products, customers, orders
  * Courier integrations
  * AI configurations & automations
  * Reports & analytics

### Isolation Strategy

* **Single database, tenant-scoped data**
* Every core table includes `tenant_id`
* Strict tenant scoping via:

  * Global query scopes
  * Middleware enforcement
  * Policy-based authorization

> ❗ No tenant can access another tenant’s data under any condition.

---

## 3.12.2 Tenant Lifecycle Management

### Features

* Tenant creation (manual or self-signup)
* Tenant onboarding wizard
* Business profile & settings
* Domain / subdomain mapping (optional)

  * `tenant-name.e-merkater.com`
* Tenant suspension / reactivation
* Soft deletion & data retention policies

---

## 3.12.3 Multi-Tenant User & Role System

### Features

* Users belong to **one tenant**
* Role-based access per tenant
* Tenant-specific permissions
* Separate admins per tenant
* Optional super-admin (platform owner)

### Example Roles

* Tenant Admin
* Marketing Manager
* Sales Operator
* Support Agent

---

## 3.12.4 Multi-Tenant Automation Isolation

### Facebook Automation

* Each tenant connects **own Facebook pages**
* Separate automation rules per tenant
* Isolated AI training context

### WhatsApp Automation

* Tenant-specific WhatsApp Business numbers
* Independent message templates
* Isolated chatbot flows

### AI Context Isolation

* AI prompts scoped by tenant
* No cross-tenant data leakage
* Tenant-level AI tuning & rules

---

## 3.12.5 Multi-Tenant Data Scraping

### Features

* Scraped data tagged by tenant
* Tenant-level scraping limits
* Separate lead pools per tenant
* Export restricted to owning tenant

---

## 3.12.6 Multi-Tenant Courier Management

### Features

* Tenant-specific courier accounts
* Independent rate cards
* Isolated shipment tracking
* Separate COD reconciliation
* Tenant-wise courier performance analytics

---

## 3.12.7 Multi-Tenant Analytics & Reporting

### Features

* Tenant-only dashboards
* Business-specific KPIs
* Tenant-level export permissions
* Super-admin aggregated view (optional)

---

## 3.12.8 Subscription & Plan Control (Future-Ready)

### Plan-Based Limits (Optional)

* Number of users
* Facebook pages
* WhatsApp numbers
* Monthly messages
* Data scraping limits
* Courier integrations
* AI request quotas

### Billing Ready

* Monthly / yearly subscriptions
* Feature toggles by plan
* Usage-based billing support

---

## 3.12.9 Technical Multi-Tenant Implementation

### Backend (Laravel)

* Tenant resolution middleware
* Global tenant scopes
* Policy-based authorization
* Queue jobs tenant-aware
* Cache isolation per tenant

### Frontend (Inertia.js)

* Tenant context auto-injected
* Tenant-specific UI & branding
* Feature flags per tenant

### Security

* Enforced tenant boundaries
* Audit logs per tenant
* Rate limiting per tenant
* Encrypted tenant credentials

---

## 3.12.10 Benefits of Multi-Tenancy

* SaaS-ready architecture
* Lower infrastructure cost
* Easier maintenance & updates
* Scalable onboarding
* Centralized platform control

