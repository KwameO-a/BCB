import { IHostHeaderInfo } from "./host-header-info.model";
import { IRequestHeaderInfo, RequestHeaderInfo } from "./request-header-info.model";


//extend the response from a Requests to fill this model
export interface RequestsTableModel{
  index : number;
  id : string;
  cif : string;
  checked: boolean;
  name: string;
  date: string;
  createdBy : string
  status : string;
  makerId : string;
  accountNumber : string;
  associatedAccounts : []
  
}

