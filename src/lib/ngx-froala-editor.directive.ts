import { Directive, ElementRef, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[froalaEditor]'
})
export class NgxFroalaEditorDirective implements OnInit {

  @Input('model') model: string;
  @Output('modelChange') change = new EventEmitter<string>()

  private _display: any;

  constructor(
    public el: ElementRef,
  ) { }

  ngOnInit() {
    this.hide();
    this.el.nativeElement.innerHTML = this.model || ""
  }

  show() {
    this.el.nativeElement.style.display = this._display
  }

  hide() {
    this._display = this.el.nativeElement.style.display
    this.el.nativeElement.style.display = 'none'
  }

  onModelChange(text: string) {
    this.change.emit(text);
  }

}