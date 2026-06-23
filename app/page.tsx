import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* NAVBAR */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-blue-600">ExpenseTracker</div>

          <nav className="flex flex-wrap items-center gap-3 text-sm ">
            <Link className="border border-blue-600 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-full" href="/login">Login</Link>
            
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <span className="inline-block px-4 py-2 text-sm font-semibold bg-blue-100 text-blue-700 rounded-full">
          Built for Hardware Shops & Small Businesses
        </span>

        <h1 className="mt-6 text-5xl md:text-7xl font-extrabold leading-tight max-w-4xl mx-auto">
          Track Every Sale, Expense and Profit
          <span className="text-blue-600"> In One Place</span>
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          Stop relying on notebooks and guesswork. Monitor income, expenses,
          inventory purchases and profits with a simple dashboard designed for
          growing businesses.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg"
          >
            Open Dashboard
          </Link>
        </div>

        {/* QUICK BENEFITS */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm font-medium">
          <span className="bg-white px-4 py-2 rounded-full shadow-sm">
            ✓ Expense Tracking
          </span>

          <span className="bg-white px-4 py-2 rounded-full shadow-sm">
            ✓ Budget Planning
          </span>

          <span className="bg-white px-4 py-2 rounded-full shadow-sm">
            ✓ Sales Monitoring
          </span>

          <span className="bg-white px-4 py-2 rounded-full shadow-sm">
            ✓ Profit Reports
          </span>
        </div>

        {/* DASHBOARD PREVIEW */}
        <div className="mt-16 bg-white rounded-3xl shadow-2xl border p-4">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src="/hero.png"
              alt="Expense Tracker Dashboard"
              fill
              priority
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-blue-600">24/7</h3>
            <p className="text-gray-600 mt-2">Access Anywhere</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-blue-600">100%</h3>
            <p className="text-gray-600 mt-2">Cloud Based</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-blue-600">Real-Time</h3>
            <p className="text-gray-600 mt-2">Expense Tracking</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-blue-600">Instant</h3>
            <p className="text-gray-600 mt-2">Profit Insights</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold">
              Everything You Need To Manage Business Finances
            </h2>

            <p className="mt-4 text-gray-600">
              Designed specifically for business owners who want a simple and
              effective way to monitor financial performance.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border shadow-sm">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3">
                Know Your Profit Instantly
              </h3>
              <p className="text-gray-600">
                Track daily income and expenses to see exactly how much your
                business is making.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border shadow-sm">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-3">
                Manage Business Anywhere
              </h3>
              <p className="text-gray-600">
                Access your financial records from your phone, tablet, or
                computer.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border shadow-sm">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">
                Make Better Decisions
              </h3>
              <p className="text-gray-600">
                Analyze trends and identify where your money is being spent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-white py-24 border-y">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">How It Works</h2>

          <p className="mt-4 text-gray-600">
            Four simple steps to gain complete financial visibility.
          </p>

          <div className="mt-16 grid md:grid-cols-4 gap-8">
            <div>
              <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                1
              </div>
              <h3 className="mt-4 font-semibold">Record Expenses</h3>
            </div>

            <div>
              <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                2
              </div>
              <h3 className="mt-4 font-semibold">Monitor Income</h3>
            </div>

            <div>
              <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                3
              </div>
              <h3 className="mt-4 font-semibold">View Reports</h3>
            </div>

            <div>
              <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                4
              </div>
              <h3 className="mt-4 font-semibold">Grow Your Business</h3>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-blue-600 py-24 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-5xl font-bold">
            Ready To Take Control Of Your Finances?
          </h2>

          <p className="mt-6 text-blue-100 text-lg">
            Start tracking your income, expenses and profits today.
          </p>

          <Link
            
            href="/dashboard"
            className="inline-block mt-10 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p>© {new Date().getFullYear()} ExpenseTracker. All rights reserved.</p>
      </footer>
    </div>
  );
}
