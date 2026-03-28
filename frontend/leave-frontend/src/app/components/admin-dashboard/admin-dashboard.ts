import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LeaveService } from '../../services/leave';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  leaves: any[] = [];
  userName: string = '';

  constructor(private leaveService: LeaveService, private auth: AuthService) {}

  ngOnInit() {
    this.userName = this.auth.getUserName();
    this.loadAllLeaves();
  }

  loadAllLeaves() {
    this.leaveService.getLeaves().subscribe({
      next: (res: any) => {
        // Backend se data aane par
        this.leaves = res.data || res; 
      },
      error: (err) => console.error(err)
    });
  }

  updateStatus(id: string, status: string) {
    this.leaveService.updateStatus(id, status).subscribe({
      next: () => {
        alert(`Leave ${status}`);
        this.loadAllLeaves(); // List refresh karo
      },
      error: (err) => alert('Error updating status')
    });
  }

  logout() {
    this.auth.logout();
  }
}