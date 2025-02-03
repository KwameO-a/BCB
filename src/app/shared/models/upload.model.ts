export interface MultipleFileUploadResponse {
    responseCode: string;
    responseMsg: string;
    fileInfo: FileInfo[];
  }
  
export  interface FileInfo {
    fileName: string;
    filePath: string;
  }
  