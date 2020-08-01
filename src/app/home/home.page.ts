import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usersList:any[]=[];

  constructor(public http: HttpClient, public router: Router) {
    this.getUsers();
  }

  ngOnInit(){
    this.getUsers();
    
  }

  getUsers(event?){
  this.http.get('https://randomuser.me/api/?page=5&results=10&seed=a').subscribe(data=>{
    this.usersList=this.usersList.concat(data["results"]);
  });
  
  if(event){
    event.target.complete();
  }
  }

  go(index){
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.usersList[index]
      }
    }
    this.router.navigate(['detail'], navigationExtras);
  }

  loadMore(event){
    this.getUsers(event);
  }

}
