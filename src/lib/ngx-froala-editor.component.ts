import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange, forwardRef } from '@angular/core';
import { FroalaOptions } from './ngx-froala.interface';
import { Observable, Subscription } from 'rxjs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

declare var FroalaEditor: any;

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgxFroalaEditorComponent),
  multi: true
};

@Component({
  selector: 'ngx-froala-editor',
  template: `<div #froala></div>`,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class NgxFroalaEditorComponent implements OnInit, OnChanges, ControlValueAccessor {

  @ViewChild('froala') private _froala: ElementRef;
  @Input() options: FroalaOptions;
  @Output() oncreated = new EventEmitter<any>();
  @Output() onchanged = new EventEmitter<any>();

  editor: any
  private _created: boolean
  private _subscription: Subscription

  private innerValue: any = '';
  private onValueChanged = (_: any) => { };

  constructor() { }

  ngOnInit() {
    this._created = false;
    this.options = this.options || {}

    this._subscription = this._createFroalaEditor(this.options).subscribe((editor) => {
      this.editor = editor;
      this.oncreated.emit(editor)
      this._created = true;
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    const options: SimpleChange = changes.options;
    if (options.previousValue != null && options.currentValue != options.previousValue) {
      if (this._subscription) {
        this._subscription.unsubscribe();
        if (this.editor) {
          this.editor.destroy()
        }
        this.options = options.currentValue || {}
        this._subscription = this._createFroalaEditor(this.options).subscribe((editor) => {
          this.editor = editor
          if (this._created) {
            this.onchanged.emit(editor)
          } else {
            this.oncreated.emit(editor)
            this._created = true;
          }
        })
      }
    }
  }

  private _createFroalaEditor(options: FroalaOptions): Observable<any> {
    options.events = options.events || {}
    options.events.contentChanged = () => {
      this.onValueChanged(this.editor.html.get());
    }
    return new Observable(subscriber => {
      this._froala.nativeElement.innerHTML = ''
      let editor = new FroalaEditor(this._froala.nativeElement, options, () => {
        editor.html.set(this.innerValue);
        subscriber.next(editor);
        subscriber.complete();
      })
    });
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      if (this.editor) {
        this.editor.html.set(this.innerValue);
      }
    }
  }

  registerOnChange(fn: any) {
    this.onValueChanged = fn;
  }

  registerOnTouched() { }

}
