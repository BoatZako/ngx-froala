import { Directive, ElementRef, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[froalaEditor]'
})
export class NgxFroalaEditorDirective implements OnInit {

  @Input('model') model: string;
  @Output('modelChange') change = new EventEmitter<string>()

  constructor(
    public el: ElementRef,
  ) { }

  ngOnInit() {
    this.el.nativeElement.innerHTML = this.model || ""
  }

  onModelChange(text: string) {
    this.change.emit(text);
  }

}