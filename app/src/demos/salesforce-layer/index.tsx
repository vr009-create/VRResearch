import { useEffect, useState } from 'react'
import CustomizePanel from './CustomizePanel'
import { mockDataSource } from './dataSource'
import FieldValueView from './FieldValueView'
import { formatDate, formatValue, isEmpty } from './format'
import type { AccountRecord, FieldDef, SectionDef } from './schema'
import SideCards from './SideCards'
import { usePreferences } from './usePreferences'

// Redesigned Account record page with per-user field customization.
// Showcase mode reads mock data; live mode will swap in a Salesforce UI API data source.

const ACTIONS = ['Log a call', 'New task', 'Schedule review', 'New opportunity', 'Create interaction summary', 'Send email']

const alertStyles = {
  info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200',
  warning: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200',
  critical: 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200',
}

const activityIcon = { call: '☎', email: '✉', meeting: '◷', task: '✓' }

export default function SalesforceLayerDemo() {
  const preferences = usePreferences()
  const { prefs, toggleCollapsed } = preferences
  const [objectInfo, setObjectInfo] = useState<{ sections: SectionDef[]; fields: FieldDef[] } | null>(null)
  const [record, setRecord] = useState<AccountRecord | null>(null)
  const [customizing, setCustomizing] = useState(false)
  const [actionsOpen, setActionsOpen] = useState(false)
  const [tab, setTab] = useState<'details' | 'activity' | 'milestones'>('details')

  useEffect(() => {
    mockDataSource.getObjectInfo().then(setObjectInfo)
    mockDataSource.getAccount('001DEMO000000001').then(setRecord)
  }, [])

  if (!objectInfo || !record) return <p className="text-stone-500">Loading account…</p>

  const { sections, fields } = objectInfo
  const byName = Object.fromEntries(fields.map((f) => [f.apiName, f]))
  const v = record.values
  const compact = prefs.density === 'compact'
  const visible = (f: FieldDef) => !prefs.hidden.includes(f.apiName) && !(prefs.hideEmpty && isEmpty(v[f.apiName]))
  const orderedSections = prefs.sectionOrder
    .map((id) => sections.find((s) => s.id === id))
    .filter((s): s is SectionDef => Boolean(s))
  const hiddenCount = fields.filter((f) => !visible(f)).length

  return (
    <div className="-m-6 bg-stone-100 p-4 sm:p-6 dark:bg-stone-950">
      <p className="mb-4 rounded-lg bg-white px-3 py-2 text-xs text-stone-500 dark:bg-stone-900">
        Showcase mode: fictional sample data. Your customizations are saved in this browser.
      </p>

      {/* Header: identity, actions, and the user's pinned fields */}
      <header className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-indigo-600 text-lg font-semibold text-white">
              {String(v.Name).charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Account</p>
              <h2 className="truncate text-2xl font-bold tracking-tight">{String(v.Name)}</h2>
              <div className="mt-1 flex flex-wrap gap-1.5 text-xs">
                {['Type', 'Status__c', 'Tier__c'].map((name) =>
                  isEmpty(v[name]) ? null : (
                    <span key={name} className="rounded-full bg-stone-100 px-2 py-0.5 text-stone-700 dark:bg-stone-800 dark:text-stone-300">{String(v[name])}</span>
                  ),
                )}
                <span className="px-1 text-stone-500">Advisor: <span className="text-blue-700 dark:text-blue-400">{String(v.OwnerId)}</span></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <button onClick={() => setActionsOpen(!actionsOpen)} aria-expanded={actionsOpen} className="rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Actions ▾
              </button>
              {actionsOpen && (
                <ul className="absolute right-0 z-30 mt-1 w-56 rounded-lg border border-stone-200 bg-white py-1 text-sm shadow-lg dark:border-stone-700 dark:bg-stone-800">
                  {ACTIONS.map((a) => (
                    <li key={a}>
                      <button onClick={() => setActionsOpen(false)} className="w-full px-3 py-1.5 text-left hover:bg-stone-100 dark:hover:bg-stone-700">{a}</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button className="rounded-lg border border-stone-300 px-3.5 py-2 text-sm font-medium hover:bg-stone-50 dark:border-stone-700 dark:hover:bg-stone-800">Edit</button>
            <button onClick={() => setCustomizing(true)} className="rounded-lg border border-stone-300 px-3.5 py-2 text-sm font-medium hover:bg-stone-50 dark:border-stone-700 dark:hover:bg-stone-800">
              ⚙ Customize
            </button>
          </div>
        </div>

        {prefs.pinned.length > 0 && (
          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-stone-100 pt-4 sm:grid-cols-4 dark:border-stone-800">
            {prefs.pinned.map((name) => byName[name] && (
              <div key={name} className="min-w-0">
                <dt className="truncate text-xs text-stone-500">{byName[name].label}</dt>
                <dd className="mt-0.5 truncate text-lg font-semibold tabular-nums">{formatValue(byName[name], v[name], true)}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>

      {/* Alerts only take space when there is something to say */}
      {record.alerts.map((a) => (
        <p key={a.message} className={`mt-4 rounded-lg border px-4 py-2.5 text-sm ${alertStyles[a.severity]}`}>{a.message}</p>
      ))}

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
          <nav className="flex gap-1 border-b border-stone-200 px-3 dark:border-stone-800" aria-label="Record tabs">
            {(['details', 'activity', 'milestones'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`-mb-px border-b-2 px-3 py-3 text-sm font-medium capitalize ${tab === t ? 'border-blue-600 text-blue-700 dark:text-blue-400' : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'}`}
              >
                {t}
              </button>
            ))}
          </nav>

          {tab === 'details' && (
            <div className="divide-y divide-stone-100 dark:divide-stone-800">
              {orderedSections.map((section) => {
                const sectionFields = fields.filter((f) => f.section === section.id && visible(f))
                if (sectionFields.length === 0) return null
                const collapsed = prefs.collapsed.includes(section.id)
                return (
                  <section key={section.id} className="px-5 py-3">
                    <button onClick={() => toggleCollapsed(section.id)} aria-expanded={!collapsed} className="flex w-full items-center justify-between py-1 text-left text-sm font-semibold">
                      {section.label}
                      <span className="text-stone-400">{collapsed ? '▸' : '▾'}</span>
                    </button>
                    {!collapsed && (
                      <dl className={`grid sm:grid-cols-2 ${compact ? 'mt-1 gap-x-6 gap-y-1.5' : 'mt-2 gap-x-8 gap-y-4'}`}>
                        {sectionFields.map((f) => (
                          <div key={f.apiName} className={compact ? 'flex items-baseline justify-between gap-3 border-b border-stone-100 py-1 dark:border-stone-800' : ''}>
                            <dt className="text-xs text-stone-500">{f.label}</dt>
                            <dd className={`text-sm ${compact ? 'text-right' : 'mt-0.5'}`}>
                              <FieldValueView field={f} value={v[f.apiName]} />
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </section>
                )
              })}
              {hiddenCount > 0 && (
                <p className="px-5 py-3 text-xs text-stone-500">
                  {hiddenCount} fields hidden ·{' '}
                  <button onClick={() => setCustomizing(true)} className="text-blue-700 hover:underline dark:text-blue-400">Customize</button>
                </p>
              )}
            </div>
          )}

          {tab === 'activity' && (
            <ol className="space-y-4 px-5 py-4">
              {record.activities.map((a) => (
                <li key={a.subject} className="flex gap-3 text-sm">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300" aria-hidden>{activityIcon[a.kind]}</span>
                  <div>
                    <p className="font-medium">{a.subject}</p>
                    <p className="text-xs text-stone-500">{formatDate(a.date)} · {a.who}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}

          {tab === 'milestones' && (
            <ol className="relative mx-5 my-4 space-y-4 border-l border-stone-200 pl-5 dark:border-stone-700">
              {record.milestones.map((m) => (
                <li key={m.label} className="text-sm">
                  <span className="absolute -left-1.5 mt-1.5 size-3 rounded-full border-2 border-white bg-indigo-500 dark:border-stone-900" aria-hidden />
                  <p className="font-medium">{m.label}</p>
                  <p className="text-xs text-stone-500">{formatDate(m.date)}</p>
                </li>
              ))}
            </ol>
          )}
        </div>

        <SideCards record={record} hiddenCards={prefs.hiddenCards} />
      </div>

      {customizing && <CustomizePanel sections={sections} fields={fields} preferences={preferences} onClose={() => setCustomizing(false)} />}
    </div>
  )
}
