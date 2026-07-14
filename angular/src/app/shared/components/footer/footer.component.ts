import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLinkedin, faGithub, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faCopyright } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  // Icons
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faEnvelope = faEnvelope;
  faCopyright = faCopyright;

  contactLinks = [
    {
      icon: faEnvelope,
      url: 'https://mail.google.com/mail/?view=cm&fs=1&to=husseinnour469@gmail.com',
      label: 'Email',
      target: '_blank'
    },
    {
      icon: faLinkedin,
      url: 'https://www.linkedin.com/in/nuru-hussein/',
      label: 'LinkedIn',
      target: '_blank'
    },
    {
      icon: faGithub,
      url: 'https://github.com/Kankoo1',
      label: 'GitHub',
      target: '_blank'
    },
    {
      icon: faFacebook,
      url: 'https://www.facebook.com/nuru.hussein.964417',
      label: 'Facebook',
      target: '_blank'
    },
    {
      icon: faTwitter,
      url: 'https://twitter.com',
      label: 'Twitter',
      target: '_blank'
    }
  ];

  quickLinks = [
    { label: 'Home', route: '/' },
    { label: 'Education', route: '/education' },
    { label: 'Skills', route: '/skills' },
    { label: 'Experience', route: '/experience' }
  ];
}
