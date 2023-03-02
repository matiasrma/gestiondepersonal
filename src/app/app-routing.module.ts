import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CamaraComponent } from './components/camara/camara.component';

const routes: Routes = [
  { path:'', component: CamaraComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
