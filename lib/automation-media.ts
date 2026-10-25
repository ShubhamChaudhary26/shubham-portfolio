import fs from "node:fs";
import path from "node:path";

import { GENERAL_VOICEOVER, type IndustryConfig, type WalkthroughVideo } from "@/data/ai-automation";

export function publicFileExists(urlPath: string) {
  if (!urlPath.startsWith("/") || urlPath.includes("..")) return false;

  return fs.existsSync(path.join(process.cwd(), "public", urlPath));
}

function readPublicText(urlPath: string) {
  if (!publicFileExists(urlPath)) return null;

  const text = fs.readFileSync(path.join(process.cwd(), "public", urlPath), "utf8").trim();

  return text || null;
}

export function resolveVideo(video: WalkthroughVideo) {
  if (!video.src || !publicFileExists(video.src)) return null;

  const poster = video.poster && publicFileExists(video.poster) ? video.poster : undefined;

  return { src: video.src, poster };
}

function voiceoverAssets(src: string) {
  if (!publicFileExists(src)) return null;

  const transcriptPath = src.replace(/\.mp3$/, ".txt");
  const captionsPath = src.replace(/\.mp3$/, ".vtt");

  return {
    src,
    transcript: readPublicText(transcriptPath),
    captionsSrc: publicFileExists(captionsPath)
      ? captionsPath
      : "/audio/captions-unavailable.vtt",
  };
}

export function presentGeneralVoiceover() {
  return voiceoverAssets(GENERAL_VOICEOVER);
}

export function presentIndustry(industry: IndustryConfig) {
  const demoSrc = industry.demoCallSrc;

  return {
    ...industry,
    explainer: voiceoverAssets(industry.audio.src),
    demoSrc: demoSrc && publicFileExists(demoSrc) ? demoSrc : null,
    video: resolveVideo(industry.walkthroughVideo),
    heroImage:
      industry.heroImage && publicFileExists(industry.heroImage.src) ? industry.heroImage : null,
    screenshots: industry.screenshots.filter((image) => publicFileExists(image.src)),
  };
}

export type PresentedIndustry = ReturnType<typeof presentIndustry>;
export type VoiceoverAssets = ReturnType<typeof presentGeneralVoiceover>;
