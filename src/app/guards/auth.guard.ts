import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toaster.service';

export const authGuard: CanActivateFn = () => {
  const authStatus = inject(AuthService)
  const router=inject(Router)
  const toaster = inject(ToasterService)

  if(authStatus.isLoggedIn()){
    return true;
  }else{
    toaster.showWarning('Operation Denied!!! Please Login')
    return false
  }
};
