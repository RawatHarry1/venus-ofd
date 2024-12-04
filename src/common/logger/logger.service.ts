import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppLoggerService extends Logger {
  logRequestResponse(req, res, next) {
    const { method, originalUrl, body } = req;
    this.log(
      `Incoming Request: ${method} ${originalUrl} - ${JSON.stringify(body)}`,
    );

    const originalSend = res.send;
    res.send = (body) => {
      this.log(`Outgoing Response: ${JSON.stringify(body)}`);
      originalSend.call(res, body);
    };

    next();
  }
}
