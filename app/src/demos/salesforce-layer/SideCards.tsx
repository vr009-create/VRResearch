import type { ReactNode } from 'react'
import { formatDate, formatValue } from './format'
import type { AccountRecord } from './schema'
import { cards, type CardId } from './usePreferences'

const currencyField = { apiName: 'amount', label: 'Amount', type: 'currency', section: '' } as const

function Card({ title, count, children }: { title: string; count: number; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
      <h3 className="flex items-center justify-between border-b border-stone-100 px-4 py-2.5 text-sm font-semibold dark:border-stone-800">
        {title}
        <span className="rounded-full bg-stone-100 px-2 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-400">{count}</span>
      </h3>
      <div className="px-4 py-3 text-sm">{children}</div>
    </section>
  )
}

/** Empty components collapse to a single line instead of a full-size placeholder. */
function EmptyCard({ title }: { title: string }) {
  return (
    <p className="flex items-center justify-between rounded-xl border border-dashed border-stone-300 px-4 py-2.5 text-sm text-stone-500 dark:border-stone-700">
      {title}
      <span className="text-xs">None yet · <button className="text-blue-700 hover:underline dark:text-blue-400">Add</button></span>
    </p>
  )
}

export default function SideCards({ record, hiddenCards }: { record: AccountRecord; hiddenCards: CardId[] }) {
  const counts: Record<CardId, number> = {
    contacts: record.contacts.length,
    opportunities: record.opportunities.length,
    cases: record.cases.length,
    interestTags: record.interestTags.length,
    interactions: record.interactions.length,
  }

  const body: Record<CardId, ReactNode> = {
    contacts: (
      <ul className="space-y-2.5">
        {record.contacts.map((c) => (
          <li key={c.email} className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-medium text-blue-700 dark:text-blue-400">{c.name}</p>
              <p className="truncate text-xs text-stone-500">{c.title}</p>
            </div>
            {c.primary && <span className="shrink-0 rounded bg-blue-50 px-1.5 text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-300">Primary</span>}
          </li>
        ))}
      </ul>
    ),
    opportunities: (
      <ul className="space-y-2.5">
        {record.opportunities.map((o) => (
          <li key={o.name}>
            <div className="flex justify-between gap-2">
              <p className="truncate font-medium text-blue-700 dark:text-blue-400">{o.name}</p>
              <p className="shrink-0 tabular-nums">{formatValue(currencyField, o.amount, true)}</p>
            </div>
            <p className="text-xs text-stone-500">{o.stage} · closes {formatDate(o.closeDate)}</p>
          </li>
        ))}
      </ul>
    ),
    cases: (
      <ul className="space-y-2.5">
        {record.cases.map((c) => (
          <li key={c.number}>
            <p className="font-medium text-blue-700 dark:text-blue-400">{c.subject}</p>
            <p className="text-xs text-stone-500">#{c.number} · {c.status} · {c.priority} priority</p>
          </li>
        ))}
      </ul>
    ),
    interestTags: (
      <div className="flex flex-wrap gap-1.5">
        {record.interestTags.map((t) => (
          <span key={t} className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">{t}</span>
        ))}
      </div>
    ),
    interactions: (
      <ul className="space-y-3">
        {record.interactions.map((i) => (
          <li key={i.title}>
            <p className="font-medium">{i.title}</p>
            <p className="text-xs text-stone-500">{formatDate(i.date)} · {i.author}</p>
            <p className="mt-1 text-stone-600 dark:text-stone-400">{i.summary}</p>
          </li>
        ))}
      </ul>
    ),
  }

  return (
    <div className="space-y-4">
      {cards
        .filter((c) => !hiddenCards.includes(c.id))
        .map((c) =>
          counts[c.id] === 0 ? (
            <EmptyCard key={c.id} title={c.label} />
          ) : (
            <Card key={c.id} title={c.label} count={counts[c.id]}>{body[c.id]}</Card>
          ),
        )}
    </div>
  )
}
