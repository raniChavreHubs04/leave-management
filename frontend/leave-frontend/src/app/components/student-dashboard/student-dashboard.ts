import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LeaveService } from '../../services/leave';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css'
})
export class StudentDashboard implements OnInit {
  userName: string = 'Student';
  leaves: any[] = [];
  
  // Leave Balance
  totalAllowed: number = 12;
  usedLeaves: number = 0;
  remainingLeaves: number = 12;
  
  // Stats
  totalLeaves: number = 0;
  approvedLeaves: number = 0;
  pendingLeaves: number = 0;
  rejectedLeaves: number = 0;

  constructor(private leaveService: LeaveService, private auth: AuthService) {}

  ngOnInit() {
    this.userName = this.auth.getUserName();
    this.loadLeaves();
  }

  loadLeaves() {
    this.leaveService.getLeaves().subscribe({
      next: (res: any) => {
        this.leaves = res.data || res;
        
        this.approvedLeaves = this.leaves.filter(l => l.status === 'Approved').length;
        this.pendingLeaves = this.leaves.filter(l => l.status === 'Pending').length;
        this.rejectedLeaves = this.leaves.filter(l => l.status === 'Rejected').length;
        
        // Assume 1 leave request = 1 day for simple calculation
        this.usedLeaves = this.approvedLeaves; 
        this.remainingLeaves = this.totalAllowed - this.usedLeaves;
        if (this.remainingLeaves < 0) this.remainingLeaves = 0;
      },
      error: (err) => console.error(err)
    });
  }

  // Circle Progress Logic
  getPercentage(): number {
    return Math.round((this.remainingLeaves / this.totalAllowed) * 100);
  }

  calculateOffset(): number {
    const circumference = 283; // 2 * PI * 45
    const percent = this.getPercentage() / 100;
    return circumference * (1 - percent);
  }
}