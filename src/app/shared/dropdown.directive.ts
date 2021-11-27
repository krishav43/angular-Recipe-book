import { Directive, Renderer2, ElementRef, HostBinding, HostListener ,Renderer} from '@angular/core';
import { callLifecycleHooksChildrenFirst } from '@angular/core/src/view/provider';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open')isActive:boolean=false;

  constructor(private elRef:ElementRef,private renderer:Renderer) { }

  @HostListener('document:click', ['$event'])mouseclick(eventData:Event){
    //this.isActive=!this.isActive;
    this.isActive=this.elRef.nativeElement.contains(event.target)?!this.isActive:false;
  }

}
