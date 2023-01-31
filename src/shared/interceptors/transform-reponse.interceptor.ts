import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformReponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data) return { success: true };

        if (data.total != null && data.total != undefined) {
          return { success: true, ...data };
        }
        if (!Array.isArray(data)) return { success: true, data: [data] };
        return { success: true, data };
      }),
    );
  }
}
