import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../../core/auction.service';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.scss']
})
export class AuctionListComponent implements OnInit {
  auctions: any[] = [];
  filteredAuctions: any[] = [];
  filterStatus: string = 'all';
  searchKeyword: string = '';
  sortOption: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  displayedColumns: string[] = ['name', 'status', 'currentBid', 'actions'];

  constructor(private auctionService: AuctionService) { }

  ngOnInit(): void {
    this.fetchAuctions();
  }

  fetchAuctions(): void {
    this.auctionService.getAuctions().subscribe({
      next: (data) => {
        this.auctions = data;
        this.filteredAuctions = [...this.auctions];
        this.applyFilters();
      },
      error: (err) => console.error('Error fetching auctions:', err),
    });
  }


  applyFilters(): void {
    this.filteredAuctions = this.auctions.filter((auction) =>
      this.filterStatus === 'all' ? true : auction.status === this.filterStatus
    );

    if (this.searchKeyword) {
      this.filteredAuctions = this.filteredAuctions.filter((auction) =>
        auction.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }

    this.applySorting();
    this.currentPage = 1;
  }

  applySorting(): void {
    if (this.sortOption === 'price') {
      this.filteredAuctions.sort((a, b) => a.currentBid - b.currentBid);
    } else if (this.sortOption === 'name') {
      this.filteredAuctions.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  onSearchKeywordChange(): void {
    this.applyFilters();
  }

  onFilterStatusChange(): void {
    this.applyFilters();
  }

  onSortOptionChange(): void {
    this.applyFilters();
  }

  get paginatedAuctions(): any[] {
    if (!this.filteredAuctions || this.filteredAuctions.length === 0) {
      return [];
    }
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAuctions.slice(start, start + this.itemsPerPage);
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
  }
}
