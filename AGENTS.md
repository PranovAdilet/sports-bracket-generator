<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

UI Components Usage

When creating UI components:

ALWAYS use existing components from shared/ui if they are available.
If a required component does not exist in shared/ui, only then create or use an external/custom one.
Avoid duplicating UI primitives that already exist in shared/ui.

<!-- END:nextjs-agent-rules -->
