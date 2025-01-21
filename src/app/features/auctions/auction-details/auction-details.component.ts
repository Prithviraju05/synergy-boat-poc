import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../../core/auction.service';

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.scss']
})
export class AuctionDetailsComponent implements OnInit {
  auction: any;
  bidAmount: number = 0;
  breadcrumbs: any;

  displayedColumns: string[] = ['amount', 'bidder', 'timestamp'];

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
  ) { }

  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('id');
    // if (id) {
    //   this.fetchAuctionDetails(id);
    // }
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

  fetchAuctionDetails(id: string): void {
    this.auctionService.getAuctions().subscribe({
      next: (data) => {
        this.auction = data.find((item: any) => item.id === id);
      },
      error: (err) => console.error('Error fetching auction details:', err),
    });
  }

  placeBid(): void {
    if (this.bidAmount > this.auction.currentBid) {
      this.auction.currentBid = this.bidAmount;
      this.auction.bidHistory.push({
        amount: this.bidAmount,
        bidder: 'User',
        time: new Date().toISOString(),
      });
    } else {
      alert('Bid amount must be higher than the current bid.');
    }
  }

  onBidPlaced(newBid: number): void {
    this.auctionService.saveBid(this.auction.id, newBid).subscribe({
      next: (updatedAuction) => {
        if (updatedAuction) {
          this.auction = updatedAuction;
          console.log('Bid successfully placed!');
        }
      },
      error: (err) => console.error('Error placing bid:', err),
    });
  }

}
