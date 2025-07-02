import { Module } from '@nestjs/common';
import { PrismaModule } from './core/database/prisma.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';


@Module({
  imports: [PrismaModule, UserModule, PostModule, CommentModule],

})
export class AppModule {}
