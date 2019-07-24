import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxFroalaEditorComponent } from './ngx-froala-editor.component';
import { NgxFroalaViewComponent } from './ngx-froala-view.component';
import { NgxFroalaEditorDirective } from './ngx-froala-editor.directive';
import { NgxFroalaEditorService } from './ngx-froala-editor.service';

@NgModule({
  imports: [
    FormsModule,
  ],
  declarations: [
    NgxFroalaEditorComponent,
    NgxFroalaViewComponent,
    NgxFroalaEditorDirective,
  ],
  providers: [
    NgxFroalaEditorService,
  ],
  exports: [
    NgxFroalaEditorComponent,
    NgxFroalaViewComponent,
    NgxFroalaEditorDirective,
  ]
})
export class NgxFroalaModule { }
