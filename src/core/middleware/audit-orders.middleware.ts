import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuditOrdersMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.info(
            '[Audit], Request:',
            req.method,
            req.originalUrl,
            'Body:',
            req.body,
            'Query:',
            req.query,
            'Params:',
            req.params,
        );
        next();
    }
}
