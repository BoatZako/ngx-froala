import { Directive, ElementRef, Input, OnInit, AfterViewInit, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { FroalaOptions } from './ngx-froala.interface';

declare var FroalaEditor: any;

const noop: any = () => { }

@Directive({
  selector: '[froalaEditor]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxFroalaEditorDirective),
    multi: true
  }]
})
export class NgxFroalaEditorDirective implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input() options: FroalaOptions;
  @Output() oncreated = new EventEmitter<void>();

  update$ = new Subject<void>()
  change$ = new Subject<void>()

  private _editor: any;
  private _value: string;

  constructor(
    public el: ElementRef,
  ) { }

  ngOnInit(): void {
    this.update$.subscribe(() => {
      this._editor?.html?.set(this._value)
    })
    this.change$.subscribe((v) => {
      this.value = this._editor.html.get()
    })

    let options = {
      events: {
        initialized: () => {
          this.update$.next()
          this.oncreated.emit()
        },
        contentChanged: () => {
          this.change$.next()
        }
      }
    }
    Object.assign(this.options, options)
  }

  ngAfterViewInit() {
    this._editor = new FroalaEditor(this.el.nativeElement, this.options);
  }

  get value(): any { return this._value; };
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  onChange = noop;
  onTouched = noop;
  writeValue(v: string): void {
    this._value = v;
    this.update$.next()
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnDestroy() {
    this._editor?.destroy();
  }
}