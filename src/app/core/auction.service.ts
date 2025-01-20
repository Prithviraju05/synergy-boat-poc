import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private dataUrl = 'assets/mock-data/mock-auction-data.json';

  constructor(private http: HttpClient) {}

  private auctions: any = [
    {
      id: '1',
      name: 'Luxury Yacht',
      type: 'Yacht',
      currentBid: 500000,
      status: 'Active',
    },
    {
      id: '2',
      name: 'Fishing Boat',
      type: 'Fishing',
      currentBid: 20000,
      status: 'Active',
    }
  ];

  getAuctions(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }

  getAuctionById2(id: any): Observable<any> {
    return this.http.get<any>(`assets/mock-data/mock-auction-data.json`)
      .pipe(map((auctions:any) => auctions.find((a:any) => a.id === id)));
  }

  getAuctionById(id: string): Observable<any> {
    const auction = this.auctions.find((a:any) => a.id === id) || null;
    console.log(auction);
    
    return of(auction); // Simulate an Observable response
  }

  // placeBid(auctionId: string, bidAmount: number): Observable<any> {
  //   return this.http.post<any>(`/api/auction/${auctionId}/bid`, { bidAmount });
  // }

  placeBid2(auctionId: string, bidAmount: number): Observable<any> {
    // Mock implementation: Replace with API call in a real setup
    console.log(`Placing bid of ${bidAmount} for auction ID ${auctionId}`);
    // return of({ success: true });
    return of({ success: true, message: 'Bid placed successfully!' });
  }

  placeBid(auctionId: string, bidAmount: number): Observable<any> {
    console.log(`Placing bid of ${bidAmount} for auction ID ${auctionId}`);
    return this.http.get<any>('/assets/mock-bid-response.json'); // Mock response
  }
  
  saveBid(auctionId: string, bid: any): Observable<any> {
    console.log('Saving bid for auction', auctionId, bid); // Mock behavior
    return of({ success: true }).pipe(delay(500)); // Simulate server delay
  }
  

  
}