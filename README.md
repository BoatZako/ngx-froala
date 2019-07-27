# ngx-froala

[![dependencies Status](https://david-dm.org/BoatZako/ngx-froala/status.svg)](https://david-dm.org/BoatZako/ngx-froala)
[![devDependencies Status](https://david-dm.org/BoatZako/ngx-froala/dev-status.svg)](https://david-dm.org/BoatZako/ngx-froala?type=dev)

Angular 6+ bindings for [Froala WYSIWYG Editor](https://www.froala.com/wysiwyg-editor). 
See [Demo](https://ngx-froala-demo.stackblitz.io)

## Getting Started

You can install ngx-froala by using npm.

```
npm install ngx-froala froala-editor --save
```

### Add Froala editor to angular app

Open `angular.json` file 
- insert a new entry into the `styles` array
```json
"styles": [
  "node_modules/froala-editor/css/froala_editor.pkgd.css",
  "..."
],
```
- insert a new entry into the `scripts` array
```json
"scripts": [
  "node_modules/froala-editor/js/froala_editor.pkgd.min.js",
  "..."
],
```


## Usage

Import `ngx-froala` module
```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { NgxFroalaModule } from 'ngx-froala'; // <-- add

@NgModule({
  imports: [
    BrowserModule, 
    NgxFroalaModule  // <-- add
  ],
  declarations: [ 
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

```

Then in HTML

```html
<ngx-froala-editor [options]="options" [(ngModel)]="text"></ngx-froala-editor>
```

### Froala editor component
#### Input

[*options*]
  - **type**: `FroalaOptions`
  - **require**: `false`
  - **description**: option for froala editor. see [document](https://www.froala.com/wysiwyg-editor/docs/options)

#### Output

[*oncreated*]
  - **return**: Froala instance
  - **description**: trigger when created the froala editor

[*onchanged*]
  - **return**: New Froala instance
  - **description**: trigger when recreated the froala editor

### Froala view
```html
<ngx-froala-view [text]="text"></ngx-froala-view>
```

#### Input

[*text*]
  - **type**: `string`
  - **require**: `true`

## Advance
For multiple editor in same page. You can use NgxFroalaDirective and NgxFroalaService to create the editor.

HTML
```html
<div froalaEditor [model]="text1" (modelChange)="text1 = $event"></div>
<div froalaEditor [model]="text2" (modelChange)="text2 = $event"></div>
```

Typescript
```js
import { Component, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { FroalaOptions, NgxFroalaEditorDirective, NgxFroalaEditorService } from 'ngx-froala';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChildren(NgxFroalaEditorDirective) froalaEl !: QueryList<NgxFroalaEditorDirective>

  options: FroalaOptions;

  text1: string;
  text2: string;

  constructor(
    private froalaService: NgxFroalaEditorService,
  ) { }

  ngOnInit() {
    this.text1 = `<h1>Hello</h1>`
    this.text2 = `<h1>World</h1>`
    this.options = {
      videoUpload: false,
      quickInsertEnabled: false,
    }
  }

  ngAfterViewInit() {
    this.froalaService.init(this.froalaEl)
  }

}
```

### Froala editor directive
#### Input

[*model*]
  - **type**: `string`
  - **require**: `false`
  - **description**: option for froala editor. see [document](https://www.froala.com/wysiwyg-editor/docs/options)

#### Output

[*modelChange*]
  - **return**: `string`
  - **description**: trigger when text in editor is changed

### Froala editor service

#### Methods
init
  - **description** : use when first create froala editors
  - **parameter**
    - editor element : `QueryList<NgxFroalaEditorDirective>`
    - options : `FroalaOptions`
  - **return** : `void`

remake
  - **description** : use when you want recreate the froala editors
  - **parameter**
    - editor element : `QueryList<NgxFroalaEditorDirective>`
    - options : `FroalaOptions`
  - **return** : `void`

## Authors

* [BoatZako](https://github.com/BoatZako/) (boat_zako@hotmail.com)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
