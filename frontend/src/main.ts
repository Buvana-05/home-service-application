import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './app/jwt.interceptor';

/*bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); */

  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(withInterceptors([jwtInterceptor])),
      provideHttpClient(),
      provideRouter(routes)]
  });
