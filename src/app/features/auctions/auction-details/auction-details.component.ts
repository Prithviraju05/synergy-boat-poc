import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../../core/auction.service';
// import { AuctionService } from 'src/app/services/auction.service';

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.scss']
})


export class AuctionDetailsComponent implements OnInit {
  auction:  any = null;
  // bidAmount: number = 0;
  bids: any[] = [];
  bidAmount: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
  ) {}


  ngOnInit(): void {
    const auctionId = this.route.snapshot.paramMap.get('id');
    if (auctionId) {
      this.auctionService.getAuctionById(auctionId).subscribe({
        next: (data) => {
          this.auction = data;
          this.bids = data.bids || []; // Initialize bid history
        },
        error: (err) => console.error('Error fetching auction details:', err),
      });
    }
  }

  placeBid(): void {
    if (this.bidAmount && this.bidAmount > this.auction.currentBid) {
      const newBid = { bidder: 'User123', amount: this.bidAmount };
      this.bids.unshift(newBid); // Add bid to history
      this.auction.currentBid = this.bidAmount; // Update current bid

      // Simulate saving bid
      this.auctionService.saveBid(this.auction.id, newBid).subscribe({
        next: () => console.log('Bid placed successfully.'),
        error: (err) => console.error('Error placing bid:', err),
      });

      this.bidAmount = null; // Reset bid amount
    }
  }
}
