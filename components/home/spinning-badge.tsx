import Image from "next/image";

const RING_TEXT =
  "CALLING AGENTS · CHATBOTS · CRM APPS · WEB & MOBILE · FULL STACK · ";

type SpinningBadgeProps = {
  id: string;
  src: string;
  alt: string;
  priority?: boolean;
};

export const SpinningBadge = ({
  id,
  src,
  alt,
  priority = false,
}: SpinningBadgeProps) => (
  <div className="relative mx-auto aspect-square w-full max-w-[420px]">
    <svg
      aria-hidden="true"
      className="motion-safe-only absolute inset-0 h-full w-full animate-spin-slow text-primary"
      viewBox="0 0 200 200"
    >
      <defs>
        <path
          d="M100,100 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0"
          id={id}
        />
      </defs>
      <text
        className="fill-current"
        fontSize="8.4"
        letterSpacing="1.2"
        style={{ fontFamily: "var(--font-display), sans-serif" }}
      >
        <textPath href={`#${id}`} lengthAdjust="spacing" textLength="528">
          {RING_TEXT}
        </textPath>
      </text>
    </svg>
    <div className="absolute inset-[16%] overflow-hidden rounded-full border border-divider bg-content1 shadow-2xl shadow-primary/10">
      <Image
        fill
        alt={alt}
        className="object-cover"
        priority={priority}
        sizes="(max-width: 768px) 70vw, 320px"
        src={src}
      />
    </div>
    <p className="sr-only">
      AI calling agents, AI chatbots, CRM apps, web and mobile apps, and full
      stack development.
    </p>
  </div>
);
