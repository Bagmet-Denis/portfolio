export type ProjectCategory = 'mobile' | 'fullstack' | 'desktop' | 'cybersecurity'

export type StoreType = 'appstore' | 'googleplay' | 'rustore' | 'website'

export interface StoreLink {
  type: StoreType
  url: string
  label?: string
}

export interface ProjectClientCountry {
  name: string
  flagUrl?: string
  flagEmoji?: string
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
  clientCountries?: ProjectClientCountry[]
  clientCountryName?: string
  clientCountryFlagUrl?: string
  solvedTasks?: string[]
  solvedTasksTitle?: string
  infoModalKey?: string
}
