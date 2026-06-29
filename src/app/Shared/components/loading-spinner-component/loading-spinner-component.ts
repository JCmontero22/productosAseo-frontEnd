import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../Core/services/loading.service';

@Component({
  selector: 'app-loading-spinner-component',
  imports: [],
  templateUrl: './loading-spinner-component.html',
  styleUrls: ['./loading-spinner-component.css'],
  standalone: true
})
export class LoadingSpinnerComponent {

      loadingService = inject(LoadingService);
}
