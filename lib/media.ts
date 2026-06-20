// Maps the original R2 filenames to locally-served, compressed copies in
// /public/videos. Same-origin + small files => near-instant load.
// Anything not mapped falls back to the R2 CDN URL.

const R2 = "https://pub-a93d9300f3144cee9101e92c2ba03175.r2.dev";

const LOCAL: Record<string, string> = {
  "BOZAR_Become_a_Bozars_Young_Ambassador_(Campaign)_hd 1080p.MP4": "/videos/bozar.mp4",
  "Timeline_2_hd 1080p.MP4": "/videos/timeline-2.mp4",
  "Timeline_3_hd 1080p.MP4": "/videos/timeline-3.mp4",
  "Caballero - Rose Orangé (Clip Officiel).mp4": "/videos/caballero.mp4",
  "AutoSpaV2_hd 1080p.MP4": "/videos/autospa.mp4",
  "VidAoAutospaP2V4_uhd 2160p.MP4": "/videos/vidao-autospa.mp4",
  "260508_CARWASH_COMMERCIAL_MONTAGE_V3_hd 1080p.MP4": "/videos/carwash.mp4",
};

export function mediaSrc(filename: string): string {
  return LOCAL[filename] ?? `${R2}/${encodeURIComponent("Vidéo")}/${encodeURIComponent(filename)}`;
}
