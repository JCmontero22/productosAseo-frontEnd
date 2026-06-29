import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from './Shared/components/loading-spinner-component/loading-spinner-component';
import { LoadingTextComponent } from './Shared/components/loading-text-component/loading-text-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingTextComponent, LoadingSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('productosAseo-frontEnd');
}
