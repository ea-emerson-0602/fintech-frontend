import React from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

interface ComingSoonProps {
  darkMode?: boolean
}

const ComingSoon: React.FC<ComingSoonProps> = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="flex w-full max-w-lg flex-col items-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 px-8 py-12 text-gray-800 shadow-sm dark:from-zinc-900 dark:to-zinc-800 dark:text-zinc-300">
        <div className="relative mb-6">
          <div className="flex h-20 w-20 animate-pulse items-center justify-center rounded-[20px] bg-indigo-100 text-4xl font-bold text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200">
            !
          </div>
          <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-amber-400"></div>
          <div className="absolute -bottom-2 -left-2 h-3 w-3 rounded-full bg-emerald-400"></div>
        </div>

        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900 dark:text-zinc-200 md:text-3xl">
          Coming Soon!
        </h1>
        <p className="mb-8 max-w-md text-center text-gray-600 dark:text-zinc-400">
          This feature is currently in development. We're working hard to bring it to you!
        </p>

        <div className="mb-8 h-2 w-full max-w-xs overflow-hidden rounded-full bg-gray-400 bg-opacity-20">
          <div
            className="h-full animate-progress rounded-full bg-indigo-600 dark:bg-indigo-400"
            style={{
              width: "0%",
              animation: "progress 2s ease-in-out infinite alternate",
            }}
          ></div>
        </div>

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-full bg-[#F8D802] px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-yellow-400"
        >
          <ArrowLeft size={16} />
          Back to dashboard
        </Link>
      </div>
    </div>
  )
}

export default ComingSoon
