import { INavData } from '@coreui/angular';
import { Router } from '@angular/router';

export const navItems: INavData[] =
 [
  
  {
    name: 'Home',
    url: '/Home',
    iconComponent: { name: 'cil-Home' },
  },
  {
    name: 'Components',
    title: true
  },
  {
    name: 'TDS',
    url: '/Tds',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'GST',
    iconComponent: { name: 'cil-notes' },
    children: []
  }
];



// {
//   name: 'ACTS',
//   url: '/gst/Acts',
//   // Remove the onClick property
// },
// {
//   name: 'RULES',
//   url: '/gst/option2'
// },
// {
//   name: 'NOTIFICATION',
//   url: '/gst/option2'
// },
// {
//   name: 'CASE LAW',
//   url: '/gst/option2'
// },
// {
//   name: 'GST RATE and HSN CODE',
//   url: '/gst/option2'
// },
// {
//   name: 'ARTICLE',
//   url: '/gst/option2'
// },
// {
//   name: 'FORMS',
//   url: '/gst/option2'
// },
// {
//   name: 'COUNCIL MEETING',
//   url: '/gst/option2'
// },
// {
//   name: 'RCM',
//   url: '/gst/option2'
// },
// {
//   name: 'DRAFT REPLY',
//   url: '/gst/option2'
// },
// {
//   name: 'REPLIES',
//   url: '/gst/option2'
// },
// {
//   name: 'CIBIC FAQ ',
//   url: '/gst/option2'
// },
// {
//   name: 'RESEARCH',
//   url: '/gst/option2'
// },
// {
//   name: 'NEWS',
//   url: '/gst/option2'
// },
// {
//   name: 'VIDEOS ',
//   url: '/gst/option2'
// },
// {
//   name: 'BLOG ',
//   url: '/gst/option2'
// },