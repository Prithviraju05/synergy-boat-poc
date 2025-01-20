import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionListComponent } from './auction-list/auction-list.component';
import { AuctionsRoutingModule } from './auctions-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { BidFormComponent } from './bid-form/bid-form.component';
import { AuctionDetailsComponent } from './auction-details/auction-details.component';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    AuctionListComponent,
    BidFormComponent,
    AuctionDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    NgxPaginationModule,
    AuctionsRoutingModule,
    MatInputModule,
    MatListModule
  ]
})
export class AuctionsModule {}

