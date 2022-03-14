import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-cb-core',
  template: `
    <p>
      cb-core works!
    </p>
  `,
  styles: []
})
export class CbCoreComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
  get() {
    return "Text from Cb-Core module";
  }
}
