import { Injectable, QueryList } from '@angular/core';
import { NgxFroalaEditorDirective } from './ngx-froala-editor.directive';
import { Router, NavigationStart } from '@angular/router';
import { FroalaOptions } from './ngx-froala.interface';
import { Observable } from 'rxjs';

declare var FroalaEditor: any;
const query: string = '[froalaeditor]'

@Injectable({
  providedIn: 'root'
})
export class NgxFroalaEditorService {

  instance: any;
  editor: NgxFroalaEditorDirective[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this._clearInstance()
        this.editor = []
      }
    });
  }

  init(editors: QueryList<NgxFroalaEditorDirective>, options: FroalaOptions = {}): void {
    this.editor.push(...editors.toArray());
    let froalaAttr = document.querySelectorAll(query)
    if (this.editor.length == froalaAttr.length) {
      this._clearInstance()
      this.editor = this._order(froalaAttr, this.editor)
      let isValid = this.editor
        .map((e, i) => e.el.nativeElement === froalaAttr[i])
        .every(e => e)

      if (!isValid) {
        console.error('NgxFroalaEditorDirective element not match')
        return
      }

      let that = this
      options = options || {}
      options.events = options.events || {}
      options.events.contentChanged = function () {
        for (let i = 0; i < that.editor.length; i++) {
          if (that.editor[i].el.nativeElement == this.$box[0]) {
            that.editor[i].onModelChange(this.html.get())
            break;
          }
        }
      }

      this.instance = new FroalaEditor(query, options, function () {
        for (let i = 0; i < that.editor.length; i++) {
          if (that.editor[i].el.nativeElement == this.$box[0]) {
            that.editor[i].show()
            break;
          }
        }
      })
    }
  }

  private _order(el1: NodeListOf<Element>, el2: NgxFroalaEditorDirective[]): NgxFroalaEditorDirective[] {
    let newEl: NgxFroalaEditorDirective[] = []
    let i: number, j: number;
    let size = el1.length
    if (size == 0) {
      return [];
    }
    for (i = 0; i < size - 1; i++) {
      for (j = 0; j < size; j++) {
        if (el1[i] === el2[j].el.nativeElement) {
          newEl[i] = el2.splice(j, 1)[0];
          break;
        }
      }
    }
    newEl[i] = el2[0]
    return newEl;
  }

  private _clearInstance() {
    if (this.instance) {
      if(!Array.isArray(this.instance)) {
        this.instance = [this.instance]
      }
      this.instance.forEach((e: any) => e.destroy())
      this.instance = undefined
    }
  }

  remake(editors: QueryList<NgxFroalaEditorDirective>, options: FroalaOptions = {}): void {
    this.editor = []
    this.init(editors, options);
  }
}