import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreateAccountComponent} from './create-account/create-account.component';
import {ArrangementsComponent} from './arrangements/arrangements.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {AppRoutingModule} from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { CardEditorComponent } from './card-editor/card-editor.component';
import { CardEditorDetailComponent } from './card-editor-detail/card-editor-detail.component';
import { CardsComponent } from './cards/cards.component';
import { MessagesComponent }    from './messages/messages.component';
import { CardSearchComponent } from './card-search/card-search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CreateAccountComponent,
    ArrangementsComponent,
    FooterComponent,
    CardEditorComponent,
    CardEditorDetailComponent,
    CardsComponent,
    MessagesComponent,
    CardSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TooltipModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // dataEncapsulation:
    // InMemoryDataService ,{dataEncapsulation: false}
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
