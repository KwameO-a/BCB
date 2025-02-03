import { PACKAGES } from "../constants/app.constants";


export interface IRequirement{
  
    color? : string;
    name: string,
    id : PACKAGES;
    icon : string;
    description : string;
    requirements: {
      title: string,
      data: { heading: string, data: string[] }[]
    }[]
  
}