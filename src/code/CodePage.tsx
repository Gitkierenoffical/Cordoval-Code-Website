import { useState } from "react";
import ResponsiveNav from "../components/ResponsiveNav";
import { usePageMeta } from "../seo/usePageMeta";
import "../brand.css";
import "./code.css";
import { CommandLine } from "./CommandLine";
import {
  cloneCommand,
  codeFooter,
  codeNav,
  codeSeo,
  faq,
  features,
  hero,
  privacy,
  requirements,
  safety,
  screenshots,
  source,
  sourceRepo,
  sourceZip,
} from "./content";
import { InstallGuide } from "./InstallGuide";

const buttonClass =
  "inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-center text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const editorLines = ["export function greet() {", '  return "Hello";', "}"];

export default function CodePage() {
  usePageMeta(codeSeo);
  const [paused, setPaused] = useState(false);

  return (
    <div className="page-shell min-h-screen text-[#0B1B4A]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[#0B1B4A]"
      >
        Skip to content
      </a>
      <CodeHeader />
      <main id="main">
        <Hero paused={paused} onTogglePause={() => setPaused((value) => !value)} />
        <InstallGuide />
        <FeatureGrid />
        <Safety />
        <Privacy />
        <OpenSource />
        <Requirements />
        <Faq />
      </main>
      <CodeFooter />
    </div>
  );
}

function CodeHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B1B4A]/95 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a
          href="/"
          className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <img src="/cordoval.svg" alt="" width={40} height={40} className="h-9 w-9 sm:h-10 sm:w-10" />
          <span className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">Cordoval Code</span>
        </a>
        <ResponsiveNav
          tone="inverse"
          items={codeNav}
          action={
            <a
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0A5CFF] hover:bg-[#E8F0FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:w-auto"
              href={sourceZip}
            >
              Source zip
            </a>
          }
        />
      </div>
    </header>
  );
}

function Hero({ paused, onTogglePause }: { paused: boolean; onTogglePause: () => void }) {
  return (
    <section
      className={`relative overflow-hidden bg-[#071433] text-white ${paused ? "brand-motion-off" : ""}`}
      aria-labelledby="code-hero-title"
    >
      <div className="brand-hero-fx pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="brand-hero-wash pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid min-w-0 max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#9EBEFF]">{hero.eyebrow}</p>
          <h1 id="code-hero-title" className="mt-4 max-w-full text-[clamp(3.2rem,7vw,6.4rem)] font-extrabold leading-[0.88] tracking-tight">
            {hero.titleLead}
            <span className="brand-outline mt-1 block">{hero.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#E7EEFF] sm:text-xl">{hero.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {hero.facts.map((fact) => (
              <li key={fact} className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#0B1B4A]">
                {fact}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a className={`${buttonClass} bg-white text-[#0A5CFF] hover:bg-[#E8F0FF] focus-visible:outline-white`} href={sourceZip}>
              {hero.download}
            </a>
            <a
              className={`${buttonClass} bg-transparent text-white ring-2 ring-white hover:bg-white/10 focus-visible:outline-white`}
              href={sourceRepo}
            >
              {hero.github}
            </a>
          </div>
          <div className="mt-5 min-w-0">
            <p className="text-base font-semibold text-[#E7EEFF]">{hero.cloneLabel}</p>
            <CommandLine command={cloneCommand} />
          </div>
        </div>
        <div className="min-w-0">
          <WindowOrShots />
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              className="brand-pause inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold ring-1 ring-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-pressed={paused}
              onClick={onTogglePause}
            >
              {paused ? "Play motion" : "Pause motion"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function WindowOrShots() {
  if (screenshots.length > 0) {
    return (
      <ul className="grid gap-4">
        {screenshots.map((shot) => (
          <li key={shot.src}>
            <figure className="overflow-hidden rounded-2xl bg-[#0B1B4A] ring-1 ring-white/15">
              <img src={shot.src} alt={shot.alt} className="h-auto w-full" />
              <figcaption className="px-4 py-3 text-sm font-semibold text-[#E7EEFF]">{shot.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    );
  }

  return <WindowIllustration />;
}

function WindowIllustration() {
  return (
    <figure className="overflow-hidden rounded-2xl bg-[#0B1B4A] shadow-[0_28px_70px_-32px_rgba(0,0,0,0.85)] ring-1 ring-white/15">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <p className="text-sm font-semibold text-white">Cordoval Code</p>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9EBEFF]">Illustration</p>
      </div>
      <div className="grid lg:grid-cols-[8.5rem_1fr_13.5rem]">
        <div className="border-b border-white/10 px-4 py-4 text-sm text-[#D6E4FF] lg:border-b-0 lg:border-r">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9EBEFF]">Files</p>
          <ul className="mt-3 space-y-1.5">
            <li>src</li>
            <li className="pl-3 font-semibold text-white">greet.ts</li>
            <li className="pl-3">package.json</li>
          </ul>
        </div>
        <div className="border-b border-white/10 bg-[#07111F] px-4 py-4 font-mono text-[13px] leading-6 text-[#E7EEFF] lg:border-b-0 lg:border-r" aria-hidden="true">
          {editorLines.map((line, index) => (
            <p key={line}>
              <span className="mr-3 inline-block w-4 text-right text-[#9EBEFF]">{index + 1}</span>
              {line}
              {index === 1 ? <span className="code-caret ml-0.5 inline-block h-4 w-px bg-[#0A5CFF] align-middle" /> : null}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-3 bg-[#0B1B4A] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9EBEFF]">Chat</p>
          <p className="text-sm leading-relaxed text-white">Add a greeting.</p>
          <p className="rounded-lg bg-white/10 px-3 py-2 text-sm text-[#E7EEFF]">read src/greet.ts</p>
          <div className="rounded-xl bg-white p-3 text-[#0B1B4A]">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0A5CFF]">Shell</p>
            <p className="mt-1 font-mono text-sm">npm test</p>
            <p className="mt-2 text-sm leading-snug">This runs a shell command in the project.</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {safety.choices.map((choice, index) => (
                <li
                  key={choice}
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${index === 0 ? "bg-[#0A5CFF] text-white" : "ring-1 ring-[#0B1B4A]/20"}`}
                >
                  {choice}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        Illustration of the Cordoval Code window, with a file tree, an editor, a chat and an approval prompt. This is not a screenshot.
      </figcaption>
    </figure>
  );
}

function FeatureGrid() {
  return (
    <section id={features.id} aria-labelledby="features-title" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#0A5CFF]">{features.eyebrow}</p>
        <h2 id="features-title" className="mt-3 max-w-4xl text-[clamp(2.8rem,6vw,5.2rem)] font-extrabold leading-[0.9] tracking-tight">
          {features.title}
        </h2>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] bg-[#0B1B4A]/10 sm:grid-cols-2">
          {features.items.map((item) => (
            <li key={item.title} className={`bg-white p-6 sm:p-8 ${item.title === "Themes" ? "sm:col-span-2" : ""}`}>
              <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{item.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-[#1C2E5A]">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Safety() {
  return (
    <section id={safety.id} aria-labelledby="safety-title" className="scroll-mt-24 bg-[#07111F] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#9EBEFF]">{safety.eyebrow}</p>
        <h2 id="safety-title" className="mt-3 max-w-4xl text-[clamp(2.8rem,6vw,5.2rem)] font-extrabold leading-[0.9] tracking-tight">
          {safety.title}
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#E7EEFF] sm:text-xl">{safety.body}</p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-3">
          {safety.choices.map((choice) => (
            <li key={choice} className="rounded-2xl bg-[#0A5CFF] px-5 py-6 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {choice}
            </li>
          ))}
        </ul>
        <div className="mt-10 max-w-3xl border-l-4 border-[#0A5CFF] pl-5">
          <h3 className="text-2xl font-extrabold tracking-tight">{safety.riskyTitle}</h3>
          <p className="mt-3 text-lg leading-relaxed text-[#D6E4FF]">{safety.riskyBody}</p>
          <p className="mt-3 text-lg leading-relaxed text-[#D6E4FF]">{safety.permissions}</p>
        </div>
      </div>
    </section>
  );
}

function Privacy() {
  return (
    <section id={privacy.id} aria-labelledby="privacy-title" className="scroll-mt-24 bg-[#0A5CFF] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#E7EEFF]">{privacy.eyebrow}</p>
        <h2 id="privacy-title" className="mt-3 max-w-4xl text-[clamp(2.8rem,6vw,5.2rem)] font-extrabold leading-[0.9] tracking-tight">
          {privacy.title}
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed sm:text-xl">{privacy.body}</p>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed sm:text-xl">{privacy.keychain}</p>
        <p className="mt-8 text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight">{privacy.none}</p>
      </div>
    </section>
  );
}

function OpenSource() {
  return (
    <section id={source.id} aria-labelledby="source-title" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#0A5CFF]">{source.eyebrow}</p>
        <h2 id="source-title" className="mt-3 max-w-4xl text-[clamp(2.8rem,6vw,5.2rem)] font-extrabold leading-[0.9] tracking-tight">
          {source.title}
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#1C2E5A]">{source.body}</p>
        <p className="mt-8">
          <a className="text-lg font-extrabold text-[#0A5CFF] underline-offset-4 hover:underline" href={sourceRepo}>
            {source.cta}
          </a>
        </p>
      </div>
    </section>
  );
}

function Requirements() {
  return (
    <section id={requirements.id} aria-labelledby="requirements-title" className="scroll-mt-24 bg-[#E7EEFF]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#0A5CFF]">{requirements.eyebrow}</p>
        <h2 id="requirements-title" className="mt-3 text-[clamp(2.8rem,6vw,5.2rem)] font-extrabold leading-[0.9] tracking-tight">
          {requirements.title}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {requirements.items.map((item) => (
            <li key={item} className="rounded-2xl bg-white px-6 py-8 text-2xl font-extrabold tracking-tight sm:text-3xl">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id={faq.id} aria-labelledby="faq-title" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 id="faq-title" className="text-[clamp(2.8rem,6vw,5rem)] font-extrabold leading-[0.9] tracking-tight">
          {faq.title}
        </h2>
        <div className="mt-8 divide-y divide-[#0B1B4A]/10 border-y border-[#0B1B4A]/10">
          {faq.items.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="cursor-pointer text-xl font-extrabold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A5CFF]">
                {item.question}
              </summary>
              <p className="mt-3 text-lg leading-relaxed text-[#1C2E5A]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CodeFooter() {
  return (
    <footer className="bg-[#0B1B4A] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md">
          <p className="text-sm leading-relaxed text-[#E7EEFF]">{codeFooter.line}</p>
          <p className="mt-4 text-sm">
            <a className="font-semibold underline-offset-4 hover:underline" href={`mailto:${codeFooter.email}`}>
              {codeFooter.email}
            </a>
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-col gap-2 text-sm md:items-end">
            <li>
              <a className="font-semibold underline-offset-4 hover:underline" href={codeFooter.brandHref}>
                {codeFooter.brandLabel}
              </a>
            </li>
            <li>
              <a className="font-semibold underline-offset-4 hover:underline" href={sourceRepo}>
                {codeFooter.sourceLabel}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
