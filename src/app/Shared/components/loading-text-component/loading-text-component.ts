import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../Core/services/loading.service';

@Component({
  selector: 'app-loading-text-component',
  imports: [],
  templateUrl: './loading-text-component.html',
  styleUrls: ['./loading-text-component.css'],
})
export class LoadingTextComponent {

    loadingService = inject(LoadingService);

}
