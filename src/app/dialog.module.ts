import {
    Component, OnInit, Injectable, ViewChild,
    ViewContainerRef, Type, ComponentFactoryResolver,
    Injector, NgModule, ApplicationRef
} from '@angular/core';

class HostElements {
    constructor(
        public host: HTMLElement,
        public modal: HTMLElement,
        public backdrop: HTMLElement
    ) { }
}

@Injectable()
export class DialogService {

    private hostElements: HostElements;
    
    private hostElementName: string = 'dialog-host';

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector,
        private appRef: ApplicationRef
    ) { }

    open(component: Type<any>) {
        const hostElements = this.createHost();

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        const componenRef = componentFactory.create(
            this.injector, 
            [], 
            hostElements.modal
        );
            
        this.appRef.attachView(componenRef.hostView);
    }

    private createHost(): HostElements {
        const body = document.querySelector('body');
        const children = Array.from(body.children);

        const has = children.some(_ => _.tagName === this.hostElementName);
        
        if(!has) {
            const host = document.createElement(this.hostElementName);
            
            const backdrop = document.createElement('div');
            backdrop.classList.add('backdrop');
    
            const modal = document.createElement('div');
            modal.classList.add('modal');

            host.appendChild(backdrop);
            host.appendChild(modal);

            body.appendChild(host);

            return this.hostElements = new HostElements(host, modal, backdrop);
        }

        return this.hostElements;
    }

}

@NgModule({
    providers: [DialogService],
})
export class DialogModule { }