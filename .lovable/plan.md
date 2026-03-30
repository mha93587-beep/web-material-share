

## Plan: Create /shared Page for Shared Files

### What We're Building
A dedicated `/shared` page accessible from the "Shared" tab in the mobile nav, showing files that have been shared (files with share links). Follows the same design patterns as the existing `/files` File Manager page.

### Changes

1. **Create `src/pages/SharedPage.tsx`**
   - Reuse the same layout structure as `FilesPage.tsx` (TopAppBar, MobileNav, Footer)
   - Display only files that have share links, with columns: Name, Size, Date, Share Link (with copy button)
   - Include search functionality and list/grid view toggle
   - "Back" button on mobile, header titled "Shared Files"
   - Empty state when no shared files exist

2. **Update `src/App.tsx`**
   - Import `SharedPage` and add route: `<Route path="/shared" element={<SharedPage />} />`

3. **Update `src/components/MobileNav.tsx`**
   - Change the "Shared" tab `href` from `"#"` to `"/shared"`
   - Add active state highlighting for `/shared` path (matching how Home and Files tabs work)

