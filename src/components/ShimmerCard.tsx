export default function ShimmerCard() {
  return (
    <div className="animate-pulse bg-pink-100 rounded-xl overflow-hidden shadow-md">
      <div className="h-48 bg-pink-200"></div>
      <div className="p-3 space-y-2">
        <div className="h-3 bg-pink-200 rounded w-3/4"></div>
        <div className="h-3 bg-pink-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}
