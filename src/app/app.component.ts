import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AuctionService } from './core/auction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'synergyboat-auction';
  auction: any;
  bidAmount: number = 0;
  breadcrumbs:any;
  
  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.auctionService.getAuctionById(id).subscribe({
        next: (data) => (this.auction = data),
        error: (err) => console.error('Error fetching auction details:', err),
      });
    }

    this.breadcrumbs = [
      { label: 'Home', url: '/' },
      { label: 'Auctions', url: '/auctions' },
      { label: 'Auction Details', url: `/auctions/${id}` },
    ];
  }
}
