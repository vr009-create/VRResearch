import { useState } from 'react'
import type { FieldDef, SectionDef } from './schema'
import { cards, MAX_PINNED, presets, type usePreferences } from './usePreferences'

type Prefs = ReturnType<typeof usePreferences>

interface Props {
  sections: SectionDef[]
  fields: FieldDef[]
  preferences: Prefs
  onClose: () => void
}

const tabClass = (active: boolean) =>
  `rounded-md px-3 py-1.5 text-sm font-medium ${active ? 'bg-white shadow-sm dark:bg-stone-700' : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'}`

export default function CustomizePanel({ sections, fields, preferences, onClose }: Props) {
  const { prefs, update, toggleHidden, togglePinned, moveSection, toggleCard, applyPreset } = preferences
  const [tab, setTab] = useState<'fields' | 'layout'>('fields')
  const [query, setQuery] = useState('')

  const orderedSections = prefs.sectionOrder
    .map((id) => sections.find((s) => s.id === id))
    .filter((s): s is SectionDef => Boolean(s))
  const matches = (f: FieldDef) => f.label.toLowerCase().includes(query.toLowerCase())

  return (
    <div className="fixed inset-0 z-40 flex justify-end" role="dialog" aria-modal="true" aria-label="Customize this page">
      <button className="absolute inset-0 bg-stone-950/30" aria-label="Close" onClick={onClose} />
      <aside className="relative flex h-full w-full max-w-md flex-col bg-white shadow-xl dark:bg-stone-900">
        <header className="border-b border-stone-200 px-5 pt-4 pb-3 dark:border-stone-800">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Customize your view</h2>
            <button onClick={onClose} className="rounded-md px-2 py-1 text-sm text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800">Done</button>
          </div>
          <p className="mt-1 text-xs text-stone-500">Changes apply only to you and save automatically.</p>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-stone-500">Presets:</span>
            {Object.entries(presets).map(([key, p]) => (
              <button key={key} onClick={() => applyPreset(key)} className="rounded-full border border-stone-300 px-3 py-0.5 hover:border-blue-500 hover:text-blue-700 dark:border-stone-700 dark:hover:text-blue-400">
                {p.label}
              </button>
            ))}
          </div>

          <div className="mt-3 inline-flex rounded-lg bg-stone-100 p-1 dark:bg-stone-800">
            <button className={tabClass(tab === 'fields')} onClick={() => setTab('fields')}>Fields</button>
            <button className={tabClass(tab === 'layout')} onClick={() => setTab('layout')}>Layout</button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {tab === 'fields' ? (
            <>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fields"
                className="w-full rounded-lg border border-stone-300 bg-transparent px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-stone-700"
              />
              <p className="mt-2 text-xs text-stone-500">
                Tick to show a field. Star up to {MAX_PINNED} to pin them to the header ({prefs.pinned.length}/{MAX_PINNED}).
              </p>
              {orderedSections.map((section) => {
                const sectionFields = fields.filter((f) => f.section === section.id && matches(f))
                if (sectionFields.length === 0) return null
                return (
                  <fieldset key={section.id} className="mt-5">
                    <legend className="text-xs font-semibold uppercase tracking-wide text-stone-500">{section.label}</legend>
                    <ul className="mt-1.5 divide-y divide-stone-100 dark:divide-stone-800">
                      {sectionFields.map((f) => {
                        const pinned = prefs.pinned.includes(f.apiName)
                        const pinDisabled = !pinned && prefs.pinned.length >= MAX_PINNED
                        return (
                          <li key={f.apiName} className="flex items-center gap-3 py-1.5">
                            <label className="flex flex-1 cursor-pointer items-center gap-2.5 text-sm">
                              <input
                                type="checkbox"
                                checked={!prefs.hidden.includes(f.apiName)}
                                onChange={() => toggleHidden(f.apiName)}
                                className="size-4 accent-blue-600"
                              />
                              {f.label}
                            </label>
                            <button
                              onClick={() => togglePinned(f.apiName)}
                              disabled={pinDisabled}
                              aria-pressed={pinned}
                              title={pinDisabled ? `You can pin up to ${MAX_PINNED} fields` : pinned ? 'Unpin from header' : 'Pin to header'}
                              className={`text-lg leading-none disabled:opacity-25 ${pinned ? 'text-amber-500' : 'text-stone-300 hover:text-amber-500 dark:text-stone-600'}`}
                            >
                              ★
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </fieldset>
                )
              })}
            </>
          ) : (
            <div className="space-y-7 text-sm">
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-500">Section order</h3>
                <ol className="mt-2 space-y-1.5">
                  {orderedSections.map((s, i) => (
                    <li key={s.id} className="flex items-center justify-between rounded-lg border border-stone-200 px-3 py-2 dark:border-stone-800">
                      {s.label}
                      <span className="flex gap-1">
                        <button onClick={() => moveSection(s.id, -1)} disabled={i === 0} aria-label={`Move ${s.label} up`} className="rounded px-2 hover:bg-stone-100 disabled:opacity-25 dark:hover:bg-stone-800">↑</button>
                        <button onClick={() => moveSection(s.id, 1)} disabled={i === orderedSections.length - 1} aria-label={`Move ${s.label} down`} className="rounded px-2 hover:bg-stone-100 disabled:opacity-25 dark:hover:bg-stone-800">↓</button>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-500">Side panel</h3>
                <ul className="mt-2 space-y-1.5">
                  {cards.map((c) => (
                    <li key={c.id}>
                      <label className="flex cursor-pointer items-center gap-2.5">
                        <input type="checkbox" checked={!prefs.hiddenCards.includes(c.id)} onChange={() => toggleCard(c.id)} className="size-4 accent-blue-600" />
                        {c.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-500">Display</h3>
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input type="checkbox" checked={prefs.hideEmpty} onChange={() => update({ hideEmpty: !prefs.hideEmpty })} className="size-4 accent-blue-600" />
                  Hide fields with no value
                </label>
                <div className="flex items-center gap-3">
                  <span>Density</span>
                  <div className="inline-flex rounded-lg bg-stone-100 p-1 dark:bg-stone-800">
                    <button className={tabClass(prefs.density === 'comfortable')} onClick={() => update({ density: 'comfortable' })}>Comfortable</button>
                    <button className={tabClass(prefs.density === 'compact')} onClick={() => update({ density: 'compact' })}>Compact</button>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        <footer className="border-t border-stone-200 px-5 py-3 text-right dark:border-stone-800">
          <button onClick={() => applyPreset('advisor')} className="text-sm text-stone-500 hover:text-rose-600">Reset to default</button>
        </footer>
      </aside>
    </div>
  )
}
