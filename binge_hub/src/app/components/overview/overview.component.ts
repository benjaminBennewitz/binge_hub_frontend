import { Component, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  constructor(
  ) {}

   // tooltip positions
   positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
   position = new FormControl(this.positionOptions[0]);

  ngOnInit(): void {
    
  }
}
