export class DesktopProjectModel {
  public readonly id: number
  public readonly iconPath: string
  public readonly title: string
  public readonly description: string
  public readonly screenshots: string[]
  public readonly technologies: string[]

  constructor(
    id: number,
    iconPath: string,
    title: string,
    description: string,
    screenshots: string[],
    technologies: string[],
  ) {
    this.id = id
    this.iconPath = iconPath
    this.title = title
    this.description = description
    this.screenshots = screenshots
    this.technologies = technologies
  }
}
