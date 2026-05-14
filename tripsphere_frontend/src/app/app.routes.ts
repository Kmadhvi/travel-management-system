import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TravelRequestsComponent } from './features/travel-requests/travel-requests.component';
import { ExpensesComponent } from './features/expenses/expenses.component';
import { ReportsComponent } from './features/reports/reports.component';
import { ApprovalsComponent } from './features/approvals/approvals.component';
import { ProfileComponent } from './features/profile/profile.component';
import { TravelRequestListComponent } from './features/travel-request-list/travel-request-list.component';
import { AddExpenseComponent } from './features/add-expense/add-expense.component';
import { ItineraryComponent } from './features/itinerary/itinerary.component';
import { UsersComponent } from './features/users/users.component';
import { AddUserComponent } from './features/add-user/add-user.component';
import { SettingsComponent } from './features/settings/settings.component';
import { AuditLogsComponent } from './features/audit-logs/audit-logs.component';
import { PolicyManagementComponent } from './features/policy-management/policy-management.component';
import { RequestDetailsComponent } from './features/request-details/request-details.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';


export const routes: Routes = [

    {
        path:'' , 
        redirectTo: 'login',
        pathMatch:'full'
    },
    
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},

    {
        path:'',
        component: MainLayoutComponent,
      //  canActivate: [authGuard],
        children:[
            {
                path:'dashboard',
                component: DashboardComponent,
            },
            {
                path:'travel-request', 
                component: TravelRequestsComponent,
                // canActivate:[roleGuard],
                // data:{roles: ['EMPLOYEE','MANAGER']}
            },
            { 
                path:'travel-request-list', 
                component: TravelRequestListComponent,
            },

            { 
                path:'expenses', 
                component: ExpensesComponent,
                 //canActivate:[authGuard],
             },
            {
                path:'add-expense', 
                component: AddExpenseComponent,
                 //canActivate:[authGuard],
            },
            { 
                path:'reports',
                component: ReportsComponent
            },
            {   
                path:'approvals', 
                component: ApprovalsComponent,
                //canActivate:[authGuard],
            },
            {   
                path:'profile', 
                component: ProfileComponent,
                //canActivate:[authGuard],
            },
            {
                path:'itinerary/:id',
                component: ItineraryComponent,
                //canActivate:[authGuard],
            },
            {   path:'users', 
                component: UsersComponent,
                //canActivate:[authGuard],
            },
            {   path:'add-user', 
                component: AddUserComponent,
                //canActivate:[authGuard],
            },
            {   path:'settings',
                component: SettingsComponent,
                //canActivate:[authGuard],
            },
            {   
                path:'audit-logs', 
                component: AuditLogsComponent,
                //canActivate:[authGuard],
            },
            {   
                path:'policy-management', 
                component: PolicyManagementComponent,
                //canActivate:[authGuard],
            },
            {
                path:'request-details/:id',
                component: RequestDetailsComponent,
                //canActivate:[authGuard],
            },


        ]

    },
    {path: '**', redirectTo: 'login'}
];
