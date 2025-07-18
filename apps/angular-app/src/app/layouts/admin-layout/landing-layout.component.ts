import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
    selector: "app-landing-layout",
    imports: [CommonModule, RouterModule],
    templateUrl: "./landing-layout.component.html",
    styleUrl: "./landing-layout.component.scss",
})
export class LandingLayoutComponent {}
