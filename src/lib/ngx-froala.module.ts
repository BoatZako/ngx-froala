import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxFroalaEditorComponent } from './ngx-froala-editor.component';
import { NgxFroalaViewComponent } from './ngx-froala-view.component';

@NgModule({
  imports: [
    FormsModule,
  ],
  declarations: [
    NgxFroalaEditorComponent,
    NgxFroalaViewComponent,
  ],
  exports: [
    NgxFroalaEditorComponent,
    NgxFroalaViewComponent,
  ]
})
export class NgxFroalaModule { }
