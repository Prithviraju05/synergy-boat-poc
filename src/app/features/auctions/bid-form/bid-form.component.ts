import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuctionService } from '../../../core/auction.service';
// import { AuctionService } from 'src/app/services/auction.service';

@Component({
  selector: 'app-bid-form',
  templateUrl: './bid-form.component.html',
  styleUrls: ['./bid-form.component.scss']
})
export class BidFormComponent implements OnInit {
  @Input() auctionId!: string; // Auction ID passed from parent component
  bidAmount: number | null = null;

  constructor(private auctionService: AuctionService) {}

  ngOnInit(): void {}

  placeBid(bidForm: NgForm): void {
    if (bidForm.valid) {
      this.auctionService.placeBid(this.auctionId, this.bidAmount!).subscribe({
        next: () => {
          alert('Bid placed successfully!');
          this.bidAmount = null; // Reset bid amount
        },
        error: (err) => {
          console.error('Error placing bid:', err);
          alert('Failed to place bid. Try again.');
        }
      });
    }
  }
}
