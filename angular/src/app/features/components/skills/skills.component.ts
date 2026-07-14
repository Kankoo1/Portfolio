import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { Skill } from '../../../core/models/portfolio.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  categories: string[] = [];
  loading = true;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getSkills().subscribe({
      next: (response) => {
        this.skills = response.data || [];
        this.categories = [...new Set(this.skills.map(s => s.category))];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading skills:', error);
        this.loading = false;
      }
    });
  }

  getSkillsByCategory(category: string): Skill[] {
    return this.skills.filter(s => s.category === category);
  }

  getProficiencyClass(proficiency: number): string {
    if (proficiency >= 80) return 'expert';
    if (proficiency >= 60) return 'intermediate';
    return 'beginner';
  }
}
