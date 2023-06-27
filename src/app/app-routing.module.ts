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
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { CaseLawsComponent } from './component/case-laws/case-laws.component';
import { NotificationsComponent } from './component/notifications/notifications.component';
import { CBICComponent } from './component/cbic/cbic.component';
import { BlogComponent } from './component/blog/blog.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { TestingPageComponent } from './component/testing-page/testing-page.component';
import { DeadlinesComponent } from './component/deadlines/deadlines.component';
const routes: Routes = [
  { component: SignupComponent, path: 'signup' },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { component: ForgotPasswordComponent, path: 'forgotpassword' },
  { component: TestingPageComponent, path: 'testing' },
  { component: Page404Component, path: '404', data: { title: 'Page 404' } },
  { component: Page500Component, path: '500', data: { title: 'Page 500' } },
  { component: LoginComponent, path: 'login', data: { title: 'Login Page' } },
  { component: ChangePasswordComponent, path: 'resetPassword' },
  {
    path: '', component: DefaultLayoutComponent, data: { title: 'Home' },
    // canActivate: [AuthGuard]
    children: [
      {
        component: ProfileComponent, path: 'profile',
      },
      {
        component: DeadlinesComponent, path: 'deadlines',
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
        component: Acts1Component, path: 'act'
      },
      {
        component: RulesComponent, path: 'rules'
      },
      {
        component: GstRateComponent, path: 'gstrateandhsncode'
      },
      {
        component: RcmComponent, path: 'rcm'
      },


      {
        component: SectionComponent, path: 'section'
      },
      {
        component: SubSectionComponent, path: 'subsection'
      },
      {
        component: DraftReplyComponent, path: 'draftreply'
      },
      {
        component: CouncilMeetingsComponent, path: 'councilmeetings'
      },
      {
        component: ArticlesComponent, path: 'articles'
      },
      {
        component: FormsComponent, path: 'forms'
      },
      {
        component: ChangePasswordComponent, path: 'changepassword'
      },
      {
        component: CaseLawsComponent, path: 'caselaws'
      },
      {
        component: NotificationsComponent, path: 'notifications'
      },
      {
        component: CBICComponent, path: 'cbicfaqs'
      },
      {
        component: BlogComponent, path: 'blog'
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
