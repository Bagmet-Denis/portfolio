export class MobileProjectModel {
  public readonly id: number
  public readonly iconPath: string
  public readonly title: string
  public readonly description: string
  public readonly screenshots: string[]
  public readonly technologies: string[]
  public readonly appStoreUrl: string
  public readonly googlePlayUrl: string
  public readonly ruStoreUrl: string

  constructor(
    id: number,
    iconPath: string,
    title: string,
    description: string,
    screenshots: string[],
    technologies: string[],
    appStoreUrl: string,
    googlePlayUrl: string,
    ruStoreUrl: string,
  ) {
    this.id = id
    this.iconPath = iconPath
    this.title = title
    this.description = description
    this.screenshots = screenshots
    this.technologies = technologies
    this.appStoreUrl = appStoreUrl
    this.googlePlayUrl = googlePlayUrl
    this.ruStoreUrl = ruStoreUrl
  }
}
