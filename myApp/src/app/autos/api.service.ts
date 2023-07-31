import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auto } from '../types/Auto';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllAutos() {
    return this.http.get<Auto[]>(
      'https://my-angular-project-9f44d-default-rtdb.firebaseio.com/autos.json'
    );
  }

  postAuto(
    brand: string,
    model: string,
    manufactureYear: string,
    type: string,
    motor: string,
    imageUrl: string,
    description: string,
    userId:string | undefined
  ) {
    return this.http.post<Auto[]>(
      'https://my-angular-project-9f44d-default-rtdb.firebaseio.com/autos.json',
      {
        brand,model,manufactureYear,type,motor,imageUrl,description,userId
      }
    );
  }

  getArrayValues(autos: Auto[], ids: string[]) {
    for (let auto of autos) {
      auto.id = ids.shift();
    }
    return autos;
  }
}
