import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionListComponent } from './auction-list/auction-list.component';
import { AuctionDetailsComponent } from './auction-details/auction-details.component';

const routes: Routes = [
  { path: '', component: AuctionListComponent },
  { path: ':id', component: AuctionDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionsRoutingModule {}
