import { ContentComponent } from './content.component';
import { DialogService } from './dialog.module';
import {
  ViewRef,
  Component, ComponentFactory,
  OnInit, ComponentFactoryResolver,
  Injector, ViewChild,
  ViewContainerRef, Type
} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="create()">Create</button>
  `,
  styles: []
})
export class AppComponent {

  constructor(private dialog: DialogService) { }

  create() {
    this.dialog.open(ContentComponent);
  }

}
