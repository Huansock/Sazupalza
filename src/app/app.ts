import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MainViewComponent } from './components/main-view/main-view.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MainViewComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
