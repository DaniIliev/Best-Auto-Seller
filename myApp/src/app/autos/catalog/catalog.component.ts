import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Auto } from 'src/app/types/Auto';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  autos: Auto[] = [];
  ids: string[] = [];
  isLoading: boolean = true;
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getAllAutos().subscribe({
      next: (autos) => {
        this.autos = Object.values(autos);
        this.ids = Object.keys(autos);

        this.autos = this.apiService.getArrayValues(this.autos, this.ids);
        this.isLoading = false;
      },
    });
  }
}
