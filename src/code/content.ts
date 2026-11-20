import type { PageMeta } from "../seo/types";

const CODE_ORIGIN = "https://code.cordoval.co.uk";

/**
 * Cordoval Code product page.
 * British English. Cordoval is a brand, never a company.
 * Windows and Linux only. Do not name other desktop systems.
 * No invented stats, download counts, reviews or version numbers.
 */

export const codeSeo: PageMeta = {
  title: "Cordoval Code | Desktop AI coding",
  description:
    "Cordoval Code is a free, open-source desktop AI coding app for Windows and Linux. Bring your own key. No Cordoval servers, no account, no telemetry.",
  canonical: `${CODE_ORIGIN}/`,
  image: `${CODE_ORIGIN}/cordoval.png`,
  siteName: "Cordoval Code",
};

export const sourceRepo = "https://github.com/Gitkierenoffical/Cordoval-Code";
export const sourceZip = "https://github.com/Gitkierenoffical/Cordoval-Code/archive/refs/heads/main.zip";
export const cloneCommand = "git clone https://github.com/Gitkierenoffical/Cordoval-Code.git";
export const issues = "https://github.com/Gitkierenoffical/Cordoval-Code/issues";

export type CodeScreenshot = {
  src: string;
  alt: string;
  caption: string;
};

/**
 * Real screenshots replace the HTML window.
 * Put the image files in public/code/ and add one entry per file, for example:
 * { src: "/code/editor.webp", alt: "The editor and file tree", caption: "Editor" }
 */
export const screenshots: readonly CodeScreenshot[] = [];

export const hero = {
  eyebrow: "Cordoval Code",
  titleLead: "Desktop AI coding,",
  titleAccent: "on your machine.",
  summary:
    "A free, open-source desktop app for Windows and Linux. It runs on Cordoval's own engine. You bring your own key. No Cordoval servers, no account, no telemetry.",
  facts: ["MIT licence", "Windows and Linux", "OpenRouter by default"],
  download: "Download source (.zip)",
  github: "View on GitHub",
  cloneLabel: "or git clone",
} as const;

export const features = {
  id: "features",
  eyebrow: "What it does",
  title: "A coding desk, with the model beside it.",
  items: [
    {
      title: "Streaming chat",
      body: "Chat that streams, with tool calls to read, write, edit, search, run a shell command and fetch the web.",
    },
    {
      title: "Build and Plan",
      body: "Two modes. Plan is read-only.",
    },
    {
      title: "Undo",
      body: "Revert to any message, and see the diffs.",
    },
    {
      title: "The desk",
      body: "A built-in Monaco editor, a terminal, a file tree and a git changes view.",
    },
    {
      title: "Make it yours",
      body: "MCP servers, custom agents, slash commands and a command palette.",
    },
    {
      title: "Project templates",
      body: "React, Next.js, Electron, Tauri, Android Compose, Expo, Flutter, FastAPI and more.",
    },
    {
      title: "Themes",
      body: "37 themes.",
    },
  ],
} as const;

export const safety = {
  id: "safety",
  eyebrow: "Approvals",
  title: "It asks before it acts.",
  body: "Every shell command, web fetch and write outside the project asks you to allow once, always, or deny.",
  riskyTitle: "Some commands always ask.",
  riskyBody: "sudo, rm -rf, git push, publishing, and curl piped to a shell always ask, with a plain-English risk note.",
  permissions: "A Permissions page lets you revoke rules.",
  choices: ["Allow once", "Always", "Deny"],
} as const;

export const privacy = {
  id: "privacy",
  eyebrow: "Your key",
  title: "Bring your own key.",
  body: "OpenRouter is the default. You can also use OpenAI, Anthropic, Groq, Google Gemini, xAI, or any OpenAI-compatible endpoint.",
  keychain: "The key stays in the OS keychain and is never shown to the AI.",
  none: "No Cordoval servers. No account. No telemetry.",
} as const;

export const source = {
  id: "source",
  eyebrow: "Open source",
  title: "MIT licence.",
  body: "The full source folder is what you download. Follow Install to run it. There is no separate installer to fetch first.",
  cta: "View on GitHub",
} as const;

export const requirements = {
  id: "requirements",
  eyebrow: "Requirements",
  title: "Windows and Linux.",
  items: ["Windows 10/11, x64", "A modern 64-bit Linux", "Node.js 22 or newer", "About 1 GB free disk for dependencies"],
} as const;

export const faq = {
  id: "faq",
  title: "Questions",
  items: [
    {
      question: "What is Cordoval Code?",
      answer:
        "A free, open-source desktop AI coding app from Cordoval, for Windows and Linux. It runs on Cordoval's own engine.",
    },
    {
      question: "Which systems can run it?",
      answer:
        "Windows 10/11, x64, or a modern 64-bit Linux. You also need Node.js 22 or newer, and about 1 GB of free disk for the dependencies.",
    },
    {
      question: "Do I need an account?",
      answer: "No. There are no Cordoval servers, no account and no telemetry.",
    },
    {
      question: "Where does my key go?",
      answer:
        "You bring your own key. It stays in the OS keychain and is never shown to the AI. OpenRouter is the default. You can also use OpenAI, Anthropic, Groq, Google Gemini, xAI, or any OpenAI-compatible endpoint.",
    },
    {
      question: "What can a chat do?",
      answer:
        "Streaming chat can call tools to read, write, edit, search, run a shell command and fetch the web. Build and Plan are the two modes. Plan is read-only.",
    },
    {
      question: "What has to be approved?",
      answer:
        "Every shell command, web fetch and write outside the project asks you to allow once, always, or deny. sudo, rm -rf, git push, publishing, and curl piped to a shell always ask, with a plain-English risk note. You can revoke rules on the Permissions page.",
    },
    {
      question: "Can I undo a change?",
      answer: "Yes. You can revert to any message, and see the diffs.",
    },
    {
      question: "How do I install it?",
      answer:
        "Download the source zip, or clone the repository, then follow the Install section. You run it with npm start. There is no installer to download first.",
    },
    {
      question: "Can I build an installer myself?",
      answer:
        "Yes, after it runs from source. On Windows, npm run dist:win writes an NSIS exe to dist/. On Linux, npm run dist:linux writes an AppImage to dist/.",
    },
    {
      question: "How do I reach you?",
      answer: "Email management@cordoval.co.uk. That is the only contact.",
    },
  ],
} as const;

export const codeNav = [
  { href: "#install", label: "Install" },
  { href: "#features", label: "Features" },
  { href: "#safety", label: "Approvals" },
  { href: "#privacy", label: "Your key" },
  { href: "#source", label: "Source" },
  { href: "#faq", label: "Questions" },
] as const;

export const codeFooter = {
  line: "Cordoval Code is a free, open-source desktop app from Cordoval.",
  email: "management@cordoval.co.uk",
  brandLabel: "cordoval.co.uk",
  brandHref: "https://cordoval.co.uk/",
  sourceLabel: "Source on GitHub",
} as const;
