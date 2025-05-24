import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'yaqut-website';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|ar/) ? browserLang : 'en');

    this.translate.onLangChange.subscribe((event) => {
      if (event.lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
      }
    });
  }

  // Update switchLanguage to handle the event
  switchLanguage(event: Event) {
    const target = event.target as HTMLSelectElement; // Typecast to HTMLSelectElement
    if (target) {
      const language = target.value; // Now TypeScript knows `value` exists
      this.translate.use(language);
    }
  }
}