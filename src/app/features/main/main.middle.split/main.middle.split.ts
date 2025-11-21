import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ParameterValuesComponent} from "../../parameters/parameter.values.component/parameter.values.component";

@Component({
  selector: 'app-main-middle-split',
  imports: [RouterOutlet],
  templateUrl: './main.middle.split.html',
  styleUrl: './main.middle.split.scss',
  standalone:true,
})
export class MainMiddleSplit {

}
