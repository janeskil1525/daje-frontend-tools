import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EndPoint} from './endpoints';
import {UserLoginService} from "../../features/user/login/user.login.service";

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  private local_key: string = '';
  private http = inject(HttpClient);
  private end: EndPoint = new EndPoint();
  private key2:number = -1;

  constructor(
    private login_service: UserLoginService,
  ) {}

  public load_record(endpoint: string, load_pkey: number | undefined): Observable<any> {
      this.local_key = this.login_service.getXTokenCheck();
      if(this.key2 > -1) {
        this.end.setKey2(this.key2);
      } else {
        this.key2 = -1;
      }
      let url = this.end.load_record_endpoint(endpoint, load_pkey);
       if(this.key2 > -1) {
        this.end.setKey2(-1);
        this.key2 = -1;
      }

      return this.http.get <any>(url, {
          headers: {
              'X-Token-Check': this.local_key
          }
      });
  }

  public load_all_records(endpoint:string ): Observable<any[]> {
    this.local_key = this.login_service.getXTokenCheck();
    let url = this.end.load_all_records_endpoint(endpoint);
    return this.http.get <any[]> (url,{
      headers:{
        'X-Token-Check': this.local_key
      }
    });

  }

  public setKey2(key2:number) {
    this.key2 = key2;
  }
}
