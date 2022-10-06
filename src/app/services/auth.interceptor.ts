import { LoginService } from './login.service'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private loginService: LoginService){}

  intercept  (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.loginService.getToken();

    if(token != null){
      authReq = authReq.clone({
        setHeaders : {Authorization: `Bearer ${token}`}
      })
    }
    return next.handle(authReq);
  }

}

//Esta constante (Interceptora) que importamos en la app.modules llama a todo la clase AuthInterceptor.
export const authInterceptorProviders = [
  {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi:true
  }
]
