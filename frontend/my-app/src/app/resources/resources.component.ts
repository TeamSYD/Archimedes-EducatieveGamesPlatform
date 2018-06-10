import { Component, OnInit, Inject } from '@angular/core';
import { ResourceService } from '../resource.service';
import { CategoryService } from '../category.service';
import { Category } from '../category';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  categories: Category[];

  data1: string;
  constructor(private resourceService: ResourceService,
              private categoryService: CategoryService,
              public dialog: MatDialog) {}

  openCategoryDialog(): void {
    console.log('data na aanroepen functie:  ' + this.data1);
    let dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '250px',
      data:{data: this.data1}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.data1 = result;
    });
  }

  openResourceDialog(): void {
    let dialogRef = this.dialog.open(AddResourceComponent, {
      width: '250px',
      //data:{data: this.data1}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
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


  ];

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  // getResourcesByCategoryId(id: number): void {
  //   this.resourceService.getResourceById()
  //     .subscribe()
  // }

 mySelectHandler($scope): void {
    console.log('Cx123');
 }


  onItemDrop(e: any) {
    // Get the dropped data here
    console.log(e.dragData.id);
  }


}
@Component({
  selector: 'add-resource.component',
  templateUrl: 'add-resource.component.html',
})
export class AddResourceComponent {

  constructor(
    public dialogRef: MatDialogRef<AddResourceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'add-category.component',
  templateUrl: 'add-category.component.html',
})
export class AddCategoryComponent{

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
