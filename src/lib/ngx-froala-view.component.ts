import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-froala-view',
  template: `
  <div class="fr-box fr-basic">
    <div class="fr-element fr-view" [innerHtml]="html()"></div>
  </div>
  `,
})
export class NgxFroalaViewComponent implements OnInit {

  @Input() text: string;

  constructor(
    private sanitized: DomSanitizer,
  ) { }

  ngOnInit() {

  }

  html() {
    return this.sanitized.bypassSecurityTrustHtml(this.text);
  }

}
