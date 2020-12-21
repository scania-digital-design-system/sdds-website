import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageService } from 'src/app/app.service';
import { Page } from 'src/app/app.interface';
import { GenerateTabURLPipe } from 'src/app/app.pipe';

import { menus } from '../../../data/content.json';

@Component({
  templateUrl: './tab-content.component.html',
  styleUrls: ['../page.component.scss'],
  host: { class: 'tab-component-container' }
})

export class TabContentComponent implements OnInit, AfterViewInit {
  title;
  content: any = {};
  tabContent: any = [];
  defaultTab = '.';
  tabExist: Boolean = false;
  typographyPage:Boolean = false;
  titleElements = [];
  wrapperTop: number;
  pageOffset = 144; // sticky nav height + padding
  isAnchorActive: any;

  constructor(
    private route: ActivatedRoute,
    public ps: PageService
    ) {

    route.params.subscribe(params => this.title = params['id']);

    ps.page.subscribe((page: Page) => {

      if(Object.keys(page).length == 0) {
        return;
      } else {
        if(page.hasOwnProperty('id')){
          this.content = menus.find(menu => menu.id === page.id);
        } else if(page.hasOwnProperty('parent') && page.parent) {
          this.content = menus.find(menu => menu.id === page.parent.id);
        } else {
          return;
        }

        if(this.content.showTabs) {
          this.tabExist = true;
          this.tabContent = this.content.pageStructure.find(sub => this.generateUrl(sub.title) === this.title);

          if(this.tabContent === undefined) this.tabContent = this.content.pageStructure[0];
        } else {
          this.tabExist = false;
          this.tabContent = this.content.pageStructure[0];
        }

        if(this.content.url === 'foundation-typography') {
          this.typographyPage=true;
        }
      }

      // This is for anchor link to work, the root routerLink should be the first tab, or current URL if page has no tabs
      if(this.title === undefined) {
        this.defaultTab = this.content.showTabs ? this.generateUrl(this.content.pageStructure[0].title) : '.';
      }

    });

  }
  ngOnInit() {
    const main = document.querySelector('main');
    this.wrapperTop = Math.round(main.getBoundingClientRect().top);
    document.querySelector('main').addEventListener('scroll', this.onScroll.bind(this));
  }

  ngAfterViewInit()	{
    const allTitles = document.querySelectorAll('h4.section-title');

    allTitles.forEach((item) => {
      this.titleElements = [...this.titleElements, item.id]
    })
  }

  onScroll(e){
    const pos = Math.round(e.target.scrollTop);
    
    this.titleElements.some(title => {
      const offset = document.getElementById(title).offsetTop;
      if(offset <= (pos - this.pageOffset)){
        this.isAnchorActive = title;
      }
    })
  }


  generateUrl(url){
    const generateUrlPipe = new GenerateTabURLPipe();
    return generateUrlPipe.transform(url)
  }

  anchorMenu(id){
    id = this.generateUrl(id);
    const elem = document.getElementById(id);
    const wrapper = document.querySelector('main');
    wrapper.scroll({ top: (elem.getBoundingClientRect().top + wrapper.scrollTop - this.pageOffset), left: 0, behavior: 'smooth' });

  }
}