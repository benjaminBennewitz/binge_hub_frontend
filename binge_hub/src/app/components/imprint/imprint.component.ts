import { Component } from '@angular/core';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {

   /**
   * step back helper function
   */
   stepBack(){
    window.history.back();
  }
}