import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { SignupComponent } from '../app/containers/signup/signup.component';
import { LoginComponent } from '../app/containers/login/login.component';
import { SubjectComponent } from './subject/subject.component';
import { AddQuestionsComponent } from './containers/add-questions/add-questions.component';
import { CommentComponent } from './views/comment/comment/comment.component';
import { QuestionComponent } from './containers/question/question.component';
import { QuestionScreenComponent } from './containers/question-screen/question-screen.component';
import { ActsComponent } from 'src/app/containers/default-layout/acts/acts.component';
import { AuthGuard } from 'src/app/containers/login/auth.guard';
import { ProfileComponent } from './component/profile/profile.component';
import { Acts1Component } from './component/acts1/acts1.component';
import { SectionComponent } from './component/section/section.component';
import { SubSectionComponent } from './component/sub-section/sub-section.component';
import { RulesComponent } from './component/rules/rules.component';
import { GstRateComponent } from './component/gst-rate/gst-rate.component';
import { RcmComponent } from './component/rcm/rcm.component';
import { DraftReplyComponent } from './component/draft-reply/draft-reply.component';
import { CouncilMeetingsComponent } from './component/council-meetings/council-meetings.component';
import { ArticlesComponent } from './component/articles/articles.component';
import { FormsComponent } from './component/forms/forms.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { component: SignupComponent, path: 'signup' },
  { component: LoginComponent, path: 'login' },
  { component: Page404Component, path: '404', data: { title: 'Page 404' } },
  { component: Page500Component, path: '500', data: { title: 'Page 500' } },
  { component: LoginComponent, path: 'login', data: { title: 'Login Page' } },
  {
    path: '', component: DefaultLayoutComponent, data: { title: 'Home' },
    // canActivate: [AuthGuard]
    children: [
      {
        component: ProfileComponent, path: 'profile',
      },
      {
        component: CommentComponent, path: 'comment',
      },
      {
        component: QuestionScreenComponent, path: 'questionScreen/:id'
      },
      {
        component: QuestionComponent, path: 'question'
      },

      // { component: SubjectComponent, path: 'subject' },
      // { component: AddQuestionsComponent, path: 'add-questions' },
      {
        component: SignupComponent, path: 'signup/:userid'
      },
      {
        component: Acts1Component, path: 'gst/act'
      },
      {
        component: RulesComponent, path: 'gst/rules'
      },
      {
        component: GstRateComponent, path: 'gst/gstrateandhsncode'
      },
      {
        component: RcmComponent, path: 'gst/rcm'
      },


      {
        component: SectionComponent, path: 'gst/act/section'
      },
      {
        component: SubSectionComponent, path: 'gst/act/section/subsection'
      },
      {
        component: DraftReplyComponent, path: 'gst/draftreply'
      },
      {
        component: CouncilMeetingsComponent, path: 'gst/councilmeetings'
      },
      {
        component: ArticlesComponent, path: 'gst/articles'
      },
      {
        component: FormsComponent, path: 'gst/forms'
      },
      {
        path: 'widgets', loadChildren: () => import('./views/widgets/widgets.module').then((m) => m.WidgetsModule), canActivate: [AuthGuard]
      },
      {
        path: 'pages', loadChildren: () => import('./views/pages/pages.module').then((m) => m.PagesModule), canActivate: [AuthGuard]
      },
    ]
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
