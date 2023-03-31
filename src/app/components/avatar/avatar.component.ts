import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from "@angular/common";

@Component({
  selector: "app-avatar",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <img
      class="rounded-full"
      src="/assets/avatar.png"
      fill
      alt="Avatar"
    />
  `,
  styles: [],
})
export class AvatarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
