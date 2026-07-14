import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { Education } from '../../../core/models/portfolio.model';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  education: Education[] = [];
  loading = true;
  certifications = [
    'MCD-Level 1 (Mule 4)',
    'JavaScript Developer (W3Schools)',
    'Google Cybersecurity Certificate',
    'Working toward AWS certification'
  ];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getEducation().subscribe({
      next: (response) => {
        this.education = response.data || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading education:', error);
        this.loading = false;
      }
    });
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }
}
