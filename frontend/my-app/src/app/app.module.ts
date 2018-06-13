// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// TODO: Ngmodule wordt niet gebruikt, dependency checken.
import {ErrorHandler, NgModule} from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { NgDragDropModule } from 'ng-drag-drop';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatInputModule,MatGridListModule,MatSlideToggleModule} from '@angular/material';
import { ImageCropperComponent, CropperSettings } from "ngx-img-cropper";
import * as Raven from 'raven-js';

// MODULES: WEB MOCKUP DATA
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

// COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ArrangementsComponent } from './arrangements/arrangements.component';

import { CardsComponent } from './cards/cards.component';
import { CardEditorComponent } from './card-editor/card-editor.component';
import { CardEditorDetailComponent } from './card-editor-detail/card-editor-detail.component';

import { CarouselComponent, CarouselItemElement } from './carousel/carousel.component';
import { ResourcesComponent } from './resources/resources.component';
import { MessagesComponent } from './messages/messages.component';

// COMPONENTS: SEARCH
import { CategorySearchComponent } from './category-search/category-search.component';
import { CardSearchComponent } from './card-search/card-search.component';

// COMPONENTS: ADD
import { AddResourceComponent } from "./resources/resources.component";
import { AddCategoryComponent } from './resources/resources.component';

// SERVICES
import { ResourceService} from './resource.service';

// DIRECTIVES
import { CarouselItemDirective } from './carousel/carousel-item.directive';

Raven
  .config('https://e0659b2825b54c52abce4fd1d8f40df0@sentry.io/1225718')
  .install();
export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    Raven.captureException(err);
  }
}
@NgModule({
  declarations: [
    // COMPONENTS
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    CreateAccountComponent,
    ArrangementsComponent,

    CardsComponent,
    CardEditorComponent,
    CardEditorDetailComponent,

    CarouselComponent,
    CarouselItemElement,

    MessagesComponent,
    ResourcesComponent,

    // COMPONENTS: SEARCH
    CardSearchComponent,
    CategorySearchComponent,

    // COMPONENTS: ADD
    AddCategoryComponent,
    AddResourceComponent,

    // SERVICES
    // ResourceService,
    ImageCropperComponent,
    // DIRECTIVES
    CarouselItemDirective,
  ],
  imports: [
    // MODULES
    BrowserModule,
    BrowserAnimationsModule,
    NgDragDropModule.forRoot(),
    FormsModule,
    TooltipModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatGridListModule,
    MatSlideToggleModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [{ provide: ErrorHandler, useClass: RavenErrorHandler }],
  entryComponents:[ResourcesComponent, AddCategoryComponent,AddResourceComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
