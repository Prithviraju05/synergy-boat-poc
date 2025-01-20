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
  filterStatus: string = 'all'; // Filter by status: all, active, or upcoming
  searchKeyword: string = ''; // Keyword for search
  sortOption: string = ''; // Sorting option: price, name, etc.
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 5; // Items to display per page

  constructor(private auctionService: AuctionService) {}

  ngOnInit(): void {
    this.fetchAuctions();
  }

  fetchAuctions(): void {
    this.auctionService.getAuctions().subscribe({
      next: (data) => {
        this.auctions = data.map(auction => ({
          ...auction,
          bidHistory: auction.bidHistory || [],
          currentBid: auction.currentBid || 0,
        }));
        this.filteredAuctions = [...this.auctions];
        this.applyFilters();
      },
      error: (err) => console.error('Error fetching auctions:', err),
    });
  }

  applyFilters(): void {
    this.filteredAuctions = this.auctions
      .filter((auction: any) =>
        this.filterStatus === 'all' ? true : auction.status === this.filterStatus
      )
      .filter((auction: any) =>
        this.searchKeyword
          ? auction.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
          : true
      )
      .sort((a: any, b: any) => {
        if (this.sortOption === 'price') {
          return a.currentBid - b.currentBid;
        }
        if (this.sortOption === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
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
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAuctions.slice(start, start + this.itemsPerPage);
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
  }
}
