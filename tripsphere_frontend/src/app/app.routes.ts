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
        canActivate: [authGuard],
        children:[
            {
                path:'dashboard',
                component: DashboardComponent,
            },
            {
                path:'travel-request', 
                component: TravelRequestsComponent,
                canActivate:[roleGuard],
                
            },
            { 
                path:'travel-request-list', 
                component: TravelRequestListComponent,
                canActivate:[roleGuard],
                data:{roles: ['EMPLOYEE','MANAGER','FINANCE', 'ADMIN']}
            },

            { 
                path:'expenses', 
                component: ExpensesComponent,
                 canActivate:[roleGuard],
                data: { roles: [ 'EMPLOYEE', 'MANAGER', 'FINANCE', 'ADMIN'] }
             },
            {
                path:'add-expense', 
                component: AddExpenseComponent,
                 canActivate:[roleGuard],
                 data: { roles: ['EMPLOYEE', 'MANAGER', 'FINANCE', 'ADMIN'] }
            },
            { 
                path:'reports',
                component: ReportsComponent,
                canActivate:[roleGuard],
                data: { roles: ['ADMIN','MANAGER','FINANCE'] }
            },
            {   
                path:'approvals', 
                component: ApprovalsComponent,
                canActivate:[roleGuard],
                data: { roles: ['MANAGER', 'FINANCE', 'ADMIN'] },
            },
            {   
                path:'profile', 
                component: ProfileComponent,
                canActivate:[roleGuard],
                data: { roles: ['EMPLOYEE', 'MANAGER', 'FINANCE', 'ADMIN'] },
            },
            {
                path:'itinerary/:id',
                component: ItineraryComponent,
                canActivate:[roleGuard],
                 data: { roles: [ 'EMPLOYEE', 'MANAGER', 'FINANCE', 'ADMIN'] }

            },
            {   path:'users', 
                component: UsersComponent,
                canActivate:[roleGuard],
                data: { roles: ['ADMIN','MANAGER', 'FINANCE'] } 

            },
            {   path:'add-user', 
                component: AddUserComponent,
                canActivate:[roleGuard],
                data: { roles: ['ADMIN'] } 
            },
            {   path:'settings',
                component: SettingsComponent,
                canActivate:[roleGuard],
                data: { roles: ['ADMIN','FINANCE','MANAGER'] } 
            },
            {   
                path:'audit-logs', 
                component: AuditLogsComponent,
                canActivate:[roleGuard],
                data: { roles: ['ADMIN','FINANCE','MANAGER'] } 
            },
            {   
                path:'policy-management', 
                component: PolicyManagementComponent,
                canActivate:[roleGuard],
                data: { roles: ['ADMIN','FINANCE'] }
            },
            {
                path:'request-details/:id',
                component: RequestDetailsComponent,
                canActivate:[roleGuard],
                data: { roles: [ 'EMPLOYEE', 'MANAGER', 'FINANCE', 'ADMIN'] }

            },


        ]

    },
    {path: '**', redirectTo: 'login'}
];
