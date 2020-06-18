import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'tab',
  template:`Tab 1 Tab 2`
})

export class TabComponent {
    
    constructor(private router: Router, private route: ActivatedRoute) {
        route.params.subscribe(params => console.log("side menu id parameter",params['id']));
    }

    navigate(path) {
        this.router.navigate([{outlets: {primary: path, tabMenu:path}}], 
                             {relativeTo: this.route});
    }
  
}