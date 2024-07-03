import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})

export class StartComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
}
