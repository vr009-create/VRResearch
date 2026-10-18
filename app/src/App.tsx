import { Link, Route, Routes } from 'react-router-dom'
import { WIKI_URL } from './config'
import Gallery from './pages/Gallery'
import DemoPage from './pages/DemoPage'

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <header className="border-b border-stone-200 dark:border-stone-800">
        <div className="mx-auto flex max-w-5xl flex-wrap items-baseline justify-between gap-2 px-4 py-4">
          <Link to="/" className="font-semibold tracking-tight">
            VRResearch <span className="text-stone-500 dark:text-stone-400">Demos</span>
          </Link>
          <nav className="flex gap-5 text-sm">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">All demos</Link>
            <a href={WIKI_URL} className="hover:text-blue-600 dark:hover:text-blue-400">Wiki</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/demos/:slug" element={<DemoPage />} />
          <Route path="*" element={<p>Page not found. <Link to="/" className="text-blue-600 underline">Back to demos</Link></p>} />
        </Routes>
      </main>
    </div>
  )
}
