import { useEffect, useState } from 'react'
import { fields, sections } from './mockAccount'

// Per-user view preferences. Showcase mode keeps them in this browser; live mode will
// store them in Salesforce per user (see the plan).

export type Density = 'comfortable' | 'compact'

// Side-panel components, including the Financial Services Cloud ones from the standard page.
export const cards = [
  { id: 'contacts', label: 'Contacts' },
  { id: 'opportunities', label: 'Opportunities' },
  { id: 'cases', label: 'Cases' },
  { id: 'interestTags', label: 'Interest tags' },
  { id: 'interactions', label: 'Interaction summaries' },
] as const

export type CardId = (typeof cards)[number]['id']

export interface ViewPreferences {
  hidden: string[]
  hiddenCards: CardId[]
  pinned: string[]
  sectionOrder: string[]
  collapsed: string[]
  density: Density
  hideEmpty: boolean
}

export const MAX_PINNED = 4
const STORAGE_KEY = 'vr.salesforce-layer.account-view.v1'

const allFieldsIn = (...sectionIds: string[]) =>
  fields.filter((f) => !sectionIds.includes(f.section)).map((f) => f.apiName)

export const presets: Record<string, { label: string; prefs: ViewPreferences }> = {
  advisor: {
    label: 'Advisor',
    prefs: {
      hidden: [...allFieldsIn('overview', 'financial', 'relationship'), 'AccountNumber', 'Branch__c', 'Rating', 'ParentId'],
      hiddenCards: ['cases'],
      pinned: ['AUM__c', 'Risk_Tolerance__c', 'Next_Review__c', 'Tier__c'],
      sectionOrder: ['financial', 'relationship', 'overview', 'contact', 'compliance', 'system'],
      collapsed: [],
      density: 'comfortable',
      hideEmpty: true,
    },
  },
  operations: {
    label: 'Operations',
    prefs: {
      hidden: allFieldsIn('overview', 'contact', 'compliance', 'system'),
      hiddenCards: ['opportunities', 'interestTags', 'interactions'],
      pinned: ['AccountNumber', 'KYC_Status__c', 'Status__c', 'Branch__c'],
      sectionOrder: ['compliance', 'overview', 'contact', 'system', 'financial', 'relationship'],
      collapsed: [],
      density: 'compact',
      hideEmpty: false,
    },
  },
  everything: {
    label: 'Everything',
    prefs: {
      hidden: [],
      hiddenCards: [],
      pinned: ['AUM__c', 'OwnerId', 'Next_Review__c', 'KYC_Status__c'],
      sectionOrder: sections.map((s) => s.id),
      collapsed: [],
      density: 'compact',
      hideEmpty: false,
    },
  },
}

export const defaultPreferences = presets.advisor.prefs

function load(): ViewPreferences {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return { ...defaultPreferences, ...JSON.parse(saved) }
  } catch {
    // Storage unavailable (private window, blocked site data): fall back to defaults.
  }
  return defaultPreferences
}

export function usePreferences() {
  const [prefs, setPrefs] = useState<ViewPreferences>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    } catch {
      // Preferences still work for this visit without storage.
    }
  }, [prefs])

  const update = (patch: Partial<ViewPreferences>) => setPrefs((p) => ({ ...p, ...patch }))

  const toggleIn = (key: 'hidden' | 'collapsed' | 'hiddenCards', id: string) =>
    setPrefs((p) => {
      const list = p[key] as string[]
      return { ...p, [key]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id] }
    })

  const togglePinned = (apiName: string) =>
    setPrefs((p) => {
      if (p.pinned.includes(apiName)) return { ...p, pinned: p.pinned.filter((x) => x !== apiName) }
      if (p.pinned.length >= MAX_PINNED) return p
      return { ...p, pinned: [...p.pinned, apiName] }
    })

  const moveSection = (id: string, delta: -1 | 1) =>
    setPrefs((p) => {
      const order = [...p.sectionOrder]
      const i = order.indexOf(id)
      const j = i + delta
      if (i < 0 || j < 0 || j >= order.length) return p
      ;[order[i], order[j]] = [order[j], order[i]]
      return { ...p, sectionOrder: order }
    })

  return {
    prefs,
    update,
    toggleHidden: (apiName: string) => toggleIn('hidden', apiName),
    toggleCollapsed: (sectionId: string) => toggleIn('collapsed', sectionId),
    toggleCard: (cardId: CardId) => toggleIn('hiddenCards', cardId),
    togglePinned,
    moveSection,
    applyPreset: (key: string) => setPrefs(presets[key].prefs),
  }
}
