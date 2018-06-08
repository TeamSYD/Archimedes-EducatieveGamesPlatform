import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../resource.service';
import { CategoryService } from '../category.service';
import { Category } from '../category';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  categories: Category[];

  constructor(private resourceService: ResourceService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  items = [
    {id:1, imgUrl:"../../assets/angular-logo.png"},
    {id:2, imgUrl:"../../assets/angular-logo.png"},
    {id:3, imgUrl:"../../assets/angular-logo.png"},
    {id:4, imgUrl:"../../assets/angular-logo.png"},
    {id:5, imgUrl:"../../assets/angular-logo.png"},
    {id:6, imgUrl:"../../assets/angular-logo.png"},
    {id:7, imgUrl:"../../assets/angular-logo.png"},
    {id:8, imgUrl:"../../assets/angular-logo.png"},
    {id:9, imgUrl:"../../assets/angular-logo.png"},
    {id:10, imgUrl:"../../assets/angular-logo.png"},
    {id:11, imgUrl:"../../assets/angular-logo.png"},
    {id:12, imgUrl:"../../assets/angular-logo.png"},


  ]

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  onItemDrop(e: any) {
    // Get the dropped data here
    console.log(e.dragData.id);
  }


}
