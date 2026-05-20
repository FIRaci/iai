---
phase: 2
title: "Sync CategoryPage with sidebar categories"
status: pending
priority: P1
effort: "1h"
dependencies: []
---

# Phase 02: Sync CategoryPage with Sidebar Categories

## Overview
Add all missing category configurations to `CategoryPage.tsx` so every sidebar nav group has a matching category page. Currently 12+ categories show "Không tìm thấy danh mục".

## Requirements
- Every sidebar nav group must have a CategoryPage config entry
- Category icons must match sidebar icons
- Category titles must match sidebar titles
- Category descriptions should be auto-generated from content count

## Architecture
Current problem: Sidebar uses hardcoded `navItems` array (23 groups) while CategoryPage uses separate hardcoded `categoryConfig` object (16 entries). No single source of truth.

Solution: Add missing category configs to CategoryPage. Map each sidebar path to its config entry.

### Missing categories to add:
| Sidebar Path | Sidebar Title | Icon |
|-------------|--------------|------|
| `/frontend` | Frontend | Monitor |
| `/backend` | Backend | Server |
| `/ai-creative` | AI Creative | Palette |
| `/video` | Video & Media | Video |
| `/visualization` | Visualization | BarChart3 |
| `/databases` | Data & Databases | Database |
| `/ml-training` | ML & Training | Brain |
| `/cloud` | Cloud & Model Hubs | Cloud |
| `/evaluation` | Evaluation & Benchmarking | TestTube |
| `/testing` | Testing | TestTube |
| `/devops` | DevOps & Infra | FolderTree |
| `/search` | Search & Automation | Workflow |
| `/package-managers` | Package Managers | Package |
| `/utilities` | Utilities | Settings |
| `/documentation` | Documentation | FileText |
| `/notebooks` | Notebooks | Notebook |
| `/windows-setup` | Windows 11 Setup | Monitor |

### Remove stale configs (not in sidebar):
- `ai-coding`, `multimodal`, `productivity`, `voice-audio`, `ide-plugins`, `dev-infra`, `vector-db`, `datasets`, `mlops`, `other`

## Related Code Files
- Modify: `src/pages/CategoryPage.tsx` (lines 25-122, categoryConfig object)
- Read: `src/components/layout/Sidebar.tsx` (navItems array for reference)

## Implementation Steps
1. Read CategoryPage.tsx categoryConfig object
2. Add all 17 missing category entries with correct icons and titles
3. Remove 10 stale category entries that don't exist in sidebar
4. Verify icon imports match Lucide icons used in Sidebar
5. Test: navigate to each category URL — should show grid, not "not found"

## Success Criteria
- [ ] All 23 sidebar categories have CategoryPage configs
- [ ] No stale category configs remain
- [ ] Icons match between sidebar and category page
- [ ] All category URLs render correctly
- [ ] Build passes

## Risk Assessment
- **Risk**: Icon names might not match between Sidebar and CategoryPage
- **Mitigation**: Cross-reference with Sidebar.tsx imports
