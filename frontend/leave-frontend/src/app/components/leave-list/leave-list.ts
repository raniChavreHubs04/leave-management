import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave-list.html',
  styleUrl: './leave-list.css'
})
export class LeaveList implements OnInit {

  leaves:any[]=[];

  constructor(private http:HttpClient){}

  ngOnInit(){

    this.http.get('http://localhost:5000/api/leaves')
    .subscribe((data:any)=>{
      this.leaves=data;
    });

  }

}