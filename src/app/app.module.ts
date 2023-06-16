import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from '../app/containers/signup/signup.component';
import { LoginComponent } from '../app/containers/login/login.component';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';
import { ToastService, AngularToastifyModule } from 'angular-toastify';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,

} from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,

} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { MatIconModule } from '@angular/material/icon';
import { SubjectComponent } from './subject/subject.component';
import { AddQuestionsComponent } from './containers/add-questions/add-questions.component';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CommentComponent } from './views/comment/comment/comment.component';
import { QuestionComponent } from './containers/question/question.component';
import { QuestionScreenComponent } from './containers/question-screen/question-screen.component';
import { AnswerScreenComponent } from './containers/answer-screen/answer-screen.component';
import { ActsComponent } from './containers/default-layout/acts/acts.component';
import { ProfileComponent } from './component/profile/profile.component';
import { createClient } from '@supabase/supabase-js';
import { Acts1Component } from './component/acts1/acts1.component';
import { CardComponent } from './component/card/card.component';
import { ModalComponent } from './component/modal/modal.component';
import { SectionComponent } from './component/section/section.component';
import { SubSectionComponent } from './component/sub-section/sub-section.component';
import { DocDisplayComponent } from './component/doc-display/doc-display.component';
import { RulesComponent } from './component/rules/rules.component';
import { CaseLawsComponent } from './component/case-laws/case-laws.component';
import { GstRateComponent } from './component/gst-rate/gst-rate.component';
import { RcmComponent } from './component/rcm/rcm.component';
import { DraftReplyComponent } from './component/draft-reply/draft-reply.component';
import { Card2Component } from './component/Morecomponents/card2/card2.component';
import { Modal2Component } from './component/Morecomponents/modal2/modal2.component';
import { CouncilMeetingsComponent } from './component/council-meetings/council-meetings.component';
import { ArticlesComponent } from './component/articles/articles.component';
import { FormsComponent } from './component/forms/forms.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { Modal3Component } from './component/Morecomponents/modal3/modal3.component';
import { Card3Component } from './component/Morecomponents/card3/card3.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];


@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, SignupComponent,
    LoginComponent,
    SubjectComponent,
    AddQuestionsComponent,
    CommentComponent,
    QuestionComponent,
    QuestionScreenComponent,
    AnswerScreenComponent,
    ActsComponent,
    ProfileComponent,
    Acts1Component,
    CardComponent,
    ModalComponent,
    SectionComponent,
    SubSectionComponent,
    DocDisplayComponent,
    RulesComponent,
    CaseLawsComponent,
    GstRateComponent,
    RcmComponent,
    DraftReplyComponent,
    Card2Component,
    Modal2Component,
    CouncilMeetingsComponent,
    ArticlesComponent,
    FormsComponent,
    ChangePasswordComponent,
    Modal3Component,
    Card3Component,
  ],
  imports: [
    AngularToastifyModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormsModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule, MatIconModule, ReactiveFormsModule, HttpClientModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService,
    Title,
     ToastService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
