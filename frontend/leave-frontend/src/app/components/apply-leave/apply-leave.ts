import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LeaveService } from '../../services/leave';

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './apply-leave.html',
  styleUrl: './apply-leave.css'
})
export class ApplyLeave {
  reason: string = '';
  fromDate: string = '';
  toDate: string = '';
  priority: string = 'Low'; // <-- Ye line add karo

  constructor(private leaveService: LeaveService, private router: Router) {}

  submitLeave() {
    this.leaveService.applyLeave({
      reason: this.reason,
      fromDate: this.fromDate,
      toDate: this.toDate
      // Note: Backend mein priority field nahi hai isliye ye bhej nahi rahe
    }).subscribe({
      next: () => {
        alert('Leave Applied Successfully!');
        this.router.navigate(['/student-dashboard']);
      },
      error: (err) => alert(err.error.message || 'Error')
    });
  }
}