import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'tab-content',
  template:`
    <p>Hello I am tab {{title}} </p>
  `
})

export class TabContentComponent {

    title;

    constructor(private router: Router, private route: ActivatedRoute) {

        route.params.subscribe(params => this.title = params['id']);
  
    }

    navigate(path) {
        this.router.navigate([{outlets: {primary: path, tabMenu:path}}], 
                             {relativeTo: this.route});
    }
}