const fs = require("fs");

if (!fs.existsSync(".next")) {
  console.error(
    "Missing .next after next build. Use default Next output (no distDir in next.config) and in Vercel: Framework = Next.js, clear Output Directory override."
  );
  process.exit(1);
}
