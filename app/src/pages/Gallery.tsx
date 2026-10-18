import { Link } from 'react-router-dom'
import { demos } from '../demos/registry'
import StatusBadge from '../demos/StatusBadge'

export default function Gallery() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Demos</h1>
      <p className="mt-2 max-w-2xl text-stone-600 dark:text-stone-400">
        Working prototypes built alongside the research wiki. Each demo links to the plan or artefact behind it.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {demos.map((demo) => (
          <li key={demo.slug}>
            <Link
              to={`/demos/${demo.slug}`}
              className="block h-full rounded-xl border border-stone-200 bg-white p-5 transition hover:border-blue-400 hover:shadow-sm dark:border-stone-800 dark:bg-stone-900 dark:hover:border-blue-500"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold">{demo.title}</h2>
                <StatusBadge status={demo.status} />
              </div>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">{demo.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {demo.tags.map((tag) => (
                  <span key={tag} className="text-xs text-stone-500 dark:text-stone-400">#{tag}</span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
