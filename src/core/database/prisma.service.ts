import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit,OnModuleDestroy{
private loger = new Logger("Database")
async onModuleInit() {
    try {
        await this.$connect()
        this.loger.log("Mufaqqiyatli ulandi...");
        
        
    } catch (error) {
        
        this.loger.log("ulanmadi...",error.message);
        
    }
}

async onModuleDestroy() {
    try {
        await this.$disconnect()
        this.loger.log("ulanmadi",);
        process.exit()
        
    } catch (error) {
        this.loger.log(error.message);
        
    }
}


}
