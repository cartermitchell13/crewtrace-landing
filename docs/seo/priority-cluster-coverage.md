# Priority Cluster Coverage Matrix

This matrix defines the minimum trade coverage for the phase 2 priority cluster.
Each required trade must have:

1. A live industry page in `lib/industries.ts`.
2. At least one related feature link from that industry page.
3. Crawl access from `/industries` hub and feature cross-links.

## Required Trades

| Trade slug | Industry page | Related feature slugs |
|------------|---------------|-----------------------|
| `construction` | `/industries/construction` | `gps-time-tracking`, `payroll-leakage-prevention`, `dol-compliance` |
| `hvac` | `/industries/hvac` | `gps-time-tracking`, `payroll-exports`, `dol-compliance` |
| `waterproofing` | `/industries/waterproofing` | `geofencing-time-clock`, `payroll-leakage-prevention`, `payroll-exports` |
| `general-contractors` | `/industries/general-contractors` | `payroll-leakage-prevention`, `dol-compliance`, `payroll-exports` |
| `landscaping` | `/industries/landscaping` | `geofencing-time-clock`, `gps-time-tracking`, `payroll-leakage-prevention` |

## Phase 3 Expansion Records

The expansion set below is eligible only when each record maintains:
- unique `primaryIntent` ownership in its cluster
- reciprocal cross-cluster links
- non-orphan sibling eligibility under overlap ranking rules

| Expansion type | Slug | URL | Reciprocal links |
|----------------|------|-----|------------------|
| Feature | `overtime-alerts` | `/features/overtime-alerts` | `construction`, `hvac`, `roofing`, `electrical` |
| Industry | `electrical` | `/industries/electrical` | `overtime-alerts`, `payroll-leakage-prevention`, `dol-compliance` |

## Notes

- Additional non-priority trades can remain in the dataset, but cannot replace these required rows.
- Ownership checks are enforced in `scripts/seo/check-cluster-content.mjs`.
- Regression tests for required trade presence and expansion eligibility are enforced in `lib/__tests__/cluster-coverage.test.ts`.
