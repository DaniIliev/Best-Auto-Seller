import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { Auto } from 'src/app/types/Auto';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  auto: Auto | undefined
  owner: boolean = false

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private userService: UserService){}

  ngOnInit(): void {
    this.fetchAuto()
  }
  
  fetchAuto(): void {
    const id = this.activatedRoute.snapshot.params['autoId'];
    this.apiService.getAuto(id).subscribe((auto) => {
      this.auto = auto; 
      if(auto.userId == this.userService.user?.localId){
        this.owner = true
      }
    });
  }
  edit(form:NgForm){}
}
