import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma:PrismaService ){}
  async create(payload: CreateCommentDto) {

  
    let data:any = await this.prisma.post.findFirst({where:{id:payload.post_id}})
    if(!data)throw new  NotFoundException("Post not found")

    data = await this.prisma.comment.create({data:payload})
  
    return data
}

  async findAll() {
    let aggregate = await this.prisma.comment.aggregate({
      _max:{id:true},
      _min:{id:true},
      _count:true
    })
    let data = await this.prisma.comment.findMany({
      select:{
        id:true,
        name:true,
        post:{
          select:{
            id:true,
            title:true,
            comment:true,
            user:{
              select:{
                id:true,
                name:true,
                age:true,
                phone:true
              }
            }
          }
        }
      }
    })

    return {data,aggregate}
  }



  async update(id: string, payload: UpdateCommentDto) {

   let oldComment = await this.prisma.comment.findFirst({where:{id}})
    if(!oldComment) throw new NotFoundException("Comment not found")
   let data = await this.prisma.comment.update({
    where:{id},
    data:payload
  })
  
    return data
  }


  async remove(id: string) {



    let oldComment = await this.prisma.comment.delete({where:{id}})
    if(!oldComment) throw new NotFoundException("Comment not found")

      return {
        status:true,
        message:"Comment deleted"
      }
  }
}
