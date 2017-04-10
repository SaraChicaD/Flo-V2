import { AboutComponent } from './components/about/about.component';
import { EventComponent } from '../calendar/components/event/event.component';
// import { ReminderComponent } from '../calendar/components/reminder/reminder.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';

export const routes = [
  { path: 'about', component: AboutComponent },
  { path: 'add-flo', component: EventComponent, canActivate: [LoggedInGuard] },
  // { path: 'add-reminder', component: ReminderComponent, canActivate: [LoggedInGuard] },
  { path: '', component: LoginComponent, canActivate: [LoggedOutGuard] }
];
