import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { ProfilePageComponent } from './features/components/profile-page/profile-page.component';
import { EducationComponent } from './features/components/education/education.component';
import { SkillsComponent } from './features/components/skills/skills.component';
import { ExperienceComponent } from './features/components/experience/experience.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ProfilePageComponent
      },
      {
        path: 'education',
        component: EducationComponent
      },
      {
        path: 'skills',
        component: SkillsComponent
      },
      {
        path: 'experience',
        component: ExperienceComponent
      },
      {
        path: 'portfolio',
        redirectTo: 'education',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
