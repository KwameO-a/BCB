
export interface ILink {
  id: string;
  title: string;
  description: string;
  icon: string;
  url: string;
  liked: boolean;
}

export interface ILinkResponse{
  links : ILink[]
}