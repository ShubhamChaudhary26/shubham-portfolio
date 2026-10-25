"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { LeadForm } from "@/components/ai-automation/lead-form";

type DemoCtaProps = {
  pagePath: string;
  selectedBusiness: string;
  defaultBusinessType: string;
  defaultServices?: string[];
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input:not([type="hidden"]):not([tabindex="-1"]), select, [tabindex]:not([tabindex="-1"])';

export function DemoCta({
  pagePath,
  selectedBusiness,
  defaultBusinessType,
  defaultServices = ["AI Calling Agent"],
}: DemoCtaProps) {
  const [open, setOpen] = useState(false);
  const [formInView, setFormInView] = useState(false);
  const [playerUnderBar, setPlayerUnderBar] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const update = () => {
      const form = document.getElementById("lead-form");
      const player = document.querySelector("[data-demo-audio]");
      const formRect = form?.getBoundingClientRect();
      const playerRect = player?.getBoundingClientRect();
      const barTop = window.innerHeight - 96;

      setFormInView(Boolean(formRect && formRect.bottom > 0 && formRect.top < window.innerHeight));
      setPlayerUnderBar(
        Boolean(playerRect && playerRect.top < window.innerHeight && playerRect.bottom > barTop),
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    dialog?.focus();

    const focusable = () =>
      [...(dialog?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])].filter(
        (node) => !node.hasAttribute("disabled") && node.tabIndex !== -1,
      );

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);

        return;
      }

      if (event.key !== "Tab") return;

      const nodes = focusable();

      if (!nodes.length) {
        event.preventDefault();

        return;
      }

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      const outside = !dialog?.contains(active);

      if (event.shiftKey && (active === first || active === dialog || outside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || active === dialog || outside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      openButtonRef.current?.focus();
    };
  }, [open]);

  const barHidden = open || formInView || playerUnderBar;

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-background/95 px-4 pt-3 backdrop-blur pb-[max(0.75rem,env(safe-area-inset-bottom))] ${
          barHidden ? "hidden" : ""
        }`}
      >
        <button
          ref={openButtonRef}
          className="mx-auto flex min-h-12 w-full max-w-md items-center justify-center rounded-full bg-gradient-to-r from-teal-300 to-violet-500 px-5 text-base font-semibold text-slate-950 shadow-[0_12px_40px_-16px_rgba(139,92,246,0.9)]"
          type="button"
          onClick={() => setOpen(true)}
        >
          Free demo chahiye? Form bharo →
        </button>
      </div>
      {open
        ? createPortal(
            <div className="fixed inset-0 z-50 flex items-end justify-center">
              <button
                aria-label="Close"
                className="absolute inset-0 bg-black/70"
                tabIndex={-1}
                type="button"
                onClick={() => setOpen(false)}
              />
              <div
                ref={dialogRef}
                aria-labelledby={titleId}
                aria-modal="true"
                className="relative z-10 flex max-h-[min(92dvh,100%)] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-background shadow-2xl outline-none pb-[max(0.5rem,env(safe-area-inset-bottom))]"
                role="dialog"
                tabIndex={-1}
              >
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <h2 className="font-display text-lg font-semibold" id={titleId}>
                    Free demo
                  </h2>
                  <button
                    aria-label="Close"
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-xl leading-none"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="overflow-y-auto px-4 pb-4">
                  <LeadForm
                    defaultBusinessType={defaultBusinessType}
                    defaultServices={defaultServices}
                    pagePath={pagePath}
                    selectedBusiness={selectedBusiness}
                  />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
