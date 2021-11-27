import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

export interface MatLoader 
{
	color: ThemePalette;
    mode: ProgressSpinnerMode;   
}