import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FlakeyApiInterceptor implements NestInterceptor {

  constructor(
    private readonly failureRate: number
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data => {
      if (Math.random() > this.failureRate) {
        throw new BadGatewayException();
      }
      return data;
    }));
  }
}
