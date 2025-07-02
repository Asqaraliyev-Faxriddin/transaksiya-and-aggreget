import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit,OnModuleDestroy{

async onModuleInit() {
    try {
        await this.$connect()
        console.log("Mufaqqiyatli ulandi...");
        
        
    } catch (error) {
        
        console.log("ulanmadi...",error.message);
        
    }
}

async onModuleDestroy() {
    try {
        await this.$disconnect()
        console.log("ulanmadi");
        process.exit()
        
    } catch (error) {
        console.log(error.message);
        
    }
}


}
