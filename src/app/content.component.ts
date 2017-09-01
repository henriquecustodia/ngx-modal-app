import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'content',
    template: `
     <button (click)="add()">Add</button>
      <ng-container *ngFor="let item of items">
        <span> {{ item }} </span>
      </ng-container>
    `
})
export class ContentComponent implements OnInit {
    
    items: string[] = []
    
    constructor() { }

    ngOnInit() { }

    add() {
        this.items.push(`item ${this.items.length + 1}`);
    }
}