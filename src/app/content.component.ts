import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'content',
    template: `
      <h1>Content</h1>
    `
})
export class ContentComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}