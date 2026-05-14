export class CyberSecurityProject {
  public readonly id: number
  public readonly title: string
  public readonly description: string
  public readonly imagePath: string

  constructor(
    id: number,
    title: string,
    description: string,
    imagePath: string,
  ) {
    this.id = id
    this.title = title
    this.description = description
    this.imagePath = imagePath
  }
}
