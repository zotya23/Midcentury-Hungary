import { Injectable } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkMode: boolean = false;

  constructor(private overlayContainer: OverlayContainer) {}

  toggleTheme() {
    this.darkMode = !this.darkMode;

    const themeClass = this.darkMode ? 'dark-theme' : 'light-theme';
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;

    if (overlayContainerClasses.contains('dark-theme')) {
      overlayContainerClasses.remove('dark-theme');
    } else {
      overlayContainerClasses.remove('light-theme');
    }

    overlayContainerClasses.add(themeClass);
  }
}