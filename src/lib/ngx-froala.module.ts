import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxFroalaViewComponent } from './ngx-froala-view.component';
import { NgxFroalaEditorDirective } from './ngx-froala-editor.directive';

@NgModule({
  imports: [
    FormsModule,
  ],
  declarations: [
    NgxFroalaViewComponent,
    NgxFroalaEditorDirective,
  ],
  providers: [],
  exports: [
    NgxFroalaViewComponent,
    NgxFroalaEditorDirective,
  ]
})
export class NgxFroalaModule { }
