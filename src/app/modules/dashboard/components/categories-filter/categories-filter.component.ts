import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ICategory } from 'src/app/shared/models/categories.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrls: ['./categories-filter.component.scss']
})
export class CategoriesFilterComponent implements OnInit {

  assetUrl = environment.assetsUrl;

  @Input() title: string = "Back";
  @Input() showRecommendations: boolean = false;

  //@ts-ignore
  selectedRecommendationId: string | null = null;
  @Output() selectedRecommendationChanged: EventEmitter<ICategory> = new EventEmitter();

  all: ICategory = {
    "id": "",
    title: "All"
  }
  categories: ICategory[] = [
    { id: "1", title: "Sharepoint", },
    { id: "2", title: "Education", },
    { id: "3", title: "Network", },
    { id: "4", title: "Branch", },
    { id: "5", title: "Welfare", },
    { id: "6", title: "Finance" },
  ]
  // recommendations = ["All", "Sharepoint", "Education", "Network", "Branch", "Welfare","Finance"]
  constructor(
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedRecommendationId = params.get('id') || null;
    })


  }

  ngOnInit(): void {
  }
}
