import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  // YE LINE IMPORTANT HAI -> Common aur Router import hona chahiye
  imports: [CommonModule, RouterModule], 
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(public auth: AuthService) {}
}