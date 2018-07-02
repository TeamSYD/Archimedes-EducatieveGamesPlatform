import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// TODO: Ngmodule wordt niet gebruikt, dependency checken.
import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import {NgDragDropModule} from 'ng-drag-drop';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {AppRoutingModule} from './app-routing.module';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatGridListModule,
  MatInputModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule
} from '@angular/material';
import {ImageCropperComponent} from "ngx-img-cropper";
import * as Raven from 'raven-js';
// MODULES: WEB MOCKUP DATA
// COMPONENTS
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FooterComponent} from './footer/footer.component';
import {CreateAccountComponent} from './create-account/create-account.component';
import {ArrangementsComponent} from './arrangements/arrangements.component';

import {CardsComponent} from './cards/cards.component';
import {CardEditorComponent} from './card-editor/card-editor.component';
import {CardEditorDetailComponent} from './card-editor-detail/card-editor-detail.component';

import {GameEditorSetsComponent} from './game-editor-sets/game-editor-sets.component';
import {CarouselComponent, CarouselItemElement} from './carousel/carousel.component';
// COMPONENTS: ADD/UPDATE/ELETE
import {
  AddCategoryComponent,
  AddResourceComponent,
  ConfirmDeleteComponent,
  ResourcesComponent,
  UpdateCategoryComponent
} from './resources/resources.component';
import {MessagesComponent} from './messages/messages.component';
import {SetsComponent} from './sets/sets.component';
import {SetRowComponent} from './set-row/set-row.component';
import {MaintainGameComponent} from "./maintain-game/maintain-game.component";
import {MemoryComponent} from './memory/memory.component';
import {ChessboardComponent} from './memory/chessboard/chessboard.component';
import {StatusComponent} from './memory/status/status.component';
import {CardComponent} from './memory/chessboard/card.component';
import {GameSpelenComponent} from "./game-spelen/game-spelen.component";
// COMPONENTS: SEARCH
import {CategorySearchComponent} from './category-search/category-search.component';
import {CardSearchComponent} from './card-search/card-search.component';
import {SnackbarComponent} from './snackbar.service';
import {AddGameComponent} from './add-game/add-game.component'
// SERVICES
// DIRECTIVES
import { CarouselItemDirective } from './carousel/carousel-item.directive';
import { GamesComponent } from './games/games.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { PuzzleComponent } from './puzzle/puzzle.component';


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
    AddGameComponent,

    CardsComponent,
    CardEditorComponent,
    CardEditorDetailComponent,

    CarouselComponent,
    CarouselItemElement,

    MessagesComponent,
    ResourcesComponent,
    SnackbarComponent,

    // COMPONENTS: SEARCH
    CardSearchComponent,
    CategorySearchComponent,

    // COMPONENTS: ADD
    AddCategoryComponent,
    AddResourceComponent,

    // COMPONENTS: DELETE
    ConfirmDeleteComponent,

    // COMPONENTS: UPDATE
    UpdateCategoryComponent,

    // SERVICES
    // ResourceService,
    ImageCropperComponent,
    // DIRECTIVES
    CarouselItemDirective,
    GameEditorSetsComponent,
    SetsComponent,
    SetRowComponent,

    MaintainGameComponent,
    GameSpelenComponent,
    GamesComponent,
    ScoreboardComponent,
    PuzzleComponent,
    MemoryComponent,
    ChessboardComponent,
    StatusComponent,
    CardComponent

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
    MatSlideToggleModule,
    MatGridListModule,
    MatSnackBarModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatSliderModule,
    MatCheckboxModule,



    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [{ provide: ErrorHandler, useClass: RavenErrorHandler }],
  entryComponents:[ResourcesComponent, AddCategoryComponent,AddResourceComponent, SnackbarComponent, UpdateCategoryComponent, ConfirmDeleteComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
