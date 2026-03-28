import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveService } from '../../services/leave';

@Component({
  selector: 'app-my-leaves',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-leaves.html',
  styleUrl: './my-leaves.css'
})
export class MyLeaves implements OnInit {
  leaves: any[] = [];

  constructor(private leaveService: LeaveService) {}

  ngOnInit() {
    this.loadMyLeaves();
  }

  loadMyLeaves() {
    this.leaveService.getLeaves().subscribe({
      next: (res: any) => {
        this.leaves = res.data || res;
      },
      error: (err) => console.error(err)
    });
  }
}