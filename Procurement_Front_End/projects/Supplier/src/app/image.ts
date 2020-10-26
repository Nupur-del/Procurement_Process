export interface IImage {
  id: string;
  item_id: string;
  imageName: string;
}

export class Image {
  id: string;
  item_id: string;
  imageName: string;

  constructor(  id: string,
    item_id: string,
    imageName: string){
    this.id = id;
    this.item_id = item_id;
    this.imageName = imageName;
}

}
