import { IRequestHeaderInfo } from "./request-header-info.model"

export interface ICommentRequest {
  name: string
}

export interface ICommentDialogResponse {
  comment: string
}


export interface IAuthorizeRequest{
  headerRequest : IRequestHeaderInfo,
  originalRequestId: string,
  checkerId: string,
  checkerRemarks: string,
  status: string
}
