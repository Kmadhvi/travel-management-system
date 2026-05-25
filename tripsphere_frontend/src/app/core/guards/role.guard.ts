import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check login first
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const allowedRoles = route.data?.['roles'] as string[] | undefined;
  if (!allowedRoles || allowedRoles.length === 0) return true;

  const user = authService.getCurrentUser();
  const userRole = user?.role?.toUpperCase().trim();
  const allowed = allowedRoles.map(r => r.toUpperCase().trim());

  if (userRole && allowed.includes(userRole)) {
    return true;
  }

  // Logged in but wrong role — go to dashboard, not login
  router.navigate(['/dashboard']);
  return false;
};
