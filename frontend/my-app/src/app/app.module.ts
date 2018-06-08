import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatInputModule} from '@angular/material';
import { ResourceService} from './resource.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgDragDropModule } from 'ng-drag-drop';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ArrangementsComponent } from './arrangements/arrangements.component';

import { CardsComponent } from './cards/cards.component';
import { CardSearchComponent } from './card-search/card-search.component';
import { CardEditorComponent } from './card-editor/card-editor.component';
import { CardEditorDetailComponent } from './card-editor-detail/card-editor-detail.component';
import { CarouselComponent, CarouselItemElement } from './carousel/carousel.component';
import { CarouselItemDirective } from './carousel/carousel-item.directive';

import { MessagesComponent } from './messages/messages.component';
import { ResourcesComponent, AddCategoryComponent } from './resources/resources.component';
import { CategorySearchComponent } from './category-search/category-search.component';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    CreateAccountComponent,
    ArrangementsComponent,

    CardsComponent,
    CardSearchComponent,
    CardEditorComponent,
    CardEditorDetailComponent,

    CarouselItemDirective,
    CarouselComponent,
    CarouselItemElement,

    MessagesComponent,
    CardSearchComponent,
    ResourcesComponent,
    CategorySearchComponent,
    AddCategoryComponent



  ],
  imports: [
    BrowserModule,
    NgDragDropModule.forRoot(),
    FormsModule,
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgDragDropModule.forRoot(),
    MatDialogModule,
    MatInputModule,






    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  entryComponents:[ResourcesComponent,AddCategoryComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
