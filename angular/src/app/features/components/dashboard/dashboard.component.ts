import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from '../education/education.component';
import { SkillsComponent } from '../skills/skills.component';
import { ExperienceComponent } from '../experience/experience.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, EducationComponent, SkillsComponent, ExperienceComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {}
