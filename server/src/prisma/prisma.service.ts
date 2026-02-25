import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      const actionsToLog = ['update', 'delete', 'updateMany', 'deleteMany'];
      const ignoredModels = ['AuditLog', 'Session'];

      if (
        actionsToLog.includes(params.action) &&
        params.model &&
        !ignoredModels.includes(params.model)
      ) {
        const model = params.model;
        const action = params.action.toUpperCase();

        let oldData: any = null;
        if (params.args.where) {
          try {
            oldData = await (this as any)[model].findFirst({
              where: params.args.where,
            });
          } catch (e: any) {
            this.logger.warn(`Cannot fetch old data for audit: ${e.message}`);
          }
        }

        const result = await next(params);
        void (async () => {
          try {
            const targetId = result?.id || oldData?.id || 'UNKNOWN';
            const systemUser = await this.user.findFirst({
              where: { role: 'SUPER_ADMIN' },
            });
            const actorId = systemUser?.id;

            if (actorId) {
              await this.auditLog.create({
                data: {
                  action: action,
                  entity: model,
                  entityId: targetId,
                  oldValues: oldData || {},
                  newValues: action.includes('DELETE') ? {} : result,
                  userId: actorId,
                  ipAddress: '127.0.0.1',
                },
              });
            }
          } catch (err: any) {
            this.logger.error(`Failed to write AuditLog: ${err.message}`);
          }
        })();

        return result;
      }

      return next(params);
    });
  }
}
