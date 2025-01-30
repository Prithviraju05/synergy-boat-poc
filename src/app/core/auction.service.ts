import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  private dataUrl = 'assets/mock-data/mock-auction-data.json'; // Path to mock JSON file
  private auctions: any[] = []; // Local cache for auction data

  constructor(private http: HttpClient) {}

  // Fetch auction data from the mock JSON file
  getAuctions(): Observable<any[]> {
    if (this.auctions.length > 0) {
      return of(this.auctions); // Return cached data if available
    }
    return this.http.get<any[]>(this.dataUrl).pipe(
      map((data) => {
        this.auctions = data; // Cache the data
        return this.auctions;
      })
    );
  }

  // Fetch a single auction by ID
  getAuctionById(id: string): Observable<any> {
    return this.getAuctions().pipe(
      map((auctions) => auctions.find((auction) => auction.id === id))
    );
  }

  // Save a new bid for a specific auction
  saveBid(id: string, newBid: number): Observable<any> {
    const auction = this.auctions.find((a) => a.id === id);
    if (auction) {
      auction.bidHistory.push({
        amount: newBid,
        bidder: 'User', // Mock bidder name
        timestamp: new Date().toISOString(),
      });
      auction.currentBid = newBid; // Update the current bid
      return of(auction); // Return the updated auction
    }
    return of(null); // Return null if auction not found
  }
}
