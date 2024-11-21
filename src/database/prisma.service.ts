import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('db connected');
    // const defaultState = await this.requirementState.findMany({});

    // if (!defaultState.length) {
    //   await this.requirementState.create({
    //     data: {
    //       title: 'To do',
    //       secuence: 1
    //     }
    //   });
    // }

    // let defaultProfile = await this.profile.findFirst({
    //   where: {
    //     name: 'Admin'
    //   }
    // });

    // if (!defaultProfile) {
    //   await this.profile.create({
    //     data: {
    //       name: 'Admin'
    //     }
    //   });
    // }

    // defaultProfile = await this.profile.findFirst({
    //   where: {
    //     name: 'Admin'
    //   }
    // });

    // const defaultUser = await this.user.findUnique({
    //   where: { userName: 'admin' }
    // });

    // if (!defaultUser) {
    //   const adminUser = await this.user.create({
    //     data: {
    //       userName: 'admin',
    //       password: process.env.DEFAULT_ADMIN_PASSWORD || 'admin',
    //       lastName: 'Admin',
    //       firstName: 'Admin',
    //       profileId: defaultProfile.id
    //     }
    //   });
    //   console.log(adminUser);
    // }
  }
}
