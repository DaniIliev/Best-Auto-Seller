import { Component, OnInit } from '@angular/core';
import { Auto } from '../types/Auto';
import { ApiService } from '../autos/api.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  autos: Auto[] | undefined;
  ids: string[] | undefined;
  isLoading: boolean = false;
  maches: Auto[] | undefined
  
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {

  }

  search(form: NgForm){
    this.isLoading= true
    const {brand} = form.value

    this.maches = []
    this.apiService.getAllAutos().subscribe({
      next: (autos) => {
        this.autos = Object.values(autos);
        this.ids = Object.keys(autos);
        this.apiService.getArrayValues(this.autos, this.ids);

        if(this.autos !== undefined){
          for (const auto of this.autos) {
            if(auto.brand.toLowerCase().includes(brand.toLowerCase())){
              this.maches?.push(auto)
            }
          }
        }
        this.isLoading = false;
      }
    });
  }

  redirectTo(id:string){
    this.router.navigate([`/autos/${id}`])
  }
}
