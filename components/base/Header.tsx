export default function Header() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white px-6 grid grid-cols-3 items-center sticky top-0 z-30">
      <div className="md:hidden" aria-hidden="true"></div>
      <div className="hidden md:block" aria-hidden="true" />
      <div className="text-center">
        <h1 className="text-lg font-semibold text-slate-800 whitespace-nowrap">
          Expense Tracker
        </h1>
      </div>
      <div className="flex items-center justify-end ">
        <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-sm font-bold text-slate-600">
          U
        </div>
      </div>
    </header>
  );
}
