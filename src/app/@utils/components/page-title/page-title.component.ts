import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { makeTitleFromUrl } from 'src/app/helper';

export interface PageTitleBreadCrumbs {
  title: string;
  path?: string[];
  path_string?: string; 
}


@Component({
  selector: 'util-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent implements OnInit, OnDestroy {
  @Input() title: string = "Title";
  @Input() bread_crumbs: PageTitleBreadCrumbs[] = [];

  private subs: Subscription[] = [];
  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
  }

  ngOnInit(): void {
    const sub = this.route.paramMap.pipe(
      map(x => {
        return {
          page_parent_title: makeTitleFromUrl(x.get('grandParentTitle') ?? '') ,
          page_title: makeTitleFromUrl(x.get('pageTitle') ?? ''),
        }
      })
    ).subscribe(x => {
      if(x.page_parent_title.toLowerCase().trim() == 'content') {
        this.bread_crumbs = [];
      }else {
        this.bread_crumbs = [
          {
            title: 'Home',
            path: ['/']
          },
          {
            title: x.page_parent_title ?? '',
          }
        ]
      }
      this.title = makeTitleFromUrl(x.page_title ?? '');
    });

    this.subs.push(sub);


  }

  onBCClick(item: PageTitleBreadCrumbs) {
    if(item.path) {
      this.router.navigate(item.path);
    }
  }

}
