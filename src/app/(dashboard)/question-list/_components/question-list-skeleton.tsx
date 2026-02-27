export function QuestionListSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-7 w-28 rounded bg-gray-200" />

      <div className="flex items-end gap-6">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-9 w-40 rounded bg-gray-200" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-16 rounded bg-gray-200" />
          <div className="flex gap-2">
            <div className="h-7 w-12 rounded bg-gray-200" />
            <div className="h-7 w-12 rounded bg-gray-200" />
            <div className="h-7 w-16 rounded bg-gray-200" />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded border border-gray-200">
        <div className="flex bg-gray-50 px-4 py-3 gap-4">
          <div className="h-4 rounded bg-gray-300" style={{ flexBasis: '75%' }} />
          <div className="h-4 w-16 rounded bg-gray-300" style={{ flexBasis: '10%' }} />
          <div className="h-4 w-16 rounded bg-gray-300" style={{ flexBasis: '10%' }} />
          <div style={{ flexBasis: '5%' }} />
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex border-t border-gray-100 px-4 py-3 gap-4 items-center">
            <div className="h-4 rounded bg-gray-200" style={{ flexBasis: '70%' }} />
            <div className="h-4 w-8 rounded bg-gray-200" style={{ flexBasis: '10%' }} />
            <div className="h-5 w-14 rounded-full bg-gray-200" style={{ flexBasis: '10%' }} />
            <div style={{ flexBasis: '5%' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
