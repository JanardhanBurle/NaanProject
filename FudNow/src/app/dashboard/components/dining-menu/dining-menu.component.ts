import { MenuItem } from './../../model/menu-item';
import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-dining-menu',
  templateUrl: './dining-menu.component.html',
  styleUrls: ['./dining-menu.component.scss']
})
export class DiningMenuComponent implements OnInit {
  flipDiv = false;
  constructor(private dashboardService: DashboardService) { }
  menuItems: MenuItem[] = [];
  ngOnInit() {
    interval(5000).subscribe(x => {
      // this.flipDiv = !this.flipDiv;
    });

    this.dashboardService.getMenuItems().subscribe(
      response => {
        let menuCategory = response.data.categories;
        let menuItems = response.data.items;
        this.loadMenuSection(menuCategory, menuItems);
      });
  }

  loadMenuSection(menuCategory: any, rawMenuItems: any) {
    const menuItems = new Array<MenuItem>();
    menuCategory.forEach(item => {
      let menuItem = new MenuItem();
      if (rawMenuItems[item.category].length > 0) {

        menuItem.isMenuCategory = true;
        menuItem.categoryName = item.categoryName;
        menuItems.push(menuItem);
        rawMenuItems[item.category].forEach(x => {
          let menuItem = new MenuItem();
          menuItem.isMenuCategory = false;
          menuItem.id = x.id;
          menuItem.name = x.name;
          menuItem.type = x.type;
          menuItem.description = x.description;
          menuItem.price = x.price;
          menuItem.itemCategory = x.itemCategory;
          menuItem.itemCount = x.itemCount;
          menuItem.rating = x.rating;
          menuItem.veg = x.veg;
          menuItem.spicy = x.spicy;
          menuItem.healthy = x.healthy;
          menuItems.push(menuItem);
        });
        this.menuItems = menuItems;

      }
    });

    console.log(this.menuItems);
  }
}
