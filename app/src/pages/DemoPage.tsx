import { Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findDemo } from '../demos/registry'
import StatusBadge from '../demos/StatusBadge'
import { WIKI_URL } from '../config'

export default function DemoPage() {
  const demo = findDemo(useParams().slug)

  if (!demo) {
    return (
      <p>
        No demo by that name. <Link to="/" className="text-blue-600 underline">Back to demos</Link>
      </p>
    )
  }

  const Component = demo.component

  return (
    <>
      <Link to="/" className="text-sm text-stone-500 hover:text-blue-600 dark:text-stone-400">← All demos</Link>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight">{demo.title}</h1>
        <StatusBadge status={demo.status} />
      </div>
      <p className="mt-2 max-w-2xl text-stone-600 dark:text-stone-400">{demo.summary}</p>
      {demo.wikiPath && (
        <a href={WIKI_URL + demo.wikiPath} className="mt-3 inline-block text-sm text-blue-600 underline dark:text-blue-400">
          Read the plan on the wiki
        </a>
      )}

      <section className="mt-8 rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
        {Component ? (
          <Suspense fallback={<p className="text-stone-500">Loading demo…</p>}>
            <Component />
          </Suspense>
        ) : (
          <p className="text-stone-600 dark:text-stone-400">This demo is planned and doesn't have a working UI yet.</p>
        )}
      </section>
    </>
  )
}
