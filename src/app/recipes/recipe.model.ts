export class Recipe {
  public name: string;
  public descrition: string;
  public imagePath: string;

  constructor(name: string, desc: string, imagePath: string) {
    this.name = name;
    this.descrition = desc;
    this.imagePath = imagePath;
  }
}
