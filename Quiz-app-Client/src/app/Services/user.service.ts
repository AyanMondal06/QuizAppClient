import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }

  public getRoleFromStore() {
    return this.role$.asObservable();
  }
  public setRolesForStore(role: string) {
    this.role$.next(role);
  }
  public getFullNameFromStore() {
    return this.fullName$.asObservable();
  }
  public setFullNameForStore(fullName: string) {
    this.fullName$.next(fullName);
  }
}
