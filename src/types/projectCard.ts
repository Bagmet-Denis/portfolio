export type ProjectCategory = 'mobile' | 'fullstack' | 'desktop' | 'cybersecurity'

export type StoreType = 'appstore' | 'googleplay' | 'rustore' | 'website'

export interface StoreLink {
  type: StoreType
  url: string
  label?: string
}

export interface ProjectCard {
  id: string
  category?: ProjectCategory
  eyebrow?: string
  title: string
  description: string
  technologies: string[]
  iconUrl: string
  galleryUrls: string[]
  storeLinks: StoreLink[]
  solvedTasks?: string[]
  solvedTasksTitle?: string
  infoModalKey?: string
}
