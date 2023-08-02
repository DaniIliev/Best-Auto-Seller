import { Component, OnInit } from '@angular/core';
import { Auto } from '../types/Auto';
import { ApiService } from '../autos/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  autos: Auto[] | undefined;
  ids: string[] | undefined;
  isLoading: boolean = true;
  maches: Auto[] = []
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {

  }

  search(form: NgForm){
    const {text} = form.value
    this.apiService.getAllAutos().subscribe({
      next: (autos) => {
        this.autos = Object.values(autos);
        this.ids = Object.keys(autos);
        this.apiService.getArrayValues(this.autos, this.ids);
        this.isLoading = false;
      }
    });
  
    if(this.autos !== undefined){
      for (const auto of this.autos) {
        if(auto.brand.toLowerCase().includes(text.toLowerCase())){
          this.maches.push(auto)
        }
      }
      console.log(this.maches)
    }
  }
}
