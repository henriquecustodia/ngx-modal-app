import {
    Component, OnInit, Injectable, ViewChild,
    ViewContainerRef, Type, ComponentFactoryResolver,
    Injector, NgModule, ApplicationRef
} from '@angular/core';

@Component({
    selector: 'backdrop',
    styles: [
        `
      .backdrop { 
        position: absolute;
        z-index: 1000;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.5;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
      
      .modal {
        position: absolute;
        z-index: 1500;
        top: calc(50% - 200px);
        left: calc(50% - 200px);
        width: 400px;
        height: 400px;
        background: #fff
      }
      `
    ],
    template: `
      <div class="backdrop"></div>
      <div class="modal">
        <ng-content></ng-content>
      </div>
    `
})
export class BackdropComponent implements OnInit {

    @ViewChild('container', { read: ViewContainerRef })
    container: ViewContainerRef;

    ngOnInit() { }
}

@Injectable()
export class DialogService {

    private hostElementName: string = 'dialog-host';

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector,
        private appRef: ApplicationRef
    ) { }

    open(component: Type<any>) {
        this.createHost();

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        const componenRef = componentFactory.create(this.injector);
            
        const backdropFactory = this.componentFactoryResolver.resolveComponentFactory(BackdropComponent);
        const ref = backdropFactory.create(
                this.injector, 
                [[componenRef.location.nativeElement]], 
                document.querySelector(this.hostElementName)
            );

        this.appRef.attachView(ref.hostView);
    }

    private createHost() {
        const body = document.querySelector('body');
        const children = Array.from(body.children);

        const has = children.some(_ => _.tagName === this.hostElementName);

        if(!has) {
            const host = document.createElement(this.hostElementName);
            body.appendChild(host);
        }
    }

}

@NgModule({
    declarations: [BackdropComponent],
    providers: [DialogService],
    entryComponents: [BackdropComponent]
})
export class DialogModule { }