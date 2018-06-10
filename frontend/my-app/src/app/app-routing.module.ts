import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreateAccountComponent} from './create-account/create-account.component';
import {ArrangementsComponent} from './arrangements/arrangements.component';
import {CardsComponent} from './cards/cards.component';
import {ResourcesComponent} from './resources/resources.component';
import {CardEditorComponent} from "./card-editor/card-editor.component";
import {CardEditorDetailComponent} from "./card-editor-detail/card-editor-detail.component";
import {CarouselComponent} from "./carousel/carousel.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'create-account', component: CreateAccountComponent},
  {path: 'arrangements', component: ArrangementsComponent},
  {path: 'cards', component: CardsComponent},
  {path: 'carousel', component: CarouselComponent},
  {path: 'resource', component: ResourcesComponent},
  {path: 'card-editor', component: CardEditorComponent},
  {path: 'card-editor-detail', component: CardEditorDetailComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {
}
