import {Component, Inject, OnInit} from '@angular/core';
import {ResourceService} from '../resource.service';
import {CategoryService} from '../category.service';
import {Category} from '../category';
import {Resource} from '../resource';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Bounds, CropperSettings} from 'ngx-img-cropper';
import {SnackbarService} from "../snackbar.service";
import {collectExternalReferences} from "@angular/compiler";
import { DataService } from "../data-service";
import {Game} from "../game";

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  categories: Category[];
  resources: Resource[];

  selectedCategoryId: number;
  selectedCategoryName: string;
  currentCategoryIndex: number;

  game1: String;

  data1: string;

  constructor(private resourceService: ResourceService,
              private categoryService: CategoryService,
              public dialog: MatDialog,
              private snackbarService: SnackbarService,
              private dataService: DataService) {
  }

  OpenSnackBarError(text: String) {
    this.snackbarService.ErrorSnackBar(text);
  }

  OpenSnackbarSucces(text: String) {
    this.snackbarService.SuccesSnackBar(text);
  }

  openCategoryDialog(): void {
    console.log('data na aanroepen functie:  ' + this.data1);
    let dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '250px',
      data: {
        data: this.data1,
        categoryName: this.selectedCategoryName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed!');

      if (this.categoryNameAlreadyInUse(result) == true) {
        this.OpenSnackBarError("The category name: " + result + ", already exists.")
      } else if (result != undefined) {
        this.addCategory(result);
        this.OpenSnackbarSucces("The category: " + result + " has succesfully been added.");
      }

    });
  }


  confirmDeleteDialog(): void {

    this.logFunctie("confirmDeleteDialog");

    if (this.selectedCategoryName != undefined) {
      let dialogRef = this.dialog.open(ConfirmDeleteComponent, {
        width: '250px',
        data: {
          name: this.selectedCategoryName,
          confirm: false,
        }
      });

      dialogRef.afterClosed().subscribe(result => {

        if (result != undefined) {
          console.log('result:' + result);
          this.categoryService.deleteCategory(this.categories[this.currentCategoryIndex]).subscribe((response) => {
            console.log("deleted");

            this.OpenSnackbarSucces("The category: " + this.categories[this.currentCategoryIndex].name + " has been succesfully deleted.");
            this.logFunctie("confirmDeleteDialog after delete");

            for (var category of this.categories) {
              console.log(category.name);
            }

            this.currentCategoryIndex = 0;
            this.getCategories();
            this.getResource(this.categories[this.currentCategoryIndex].id);

          });
        }


      });
    } else {
      this.OpenSnackBarError("Please select a category that you wish to delete.");
    }
  }

  openUpdateCategoryDialog(): void {
    if (this.categories.length != 0) {
      this.selectedCategoryName = this.categories[this.currentCategoryIndex].name;
    }

    this.logFunctie("openUpdateCategoryDialog");
    if (this.currentCategoryIndex != undefined) {
      let dialogRef = this.dialog.open(UpdateCategoryComponent, {
        width: '250px',
        data: {name: this.selectedCategoryName,}
      });
      dialogRef.afterClosed().subscribe(result => {
        for (var category of this.categories) {
          console.log('resultname: ' + result + ' selectedCategoryNAme: ' + this.selectedCategoryName);
          if (result == this.selectedCategoryName) {
            this.OpenSnackBarError("A category with the name: " + result + " already exists!")
          } else if (result == undefined) {
            console.log('Geen naam ingevuld');
          }
          else {
            this.categories[this.currentCategoryIndex].name = result;
            this.saveCategory();
            this.OpenSnackbarSucces("The category's name has been changed to: " + result + ".");
          }
        }
      });
    } else {
      this.OpenSnackBarError("Please select a category first.");
    }

  }

  getSelectedCategoryName(selectedCategoryId: number) {
    for (var category of this.categories) {
      if (category.id == selectedCategoryId) {
        this.selectedCategoryName = category.name;
      }
    }
  }

  categoryNameAlreadyInUse(categoryName: String) {
    for (var category of this.categories) {
      if (category.name == categoryName) {
        return true;
      }
    }
  }

  addCategory(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.categoryService.addCategory({name} as Category)
      .subscribe(category => {
        this.categories.push(category);
      });
  }

  saveCategory(): void {
    this.categoryService.updateCategory(this.categories[this.currentCategoryIndex])
      .subscribe(() => this.categoryService.getCategories());
  }

  logFunctie(text: string) {
    console.log("Functie: " + text + ", current index: " + this.currentCategoryIndex);
    console.log("Functie: " + text + ", selected name: " + this.categories[this.currentCategoryIndex].name);
    console.log("Functie: " + text + ", selected id:: " + this.categories[this.currentCategoryIndex].id);
    console.log("Functie: " + text + ", categories array length: " + this.categories.length);
  }


  selectCategory(e) {

    this.selectedCategoryId = this.categories[e.target.value].id;
    this.currentCategoryIndex = e.target.value;
    this.getSelectedCategoryName(this.selectedCategoryId);
    this.logFunctie("SelectCategory");

    this.getResource(this.categories[this.currentCategoryIndex].id);


  }

  openResourceDialog(): void {
    let dialogRef = this.dialog.open(AddResourceComponent, {
      width: '80vh',
      data: {catID: this.categories[this.currentCategoryIndex].id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let image = result[0].split(',')[1];

      this.saveResource((image), (result[1]));
      this.OpenSnackbarSucces("The image has succesfully been added.");
    });
  }

  ngOnInit() {
    this.getCategories();

  }

  saveResource(image_data: ByteString, catID: number): void {
    this.resourceService.saveResource(image_data, catID)
      .subscribe(resource => {
        this.resources.push(resource);
      });

  }

  getResource(id: number): void {

    this.resourceService.getResourceById(id)
      .subscribe(resources => this.resources = resources);

    this.resources.forEach(function (element) {
      //console.log(element.image_data);
      //element.image_data = atob(element.image_data);
      //console.log("after: "+ element.image_data);
    });

  }



  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories =>
        this.categories = categories);

    if (this.categories.length - 1 == 0) {
      this.selectedCategoryName = undefined;
      this.selectedCategoryId = undefined;
      this.currentCategoryIndex = undefined;
    }

  }


  onItemDrop(e: any) {
    // Get the dropped data here
    console.log(e.dragData.id);
    this.resourceService.deleteResource(e.dragData).subscribe((response) => {
      this.OpenSnackbarSucces('Image deleted!');
      this.getResource(this.categories[this.currentCategoryIndex].id)
    });
  }

  changed(e) {
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
export class SnackbarComponent {
}


@Component({
  selector: 'add-resource.component',
  templateUrl: 'add-resource.component.html',
  styles: [`
    .pull-straight {
      margin: auto;
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
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 150;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.dynamicSizing = false;
    this.imgData = {};
  }

  cropped(bounds: Bounds) {
    //console.log(bounds);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}

@Component({
  selector: 'add-category.component',
  templateUrl: 'add-category.component.html',
})
export class AddCategoryComponent {

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'change-category.component',
  templateUrl: 'change-category.component.html',
})
export class UpdateCategoryComponent {

  constructor(
    public dialogRef: MatDialogRef<UpdateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'confirm-delete-category.component',
  templateUrl: 'confirm-delete-category.component.html',
})
export class ConfirmDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.data.confirm = true;
  }

  confirmDelete() {
  }

}
