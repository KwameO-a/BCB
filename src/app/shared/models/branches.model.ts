import { IHostHeaderInfo } from "./host-header-info.model"


export interface IBranchesResponse{
  fiBranchInfo : IBranch[]
  hostHeaderInfo : IHostHeaderInfo
}

export interface IBranch{
  id : string,
  branch : string
}