export interface Plan {
  idSubType: number;
  price: number | null; // Puedes ajustar el tipo según tus necesidades
  name: string;
  quality: string;
  resolution: string;
  deviceNum: number;
  subscriptionIdList: number[];
}
