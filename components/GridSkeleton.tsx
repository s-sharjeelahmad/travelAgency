export default function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm flex flex-col"
        >
          {/* Image area */}
          <div className="aspect-[4/5] w-full bg-slate-200" />
          {/* Title + Button */}
          <div className="p-5 space-y-4">
            <div className="h-5 bg-slate-200 rounded-md w-3/4" />
            <div className="h-5 bg-slate-200 rounded-md w-1/2" />
            <div className="h-10 bg-slate-100 rounded-lg w-full mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
