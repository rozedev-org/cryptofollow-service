import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealthCheck() {
    return {
      status: 'OK'
    };
  }
}
