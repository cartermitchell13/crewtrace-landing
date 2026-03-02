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

## Notes

- Additional non-priority trades can remain in the dataset, but cannot replace these required rows.
- Ownership checks are enforced in `scripts/seo/check-cluster-content.mjs`.
- Regression tests for required trade presence are enforced in `lib/__tests__/cluster-coverage.test.ts`.
