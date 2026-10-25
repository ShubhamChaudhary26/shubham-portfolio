const CHIPS = ["24x7", "Hindi", "Under 1 min callback"] as const;

export function StatChips() {
  return (
    <ul className="flex flex-wrap justify-center gap-3">
      {CHIPS.map((chip) => (
        <li
          key={chip}
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold tracking-wide text-teal-100"
        >
          {chip}
        </li>
      ))}
    </ul>
  );
}
