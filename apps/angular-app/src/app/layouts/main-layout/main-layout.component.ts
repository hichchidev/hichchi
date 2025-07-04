import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
    selector: "app-main-layout",
    imports: [CommonModule, RouterModule],
    templateUrl: "./main-layout.component.html",
    styleUrl: "./main-layout.component.scss",
})
export class MainLayoutComponent {}
