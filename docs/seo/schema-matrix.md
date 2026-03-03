# Schema Matrix

## Global
| Template | Required schema |
|----------|-----------------|
| Root layout | Organization, WebSite |

## Primary Templates
| Template file | Required schema |
|---------------|-----------------|
| `app/page.tsx` | FAQPage |
| `app/blog/[slug]/page.tsx` | Article, BreadcrumbList |
| `app/guides/[slug]/page.tsx` | Article, BreadcrumbList |
| `app/case-studies/[slug]/page.tsx` | Article, BreadcrumbList |
| `app/features/[slug]/page.tsx` | Article, BreadcrumbList |
| `app/industries/[slug]/page.tsx` | Article, BreadcrumbList |

## Notes
- All schema output should be generated through `lib/schema.ts` builders.
- Breadcrumb items should use absolute URLs derived from site configuration.
- Missing required schema for any listed template should fail automated checks.

