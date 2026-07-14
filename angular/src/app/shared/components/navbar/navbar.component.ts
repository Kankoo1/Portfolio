import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faTimes, faHome, faGraduationCap, faCode, faBriefcase, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isScrolled = false;

  // Icons
  faBars = faBars;
  faTimes = faTimes;
  faHome = faHome;
  faGraduationCap = faGraduationCap;
  faCode = faCode;
  faBriefcase = faBriefcase;
  faEnvelope = faEnvelope;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faFacebook = faFacebook;
  faTwitter = faTwitter;

  constructor() {}

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

}
