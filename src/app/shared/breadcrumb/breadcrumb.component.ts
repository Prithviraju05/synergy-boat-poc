import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <nav>
      <ol class="breadcrumb">
        <li *ngFor="let crumb of breadcrumbs; let last = last" [class.active]="last">
          <a *ngIf="!last; else lastCrumb" [routerLink]="crumb.url">{{ crumb.label }}</a>
          <ng-template #lastCrumb>{{ crumb.label }}</ng-template>
        </li>
      </ol>
    </nav>
  `,
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() breadcrumbs: { label: string; url: string }[] = [];
}

