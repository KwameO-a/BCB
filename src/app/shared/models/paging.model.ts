export interface IPageController{
    currentPage : number;
    totalItems : number;
    pageLimit : number
}

export class PageController implements IPageController{

    constructor(){
        this.currentPage = 1;
        this.totalItems = 0;
        this.pageLimit = 50;
    }
    currentPage: number;
    totalItems: number;
    pageLimit: number;
}

export interface ITablePageController{
    active : IPageController;
    rejected : IPageController;
    completed : IPageController;
    all : IPageController;
    inflows : IPageController;
}



export class TablePageController implements ITablePageController{


    constructor(){
        this.active = new PageController();
        this.rejected = new PageController();
        this.completed = new PageController();
        this.all = new PageController();
        this.inflows = new PageController();
    }
    active: IPageController;
    rejected: IPageController;
    completed: IPageController;
    all: IPageController;
    inflows: IPageController;

}