import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auto } from '../types/Auto';
import { Comment } from '../types/Comment';
import { UserDetails } from '../types/userDetails';
import { Like } from '../types/like';
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
    userId: string | undefined,
    createt_at:string
  ) {
    return this.http.post<Auto[]>(
      'https://my-angular-project-9f44d-default-rtdb.firebaseio.com/autos.json',
      {
        brand,
        model,
        manufactureYear,
        type,
        motor,
        imageUrl,
        description,
        userId,
        createt_at
      }
    );
  }

  getAuto(id: string) {
    return this.http.get<Auto>(
      `https://my-angular-project-9f44d-default-rtdb.firebaseio.com/autos/${id}.json`
    );
  }

  getArrayValues(autos: Auto[], ids: string[]) {
    for (let auto of autos) {
      auto.id = ids.shift();
    }
    return autos;
  }


  getAllComments(id: string) {
    return this.http.get<Comment[]>(
      `https://my-angular-project-9f44d-default-rtdb.firebaseio.com/autos/${id}/comments.json`
    );
  }

  postComment(id: string, comment: string, name: string , created_at:string) {
    return this.http.post<Comment[]>(
      `https://my-angular-project-9f44d-default-rtdb.firebaseio.com/autos/${id}/comments.json`,
      { name, comment, created_at }
    );
  }

  postLike(id:string, localId: string){
    return this.http.post<Like>(
      `https://my-angular-project-9f44d-default-rtdb.firebaseio.com/autos/${id}/likes.json`,
      { localId }
    );
  }
  unLike(id:string, likeId:string){
    return this.http.delete(
      `https://my-angular-project-9f44d-default-rtdb.firebaseio.com/autos/${id}/likes/${likeId}.json`,
    );
  }

  getAllLikes(id: string) {
    return this.http.get<Like[]>(
      `https://my-angular-project-9f44d-default-rtdb.firebaseio.com/autos/${id}/likes.json`
    );
  }

  getArrayValuesLike(likes: Like[], ids: string[]) {
    for (let like of likes) {
      like.id = ids.shift()!;
    }
    return likes;
  }

  deleteAuto(id: string) {
    return this.http.delete<Auto>(
      `https://my-angular-project-9f44d-default-rtdb.firebaseio.com/autos/${id}.json`
    );
  }

  editAuto(
    brand:string,
    description:string,
    manufactureYear:string,
    imageUrl:string,
    model:string,
    motor:string,
    type:string,
    id: string,
    userId:string
  ) {
    return this.http.patch(
      `https://my-angular-project-9f44d-default-rtdb.firebaseio.com/autos/${id}/.json`,
      { brand, model, manufactureYear, type, motor, imageUrl, description, userId}
    );
  }
}
