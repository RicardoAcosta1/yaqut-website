import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { DatePipe, NgForOf } from '@angular/common';
import { IComment, listenToComments, listenToCounter, addComment } from '../services/firebase'; // add addComment here

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslateModule, FormsModule, NgForOf, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'yaqut-website';
  newComment = '';
  visitCount: number = 0;
  comments: Array<IComment> = [];

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|ar/) ? browserLang : 'en');

    this.translate.onLangChange.subscribe(event => {
      document.documentElement.setAttribute('dir', event.lang === 'ar' ? 'rtl' : 'ltr');
    });
  }

  ngOnInit(): void {
    listenToCounter("oOAMoAv6O3Sy7a6VrfGP", (count) => {
      this.visitCount = count;
    });

    listenToComments((comments) => {
      this.comments = comments;
    });
  }

  switchLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.translate.use(target.value);
  }

  async postComment() {
    const trimmed = this.newComment.trim();
    if (!trimmed) return; // prevent empty comments

    try {
      await addComment(trimmed);
      this.newComment = ''; // clear input after posting
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  }
}
