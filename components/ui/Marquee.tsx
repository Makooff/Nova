"use client";

const items = [
  "Production Vidéo",
  "Tournage",
  "Montage",
  "Motion Design",
  "Google Ads",
  "Meta Ads",
  "LinkedIn Ads",
  "TikTok Ads",
  "Agents IA Gestion",
  "Belgique",
  "France",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="border-t border-b border-border overflow-hidden py-3">
      <div className="flex">
        <div className="marquee-track flex shrink-0">
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className="font-mono text-[10px] uppercase tracking-wider text-light whitespace-nowrap px-6">
                {item}
              </span>
              <span className="border-r border-border h-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
