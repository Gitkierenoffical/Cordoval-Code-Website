import { useState, type KeyboardEvent } from "react";
import { CommandLine } from "./CommandLine";
import { install, installTabs, trouble, type InstallStep } from "./install";

export function InstallGuide() {
  const [active, setActive] = useState(installTabs[0].id);
  const current = installTabs.find((tab) => tab.id === active) ?? installTabs[0];

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = installTabs.findIndex((tab) => tab.id === active);
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = event.key === "ArrowRight" ? index + 1 : index - 1;
    const tab = installTabs[(next + installTabs.length) % installTabs.length];
    setActive(tab.id);
    document.getElementById(`install-tab-${tab.id}`)?.focus();
  }

  return (
    <>
      <section id={install.id} aria-labelledby="install-title" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#0A5CFF]">{install.eyebrow}</p>
          <h2 id="install-title" className="mt-3 max-w-4xl text-[clamp(2.8rem,6vw,5.2rem)] font-extrabold leading-[0.9] tracking-tight">
            {install.title}
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#1C2E5A]">{install.intro}</p>
          <div
            role="tablist"
            aria-label="Install instructions by system"
            className="mt-10 flex flex-wrap gap-2"
            onKeyDown={onKeyDown}
          >
            {installTabs.map((tab) => {
              const selected = tab.id === current.id;
              return (
                <button
                  key={tab.id}
                  id={`install-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`install-panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  className={`min-h-11 rounded-full px-4 py-2 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A5CFF] ${selected ? "bg-[#0A5CFF] text-white" : "bg-[#E7EEFF] text-[#0B1B4A]"}`}
                  onClick={() => setActive(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div
            role="tabpanel"
            id={`install-panel-${current.id}`}
            aria-labelledby={`install-tab-${current.id}`}
            className="mt-10"
          >
            <ol key={current.id} className="space-y-10">
              {current.steps.map((step, index) => (
                <li key={step.title}>
                  <Step step={step} number={index + 1} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section id={trouble.id} aria-labelledby="trouble-title" className="scroll-mt-24 bg-[#E7EEFF]">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#0A5CFF]">{trouble.eyebrow}</p>
          <h2 id="trouble-title" className="mt-3 text-[clamp(2.1rem,8.5vw,5rem)] font-extrabold leading-[0.9] tracking-tight">
            {trouble.title}
          </h2>
          <div className="mt-8 divide-y divide-[#0B1B4A]/15 border-y border-[#0B1B4A]/15">
            {trouble.items.map((item) => (
              <details key={item.question} className="py-5">
                <summary className="cursor-pointer text-xl font-extrabold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A5CFF]">
                  {item.question}
                </summary>
                <p className="mt-3 text-lg leading-relaxed text-[#1C2E5A]">{item.answer}</p>
                {"commands" in item
                  ? item.commands.map((command) => {
                      const note = "note" in command ? command.note : undefined;
                      return (
                        <div key={`${note ?? ""}-${command.command}`}>
                          <CommandLine command={command.command} note={note} />
                        </div>
                      );
                    })
                  : null}
                {"links" in item ? <LinkList links={item.links} /> : null}
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Step({ step, number }: { step: InstallStep; number: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-[3.5rem_1fr]">
      <p className="text-3xl font-extrabold leading-none text-[#0A5CFF]" aria-hidden="true">
        {number}
      </p>
      <div className="min-w-0">
        <h3 className="text-2xl font-extrabold tracking-tight">
          <span className="sr-only">Step {number}. </span>
          {step.title}
        </h3>
        <p className="mt-3 text-lg leading-relaxed text-[#1C2E5A]">{step.body}</p>
        {step.links ? <LinkList links={step.links} /> : null}
        {step.commands?.map((command) => (
          <div key={`${command.note ?? ""}-${command.command}`}>
            <CommandLine command={command.command} note={command.note} />
          </div>
        ))}
      </div>
    </div>
  );
}

function LinkList({ links }: { links: readonly { href: string; label: string }[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <a className="font-bold text-[#0A5CFF] underline-offset-4 hover:underline" href={link.href}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
