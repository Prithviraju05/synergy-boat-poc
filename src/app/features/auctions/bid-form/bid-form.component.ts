import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuctionService } from '../../../core/auction.service';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bid-form',
  templateUrl: './bid-form.component.html',
  styleUrls: ['./bid-form.component.scss']
})
export class BidFormComponent implements OnInit {
  @Input() auctionId: string = '';
  @Input() currentBid: number = 0;
  @Output() bidPlaced = new EventEmitter<any>();

  bidForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private auctionService: AuctionService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.bidForm = this.fb.group({
      bidAmount: [
        '',
        [Validators.required, Validators.min(this.currentBid + 1)]
      ]
    });
  }

  placeBid(): void {
    if (this.bidForm.invalid) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { amount: this.bidForm.value.bidAmount }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.auctionService.saveBid(this.auctionId, this.bidForm.value.bidAmount).subscribe({
          next: (updatedAuction) => {
            this.bidPlaced.emit(updatedAuction);
            this.errorMessage = '';
            this.bidForm.reset();
          },
          error: () => {
            this.errorMessage = 'Failed to place bid. Please try again later.';
          }
        });
      }
    });
  }
}
