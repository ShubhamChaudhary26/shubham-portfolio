import Image from "next/image";

type HeroImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function PageHero({
  image,
  eyebrow,
  title,
  subtitle,
}: {
  image: HeroImage | null;
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="relative isolate min-h-[32rem] overflow-hidden sm:min-h-[38rem]">
      {image ? (
        <Image
          priority
          unoptimized
          alt={image.alt}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          height={image.height}
          sizes="100vw"
          src={image.src}
          width={image.width}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-black/40" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-300/70 to-violet-400/70"
      />
      <div className="relative z-10 mx-auto flex min-h-[32rem] max-w-5xl flex-col justify-end px-4 pb-12 pt-28 sm:min-h-[38rem] sm:pb-16">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">{subtitle}</p>
        ) : null}
      </div>
    </header>
  );
}
