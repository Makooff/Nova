export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <div className="w-px h-10 bg-black origin-top scroll-line" />
      <span className="font-mono text-[9px] uppercase tracking-wider text-light">
        Scroll
      </span>
    </div>
  );
}
