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

  selectedCategoryId: number;
  selectedCategoryName: string;
  currentCategoryIndex: number;

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

  test123(){
    console.log('asdasdasdasasd');
  }

  openCategoryDialog(): void {
    console.log('data na aanroepen functie:  ' + this.data1);
    let dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '250px',
      data:{data: this.data1,
            categoryName: this.selectedCategoryName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed!');

      if(this.categoryNameAlreadyInUse(result) == true){
        this.OpenSnackBarError("The category name: " + result + ", already exists." )
      } else if(result != undefined){
        this.addCategory(result);
        this.OpenSnackbarSucces("The category: " + result + " has succesfully been added.");
      }

    });
  }


  openUpdateCategoryDialog(): void {
    if(this.selectedCategoryName != undefined){
      let dialogRef = this.dialog.open(UpdateCategoryComponent, {
        width: '250px',
        data:{name: this.selectedCategoryName,
        category: this.categories[this.currentCategoryIndex]}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('sadasdasd');
        console.log('xD poo ' + result.name);
      });
    } else {
      this.OpenSnackBarError("Please select a category first.");
    }

  }

  getSelectedCategoryName(selectedCategoryId: number){
    for (var category of this.categories) {
      if(category.id == selectedCategoryId){
        this.selectedCategoryName = category.name;
      }
  }}

  categoryNameAlreadyInUse(categoryName: String){
    for (var category of this.categories){
      if(category.name == categoryName){
        return true;
      }
    }
  }

  addCategory(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.categoryService.addCategory({ name } as Category)
      .subscribe(category => {
        this.categories.push(category);
      });
  }

  saveCategory(): void {
    this.categoryService.updateCategory(this.categories[this.currentCategoryIndex])
      .subscribe(() => this.categoryService.getCategories());
  }


  selectCategory(e) {


    this.selectedCategoryId = this.categories[e.target.value].id;
    this.currentCategoryIndex = e.target.value;

    console.log('de index van deze categorie is:' + e.target.value);

    this.items = [
      {id: 1, imgUrl: "../../assets/2"},
      {id: 2, imgUrl: "../../assets/1"}];

    console.log('id: ' + this.selectedCategoryId);

    this.getSelectedCategoryName(this.selectedCategoryId);
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


@Component({
  selector: 'change-category.component',
  templateUrl: 'change-category.component.html',
})
export class UpdateCategoryComponent{

  constructor(
    public dialogRef: MatDialogRef<UpdateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
