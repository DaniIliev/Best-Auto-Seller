import { UserDetails } from "./userDetails"

export interface Auto {
  brand: string,
  description: string,
  id: string | undefined,
  userId: string 
  manufactureYear: string,
  imageUrl:string,
  model: string,
  motor: string,
  type: string,
  comments: Comment[],
  userDetails: UserDetails,

  
}
