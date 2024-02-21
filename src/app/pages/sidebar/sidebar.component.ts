import { Component } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  page = [
    {label:"principel", route: "", text: "Principale", iconActive: "-mr-1 font-medium text-black", icon: "-mr-1 font-medium text-white" },
    {label:"Competition", route: "/competition", text: "test-1", iconActive: "'-mr-1 font-medium text-black'", icon: "-mr-1 font-medium text-white"},
    {label:"test", route: "/test", text: "test-2", iconActive:"-mr-1 font-medium text-black" , icon: "-mr-1 font-medium text-white"},
  ]
  isActive = '';
  selectedPage(route:string){
    this.isActive = route;
  }

}
