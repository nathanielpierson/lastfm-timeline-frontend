import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Welcome to the Last.fm Album Charting App!</h1>
      <p className="text-gray-700">
        Explore your listening history and see which albums you&apos;ve been playing the most.
      </p>
      <Link
        to="/editedchart"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md transition-all"
      >
        View your chart
      </Link>
    </div>
  );
}