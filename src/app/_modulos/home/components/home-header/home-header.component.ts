import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HeaderHomeComponent implements OnInit {
  UrlTree
  constructor(router: Router) {
    this.UrlTree = router
    console.log(this.UrlTree.url)
   
   }

  ngOnInit() {
    $( document ).ready(()=> {
      if(this.UrlTree.url == '/home'){
        $("#header").removeClass('darkHeader')
      }else{
        $("#header").addClass('darkHeader')
      }
  });
   
  }

}
