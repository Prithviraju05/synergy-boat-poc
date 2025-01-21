import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auctions',
    loadChildren: () =>
      import('./features/auctions/auctions.module').then(
        (m) => m.AuctionsModule
      )
  },
  { path: '', redirectTo: '/auctions', pathMatch: 'full' },
  { path: '**', redirectTo: '/auctions' }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    })
  ],
})
export class AppRoutingModule {}
