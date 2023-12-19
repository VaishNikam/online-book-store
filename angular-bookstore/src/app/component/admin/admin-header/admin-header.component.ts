import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BookstoreService } from 'src/app/bookstore.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit{
url: string = '';
userName: string = '';

constructor(
  private route:Router,
  private eservice:BookstoreService,
  private changeDetector:ChangeDetectorRef
  ){
    if (this.eservice.getUserName() !== null) {
      this.userName = this.eservice.getUserName();
    }
  }

  ngOnInit(): void {
    this.route.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: any) => {
      this.url = event?.url;
    });

  }  
  gotourl(link: string): void {
    if (link === '/admin/logout') {
      this.eservice.userLogout();
      return;
    }
    this.route.navigate([link]);

}

}