import { Component, OnInit, Inject,Type } from '@angular/core';
import { ResourceService } from '../resource.service';
import { CategoryService } from '../category.service';
import { Category } from '../category';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ngx-img-cropper';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {SnackbarService} from "../snackbar.service";
import {forEach} from "@angular/router/src/utils/collection";

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
              public dialog: MatDialog,
              private snackbarService: SnackbarService) {}


  OpenSnackBarError(text: String) {
    this.snackbarService.ErrorSnackBar(text);
  }

  OpenSnackbarSucces(text: String){
    this.snackbarService.SuccesSnackBar(text);
  }

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


  test(e){
    this.items = [
      {id:1, imgUrl:"../../assets/2"},
      {id:2, imgUrl:"../../assets/1"}]
}

  openResourceDialog(): void {
    let dialogRef = this.dialog.open(AddResourceComponent, {
      width: '50%',
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
      .subscribe(categories =>
        this.categories = categories);

     }
  // getResourcesByCategoryId(id: number): void {
  //   this.resourceService.getResourceById()
  //     .subscribe()
  // }



  onItemDrop(e: any) {
    // Get the dropped data here
    console.log(e.dragData.imgUrl);
  }

  changed(e){
    //event comes as parameter, you'll have to find selectedData manually
    //by using e.target.data
    console.log(e.target.data);

  }


}


@Component({
  selector: 'snack-bar-component',
  templateUrl: '../snack-bar-component.html',
  styles: [],
})
export class PizzaPartyComponent {}


@Component({
  selector: 'add-resource.component',
  templateUrl: 'add-resource.component.html',
  styles: [`
    .pull-straight {
      width: 100%;
      height: 100%;
      float: left;
      background-color: rgba(0, 0, 0, 0.05);
    }`],
})
export class AddResourceComponent {

  imgData: any;
  cropperSettings: CropperSettings;

  constructor(
    public dialogRef: MatDialogRef<AddResourceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 150;
    this.cropperSettings.croppedWidth =100;
    this.cropperSettings.croppedHeight = 150;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.dynamicSizing = false;
    this.imgData = {};
  }
  cropped(bounds:Bounds) {
    //console.log(bounds);
  }
  toggle(){
    throw new Error("oops");
  }


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
