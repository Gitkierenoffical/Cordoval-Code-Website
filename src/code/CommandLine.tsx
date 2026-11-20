import { useState } from "react";

export function CommandLine({ command, note }: { command: string; note?: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-3 min-w-0">
      {note ? <p className="mb-2 text-sm leading-relaxed text-[#1C2E5A]">{note}</p> : null}
      <pre className="max-w-full overflow-x-auto rounded-xl bg-[#07111F] px-4 py-3 font-mono text-sm leading-6 text-[#E7EEFF]">
        <code>{command}</code>
      </pre>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Copied" : `Copy ${command}`}
        className="mt-2 inline-flex min-h-11 items-center rounded-xl bg-[#0A5CFF] px-4 text-sm font-bold text-white hover:bg-[#0847CC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A5CFF]"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <p className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </p>
    </div>
  );
}
