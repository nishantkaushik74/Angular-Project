import { INavData } from '@coreui/angular';
import { Router } from '@angular/router';

export const navItems: INavData[] =
 [
  
  {
    name: 'Home',
    url: '/profile',
    iconComponent: { name: 'cil-Home' },
  },
  {
    name: 'Components',
    title: true
  },
  {
    name: 'TDS',
    url: '/profile',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'GST',
    iconComponent: { name: 'cil-notes' },
    children: []
  }
];

