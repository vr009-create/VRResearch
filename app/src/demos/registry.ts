import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export type DemoStatus = 'live' | 'in-progress' | 'planned'

export interface Demo {
  slug: string
  title: string
  summary: string
  status: DemoStatus
  tags: string[]
  /** Path of the plan or artefact on the wiki site, e.g. "plans/salesforce-layer/". */
  wikiPath?: string
  /** Omit for planned demos that have no UI yet. */
  component?: LazyExoticComponent<ComponentType>
}

// Add a demo: create src/demos/<slug>/index.tsx with a default export, then register it here.
export const demos: Demo[] = [
  {
    slug: 'starter',
    title: 'Demo starter',
    summary: 'A minimal working demo showing the layout, Tailwind styling, and local state. Copy it to start a new demo.',
    status: 'live',
    tags: ['template'],
    component: lazy(() => import('./starter')),
  },
  {
    slug: 'salesforce-layer',
    title: 'Salesforce sandbox layer',
    summary:
      'A layer above a Salesforce sandbox: custom dashboards and analytics, bulk data tools, an AI assistant, and guided workflows.',
    status: 'planned',
    tags: ['salesforce', 'analytics', 'ai'],
    wikiPath: 'plans/salesforce-layer/',
  },
]

export const findDemo = (slug: string | undefined) => demos.find((d) => d.slug === slug)
