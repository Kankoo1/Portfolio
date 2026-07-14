import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Profile, Education, Experience, Skill, ContactMessage, ChatRequest, ChatReply, ApiResponse } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = environment.apiUrl;
  private profile$ = new BehaviorSubject<Profile | null>(null);
  private loading$ = new BehaviorSubject<boolean>(false);
  private error$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    this.loadProfile();
  }

  // Profile
  getProfile(): Observable<ApiResponse<Profile>> {
    const fallbackProfile: Profile = {
      name: 'Nuru Hussein',
      title: 'Full Stack Developer | Java | Spring Boot | Web Technologies',
      bio: 'Passionate about creating elegant solutions to complex problems. Specialized in backend development with modern Java frameworks and cloud-native architecture.',
      email: 'husseinnour469@gmail.com',
      phone: '',
      profileImage: 'assets/images/myphoto.png',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/nuru-hussein/' },
        { platform: 'GitHub', url: 'https://github.com/Kankoo1' },
        { platform: 'Facebook', url: 'https://www.facebook.com/nuru.hussein.964417' },
        { platform: 'Twitter', url: 'https://twitter.com' }
      ]
    };

    this.loading$.next(true);
    return this.http.get<ApiResponse<Profile>>(`${this.apiUrl}/profile`)
      .pipe(
        tap(response => {
          this.profile$.next(response.data || fallbackProfile);
          this.error$.next(null);
          this.loading$.next(false);
        }),
        catchError(error => {
          console.warn('Backend unavailable, using fallback profile data', error);
          this.profile$.next(fallbackProfile);
          this.error$.next(null);
          this.loading$.next(false);
          return of({ success: true, data: fallbackProfile });
        })
      );
  }

  loadProfile(): void {
    this.getProfile().subscribe();
  }

  getProfileValue(): Profile | null {
    return this.profile$.value;
  }

  // Education
  getEducation(): Observable<ApiResponse<Education[]>> {
    const fallbackEducation: Education[] = [
      {
        institution: 'Haramaya University',
        degree: 'MSc',
        field: 'Environmental Science',
        startDate: new Date('2017-09-01'),
        endDate: new Date('2019-07-31'),
        description: 'Completed advanced studies in environmental science with a focus on research, sustainability, and analytical methods.'
      },
      {
        institution: 'Haramaya University',
        degree: 'BSc',
        field: 'Environmental Science',
        startDate: new Date('2012-09-01'),
        endDate: new Date('2015-07-31'),
        description: 'Built a strong foundation in environmental systems, scientific analysis, and applied problem-solving.'
      }
    ];

    return this.http.get<ApiResponse<Education[]>>(`${this.apiUrl}/education`).pipe(
      catchError(() => of({ success: true, data: fallbackEducation }))
    );
  }

  // Experience
  getExperience(): Observable<ApiResponse<Experience[]>> {
    const fallbackExperience: Experience[] = [
      {
        title: 'Software Engineer II',
        company: 'Bank of America',
        location: 'Charlotte, NC',
        startDate: new Date('2023-02-01'),
        description: 'Designed and developed scalable Spring Boot microservices and RESTful APIs supporting high-volume enterprise data processing and integration across AWS and VMware Tanzu environments.',
        responsibilities: [
          'Designed and developed scalable Spring Boot microservices and RESTful APIs for enterprise data processing and integration.',
          'Integrated REST and SOAP services with PostgreSQL, MySQL, MongoDB, Oracle, and DB2 using Spring Data JPA and Hibernate.',
          'Automated build, test, and deployment workflows using Jenkins and deployed containerized applications to OpenShift.',
          'Improved quality and security via SonarQube remediation and production support with Splunk, Dynatrace, and AppDynamics.',
          'Implemented event-driven integrations using Apache Kafka and IBM MQ for reliable asynchronous data exchange.'
        ],
        skills: ['Java', 'Spring Boot', 'REST', 'SOAP', 'Kafka', 'MySQL', 'MongoDB', 'JPA', 'Hibernate', 'Jenkins', 'OpenShift', 'Docker', 'Kubernetes', 'AWS', 'SonarQube', 'Splunk']
      },
      {
        title: 'Associate Software Engineer',
        company: 'Revature LLC.',
        location: 'Reston, VA',
        startDate: new Date('2022-11-01'),
        endDate: new Date('2023-02-01'),
        description: 'Developed Spring Boot RESTful microservices and SOAP-based integrations while assisting with CI/CD automation and database optimization.',
        responsibilities: [
          'Developed Spring Boot RESTful microservices and SOAP-based integrations.',
          'Assisted with CI/CD automation using Jenkins and Docker.',
          'Built database-driven features and optimized SQL queries for Oracle and Sybase systems.'
        ],
        skills: ['Spring Boot', 'REST', 'SOAP', 'Jenkins', 'Docker', 'Oracle', 'Sybase', 'Postman', 'Soap UI']
      },
      {
        title: 'Full Stack Java Developer Trainee',
        company: 'Generation USA',
        location: 'Remote',
        startDate: new Date('2022-03-01'),
        endDate: new Date('2022-09-01'),
        description: 'Built full-stack applications using Spring Boot REST APIs and Angular front-end components during hands-on training.',
        responsibilities: [
          'Built full-stack applications using Spring Boot REST APIs and Angular front-end components.',
          'Implemented authentication and authorization using Spring Security.',
          'Practiced unit and UI testing with JUnit, Jasmine, and Karma following Agile principles.'
        ],
        skills: ['Java', 'Spring Boot', 'Angular', 'Spring Security', 'JUnit', 'Jasmine', 'Karma', 'Bootstrap', 'SQL']
      },
      {
        title: 'Instructor (Full-Time), Environmental Science',
        company: 'Adigrat University',
        location: 'Ethiopia',
        startDate: new Date('2016-09-01'),
        endDate: new Date('2019-06-01'),
        description: 'Taught Environmental Informatics and Environmental Science courses, integrating software tools and programming concepts to analyze and interpret environmental data.',
        responsibilities: [
          'Taught Environmental Informatics and Environmental Science courses.',
          'Delivered lectures and hands-on labs on data analysis, databases, and applied computing.',
          'Guided students in statistical and analytical software for environmental datasets.',
          'Supervised data-focused student projects and translated technical concepts for diverse audiences.'
        ],
        skills: ['Environmental Science', 'Environmental Informatics', 'Data Analysis', 'Databases', 'Statistics']
      },
      {
        title: 'Mining & Energy Environmental Analyst',
        company: 'Bati Town',
        location: 'Ethiopia',
        startDate: new Date('2015-09-01'),
        endDate: new Date('2016-09-01'),
        description: 'Conducted environmental impact assessments and statistical analysis for mining and energy projects.',
        responsibilities: [
          'Conducted environmental impact assessments for mining and energy projects.',
          'Performed statistical analysis of environmental datasets using R and SPSS.',
          'Prepared technical and non-technical reports with actionable recommendations.',
          'Collaborated with geologists, engineers, and regulators to support evidence-based decisions.'
        ],
        skills: ['Environmental Impact Assessment', 'R', 'SPSS', 'Data Analysis', 'Reporting']
      }
    ];

    return this.http.get<ApiResponse<Experience[]>>(`${this.apiUrl}/experience`).pipe(
      catchError(() => of({ success: true, data: fallbackExperience }))
    );
  }

  // Skills
  getSkills(): Observable<ApiResponse<Skill[]>> {
    const fallbackSkills: Skill[] = [
      { name: 'Java', category: 'Languages & Scripting', proficiency: 95, endorsements: 12 },
      { name: 'Python', category: 'Languages & Scripting', proficiency: 85, endorsements: 8 },
      { name: 'SQL', category: 'Languages & Scripting', proficiency: 90, endorsements: 10 },
      { name: 'JavaScript', category: 'Languages & Scripting', proficiency: 85, endorsements: 7 },
      { name: 'TypeScript', category: 'Languages & Scripting', proficiency: 80, endorsements: 6 },
      { name: 'Spring Boot', category: 'Backend & APIs', proficiency: 95, endorsements: 11 },
      { name: 'Spring MVC', category: 'Backend & APIs', proficiency: 90, endorsements: 9 },
      { name: 'Spring Security', category: 'Backend & APIs', proficiency: 88, endorsements: 8 },
      { name: 'REST', category: 'Backend & APIs', proficiency: 95, endorsements: 12 },
      { name: 'SOAP', category: 'Backend & APIs', proficiency: 85, endorsements: 7 },
      { name: 'Microservices', category: 'Backend & APIs', proficiency: 90, endorsements: 8 },
      { name: 'PostgreSQL', category: 'Data & ETL', proficiency: 88, endorsements: 8 },
      { name: 'MySQL', category: 'Data & ETL', proficiency: 86, endorsements: 7 },
      { name: 'Oracle', category: 'Data & ETL', proficiency: 82, endorsements: 6 },
      { name: 'DB2', category: 'Data & ETL', proficiency: 78, endorsements: 5 },
      { name: 'MongoDB', category: 'Data & ETL', proficiency: 80, endorsements: 6 },
      { name: 'JPA', category: 'Data & ETL', proficiency: 84, endorsements: 7 },
      { name: 'Hibernate', category: 'Data & ETL', proficiency: 84, endorsements: 7 },
      { name: 'ETL concepts', category: 'Data & ETL', proficiency: 82, endorsements: 6 },
      { name: 'AWS', category: 'Cloud & DevOps', proficiency: 85, endorsements: 8 },
      { name: 'Azure', category: 'Cloud & DevOps', proficiency: 80, endorsements: 7 },
      { name: 'OpenShift', category: 'Cloud & DevOps', proficiency: 82, endorsements: 6 },
      { name: 'Docker', category: 'Cloud & DevOps', proficiency: 88, endorsements: 8 },
      { name: 'Kubernetes', category: 'Cloud & DevOps', proficiency: 78, endorsements: 5 },
      { name: 'Jenkins', category: 'Cloud & DevOps', proficiency: 84, endorsements: 7 },
      { name: 'Git', category: 'Cloud & DevOps', proficiency: 92, endorsements: 9 },
      { name: 'Splunk', category: 'Monitoring & Ops', proficiency: 80, endorsements: 6 },
      { name: 'Dynatrace', category: 'Monitoring & Ops', proficiency: 78, endorsements: 5 },
      { name: 'AppDynamics', category: 'Monitoring & Ops', proficiency: 76, endorsements: 5 },
      { name: 'Angular', category: 'Frontend', proficiency: 85, endorsements: 7 },
      { name: 'HTML', category: 'Frontend', proficiency: 90, endorsements: 9 },
      { name: 'CSS', category: 'Frontend', proficiency: 88, endorsements: 8 },
      { name: 'R', category: 'Scientific & Analytics Tools', proficiency: 80, endorsements: 6 },
      { name: 'SPSS', category: 'Scientific & Analytics Tools', proficiency: 78, endorsements: 5 },
      { name: 'Statistical Analysis', category: 'Scientific & Analytics Tools', proficiency: 85, endorsements: 7 },
      { name: 'Linux / Unix', category: 'Operating Systems', proficiency: 88, endorsements: 8 }
    ];

    return this.http.get<ApiResponse<Skill[]>>(`${this.apiUrl}/skills`).pipe(
      catchError(() => of({ success: true, data: fallbackSkills }))
    );
  }

  // Contact
  sendMessage(message: ContactMessage): Observable<ApiResponse<ContactMessage>> {
    return this.http.post<ApiResponse<ContactMessage>>(`${this.apiUrl}/contact`, message);
  }

  sendChatMessage(message: ChatRequest): Observable<ApiResponse<ChatReply>> {
    return this.http.post<ApiResponse<ChatReply>>(`${this.apiUrl}/chat`, message).pipe(
      catchError(() => of({
        success: true,
        data: this.buildFallbackChatReply(message)
      }))
    );
  }

  private buildFallbackChatReply(message: ChatRequest): ChatReply {
    const normalized = message.message.toLowerCase();

    if (this.containsAny(normalized, ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
      return {
        reply: 'Hello. I can help with Nuru\'s skills, experience, education, and availability. You can also leave your phone or email if you want a follow-up.',
        notificationSent: false
      };
    }

    if (this.containsAny(normalized, ['skill', 'stack', 'technology', 'tech'])) {
      return {
        reply: 'Nuru works mainly with Java, Spring Boot, REST APIs, Angular, SQL, Docker, OpenShift, AWS, and data-heavy backend integrations.',
        notificationSent: false
      };
    }

    if (this.containsAny(normalized, ['experience', 'work', 'career', 'bank of america', 'revature'])) {
      return {
        reply: 'Nuru has enterprise backend and integration experience across Bank of America, Revature, and Generation USA, with strong Spring Boot, microservices, CI/CD, and cloud platform work.',
        notificationSent: false
      };
    }

    if (this.containsAny(normalized, ['education', 'msc', 'bsc', 'university'])) {
      return {
        reply: 'Nuru studied Environmental Science at Haramaya University, with a BSc from Sep 2012 to Jul 2015 and an MSc from Sep 2017 to Jul 2019.',
        notificationSent: false
      };
    }

    if (this.containsAny(normalized, ['hire', 'available', 'contact', 'call', 'phone', 'email'])) {
      const followUp = message.visitorContact
        ? ' I captured your contact locally, but phone notifications need the backend running to actually text Nuru.'
        : ' Share your phone or email in the chat if you want direct follow-up.';

      return {
        reply: 'You can reach Nuru at husseinnour469@gmail.com, and he is open to conversations about backend engineering, full-stack roles, and integration work.' + followUp,
        notificationSent: false
      };
    }

    return {
      reply: 'I can help with Nuru\'s skills, experience, education, and availability. Try asking something like: what backend technologies does he use, where has he worked, or how can I contact him?',
      notificationSent: false
    };
  }

  private containsAny(text: string, tokens: string[]): boolean {
    return tokens.some(token => text.includes(token));
  }

  // Observable streams
  profile() {
    return this.profile$.asObservable();
  }

  loading() {
    return this.loading$.asObservable();
  }

  error() {
    return this.error$.asObservable();
  }
}
