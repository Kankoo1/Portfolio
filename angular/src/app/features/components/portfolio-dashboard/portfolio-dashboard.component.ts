import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from '../education/education.component';
import { SkillsComponent } from '../skills/skills.component';
import { ExperienceComponent } from '../experience/experience.component';

@Component({
  selector: 'app-portfolio-dashboard',
  standalone: true,
  imports: [CommonModule, EducationComponent, SkillsComponent, ExperienceComponent],
  templateUrl: './portfolio-dashboard.component.html',
  styleUrls: ['./portfolio-dashboard.component.scss']
})
export class PortfolioDashboardComponent {
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
