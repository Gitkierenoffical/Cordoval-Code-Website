export type InstallCommand = {
  command: string;
  note?: string;
};

export type InstallLink = {
  href: string;
  label: string;
};

export type InstallStep = {
  title: string;
  body: string;
  commands?: readonly InstallCommand[];
  links?: readonly InstallLink[];
};

export type InstallTab = {
  id: string;
  label: string;
  steps: readonly InstallStep[];
};

const keyLinks: readonly InstallLink[] = [
  { href: "https://openrouter.ai/keys", label: "openrouter.ai/keys" },
  { href: "https://platform.openai.com", label: "platform.openai.com" },
  { href: "https://console.anthropic.com", label: "console.anthropic.com" },
  { href: "https://console.groq.com", label: "console.groq.com" },
  { href: "https://aistudio.google.com", label: "aistudio.google.com" },
];

const firstRun: InstallStep = {
  title: "Add your key on the first run",
  body: "Open a project folder, open Settings, and add your own API key. OpenRouter is the one to start with. You can also use OpenAI, Anthropic, Groq, Google Gemini, xAI, or any OpenAI-compatible endpoint. The key goes into the OS keychain. It is never sent to the AI, and never sent to Cordoval.",
  links: keyLinks,
};

const dependencies: InstallStep = {
  title: "Install dependencies",
  body: "This downloads the packages the app needs. The first time takes a few minutes.",
  commands: [{ command: "npm install" }],
};

const run: InstallStep = {
  title: "Run it",
  commands: [{ command: "npm start" }],
  body: "The app window opens from this folder. Leave the terminal open while you use it.",
};

const update: InstallStep = {
  title: "Update later",
  body: "If you cloned the repository, pull and install again. If you used the zip, download it again and repeat the install in the new folder.",
  commands: [{ command: "git pull && npm install" }],
};

const tests: InstallStep = {
  title: "Optional: run the tests",
  body: "You can skip this. It checks the project, and it is not required to use the app.",
  commands: [{ command: "npm test" }],
};

const getSource = (shell: string): InstallStep => ({
  title: "Get the source",
  body: "Download the zip and unzip it. GitHub names that folder Cordoval-Code-main. Or clone the repository, which creates a folder called Cordoval-Code. Then move into the folder.",
  commands: [
    { command: "cd Cordoval-Code-main", note: `${shell}, after the zip.` },
    { command: "cd Cordoval-Code", note: `${shell}, after git clone.` },
  ],
});

const nvmCommands: readonly InstallCommand[] = [
  { command: "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.8/install.sh | bash", note: "Install nvm. Then close the terminal and open it again." },
  { command: "nvm install 22", note: "In the new terminal." },
  { command: "node -v", note: "The first number must be 22 or higher." },
];

export const install = {
  id: "install",
  eyebrow: "Install",
  title: "Get the source, then run it.",
  intro:
    "Download the full source folder, or clone it, and follow the steps for your system. There is no installer to run first.",
} as const;

export const installTabs: readonly InstallTab[] = [
  {
    id: "windows",
    label: "Windows 10/11",
    steps: [
      {
        title: "Install Node.js 22",
        body: "Cordoval Code needs Node.js 22 or newer. Use the installer on nodejs.org, or install the current long-term release from a terminal. Then open a new terminal and check the version.",
        links: [{ href: "https://nodejs.org", label: "nodejs.org" }],
        commands: [
          { command: "winget install OpenJS.NodeJS.LTS" },
          { command: "node -v", note: "The first number must be 22 or higher." },
        ],
      },
      {
        title: "Install Git, if you want to clone",
        body: "Git is optional when you download the zip. Install it if you want to use git clone.",
        links: [{ href: "https://git-scm.com", label: "git-scm.com" }],
        commands: [{ command: "winget install Git.Git" }],
      },
      getSource("PowerShell"),
      dependencies,
      {
        title: "Only if a native module fails to build",
        body: "The terminal module ships prebuilt binaries, so a normal install does not need a C++ compiler. If npm install reports a native build error, install the Visual Studio Build Tools, delete node_modules, and run npm install again.",
        commands: [
          {
            command:
              'winget install Microsoft.VisualStudio.2022.BuildTools --override "--wait --passive --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"',
          },
          { command: "Remove-Item -Recurse -Force node_modules" },
          { command: "npm install" },
        ],
      },
      run,
      firstRun,
      {
        title: "Optional: build an installer",
        body: "After the app runs from source, you can build a Windows NSIS exe for yourself. The file is written to dist/.",
        commands: [{ command: "npm run dist:win" }],
      },
      update,
      tests,
    ],
  },
  {
    id: "debian",
    label: "Ubuntu and Debian",
    steps: [
      {
        title: "Install Node.js 22",
        body: "Cordoval Code needs Node.js 22 or newer. nvm is the direct way. NodeSource is the other. Check the version afterwards.",
        links: [{ href: "https://nodejs.org", label: "nodejs.org" }],
        commands: [
          ...nvmCommands,
          { command: "curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -", note: "Or use NodeSource instead of nvm." },
          { command: "sudo apt-get install -y nodejs", note: "After the NodeSource setup script." },
        ],
      },
      {
        title: "Install Git, if you want to clone",
        body: "Git is optional when you download the zip.",
        links: [{ href: "https://git-scm.com", label: "git-scm.com" }],
        commands: [{ command: "sudo apt update" }, { command: "sudo apt install -y git" }],
      },
      {
        title: "Install the build tools and libraries",
        body: "Electron needs these to build and to open a window. If apt cannot find libgtk-3-0 or libasound2, install libgtk-3-0t64 and libasound2t64 instead.",
        commands: [
          {
            command: "sudo apt install -y build-essential python3 libsecret-1-dev libnss3 libgtk-3-0 libasound2 libgbm1",
          },
        ],
      },
      {
        title: "Use a keyring",
        body: "A keyring is recommended so keys are stored securely. gnome-keyring is the usual choice. On KDE, KWallet is the equivalent. The app warns if none is available. Unlock the keyring when you sign in.",
        commands: [{ command: "sudo apt install -y gnome-keyring" }],
      },
      getSource("bash"),
      dependencies,
      run,
      firstRun,
      {
        title: "Optional: build an AppImage",
        body: "After the app runs from source, you can build an AppImage for yourself. The file is written to dist/.",
        commands: [{ command: "npm run dist:linux" }],
      },
      update,
      tests,
    ],
  },
  {
    id: "fedora",
    label: "Fedora",
    steps: [
      {
        title: "Install Node.js 22",
        body: "Cordoval Code needs Node.js 22 or newer. nvm is the direct way. NodeSource is the other. Check the version afterwards.",
        links: [{ href: "https://nodejs.org", label: "nodejs.org" }],
        commands: [
          ...nvmCommands,
          { command: "curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -", note: "Or use NodeSource instead of nvm." },
          { command: "sudo dnf install -y nodejs", note: "After the NodeSource setup script." },
        ],
      },
      {
        title: "Install Git, if you want to clone",
        body: "Git is optional when you download the zip.",
        links: [{ href: "https://git-scm.com", label: "git-scm.com" }],
        commands: [{ command: "sudo dnf install -y git" }],
      },
      {
        title: "Install the build tools and libraries",
        body: "These are the Fedora packages for the same build tools and Electron libraries: a compiler, Python, libsecret, NSS, GTK, ALSA and GBM.",
        commands: [{ command: "sudo dnf install -y gcc-c++ make python3 libsecret-devel nss gtk3 alsa-lib mesa-libgbm" }],
      },
      {
        title: "Use a keyring",
        body: "A keyring is recommended so keys are stored securely. gnome-keyring is the usual choice. On KDE, KWallet is the equivalent. The app warns if none is available. Unlock the keyring when you sign in.",
        commands: [{ command: "sudo dnf install -y gnome-keyring" }],
      },
      getSource("bash"),
      dependencies,
      run,
      firstRun,
      {
        title: "Optional: build an AppImage",
        body: "After the app runs from source, you can build an AppImage for yourself. The file is written to dist/.",
        commands: [{ command: "npm run dist:linux" }],
      },
      update,
      tests,
    ],
  },
  {
    id: "arch",
    label: "Arch",
    steps: [
      {
        title: "Install Node.js 22",
        body: "Cordoval Code needs Node.js 22 or newer. Use nvm so you get 22, then check the version. The Arch nodejs package may be a different release.",
        links: [{ href: "https://nodejs.org", label: "nodejs.org" }],
        commands: nvmCommands,
      },
      {
        title: "Install Git, if you want to clone",
        body: "Git is optional when you download the zip.",
        links: [{ href: "https://git-scm.com", label: "git-scm.com" }],
        commands: [{ command: "sudo pacman -S --needed git" }],
      },
      {
        title: "Install the build tools and libraries",
        body: "These are the Arch packages for the same build tools and Electron libraries: base-devel, Python, libsecret, NSS, GTK, ALSA and GBM.",
        commands: [{ command: "sudo pacman -S --needed base-devel python libsecret nss gtk3 alsa-lib libgbm" }],
      },
      {
        title: "Use a keyring",
        body: "A keyring is recommended so keys are stored securely. gnome-keyring is the usual choice. On KDE, KWallet is the equivalent. The app warns if none is available. Unlock the keyring when you sign in.",
        commands: [{ command: "sudo pacman -S --needed gnome-keyring" }],
      },
      getSource("bash"),
      dependencies,
      run,
      firstRun,
      {
        title: "Optional: build an AppImage",
        body: "After the app runs from source, you can build an AppImage for yourself. The file is written to dist/.",
        commands: [{ command: "npm run dist:linux" }],
      },
      update,
      tests,
    ],
  },
];

export const trouble = {
  id: "troubleshooting",
  eyebrow: "If it fails",
  title: "Troubleshooting",
  items: [
    {
      question: "npm install fails on node-pty or another native module",
      answer:
        "Install the build tools from the Install section for your system. Then delete node_modules and run npm install again.",
      commands: [
        { command: "rm -rf node_modules", note: "bash" },
        { command: "Remove-Item -Recurse -Force node_modules", note: "PowerShell" },
        { command: "npm install" },
      ],
    },
    {
      question: "Electron reports a sandbox error on Linux",
      answer:
        "chrome-sandbox must be owned by root and marked setuid. From the project folder, set that on the Electron binary. If you cannot, you can start without the sandbox. That is less safe, because the window is less isolated from the rest of the system.",
      commands: [
        { command: "sudo chown root:root node_modules/electron/dist/chrome-sandbox" },
        { command: "sudo chmod 4755 node_modules/electron/dist/chrome-sandbox" },
        { command: "npm start -- --no-sandbox", note: "Only if you cannot set the sandbox permissions." },
      ],
    },
    {
      question: "The window is blank, or the GPU misbehaves",
      answer: "A blank window is often the GPU process. Start again with GPU acceleration off.",
      commands: [{ command: "npm start -- --disable-gpu" }],
    },
    {
      question: "Linux says there is no secure key storage",
      answer:
        "Install gnome-keyring, or KWallet on KDE, and unlock it before you open the app. The app warns when it cannot find a keyring.",
      commands: [
        { command: "sudo apt install -y gnome-keyring", note: "Ubuntu and Debian" },
        { command: "sudo dnf install -y gnome-keyring", note: "Fedora" },
        { command: "sudo pacman -S --needed gnome-keyring", note: "Arch" },
      ],
    },
    {
      question: "The Node.js version is wrong",
      answer: "node -v must start with 22 or a higher number. Install Node.js 22 from the Install section, then open a new terminal.",
      commands: [{ command: "node -v" }],
    },
    {
      question: "PowerShell blocks npm scripts",
      answer: "If PowerShell says running scripts is disabled, npm cannot start. This allows scripts for your user only.",
      commands: [{ command: "Set-ExecutionPolicy -Scope CurrentUser RemoteSigned" }],
    },
    {
      question: "Where do I report a problem?",
      answer: "Open a GitHub issue, or email management@cordoval.co.uk.",
      links: [{ href: "https://github.com/Gitkierenoffical/Cordoval-Code/issues", label: "GitHub Issues" }],
    },
  ],
} as const;
