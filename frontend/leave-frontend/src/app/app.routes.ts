import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { StudentDashboard } from './components/student-dashboard/student-dashboard';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { ApplyLeave } from './components/apply-leave/apply-leave';
import { MyLeaves } from './components/my-leaves/my-leaves'; // Ye import sahi hai

export const routes: Routes = [
  // Default page Login hogi
  { path: '', component: Login },

  { path: 'login', component: Login },
  { path: 'register', component: Register },
  
  // Dashboard routes
  { path: 'student-dashboard', component: StudentDashboard },
  { path: 'admin-dashboard', component: AdminDashboard },
  
  // Actions
  { path: 'apply-leave', component: ApplyLeave },
  { path: 'my-leaves', component: MyLeaves } // Ye route ab sahi se kaam karega
];