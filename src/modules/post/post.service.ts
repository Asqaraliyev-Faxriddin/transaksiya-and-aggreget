import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { createPost, updatePost } from './dto/post.dto';

@Injectable()
export class PostService {
constructor(private prisma:PrismaService){}

async AllPost(){

    let aggregate = await this.prisma.post.aggregate({
        _count:true,
        _max:{id:true},
        _min:{id:true}
    }
    )
    let data = await this.prisma.post.findMany({
        select:{
            id:true,
            title:true,
            body:true,
            comment:{
                select:{
                    id:true,
                    name:true
                }
            },
            user:{
                select:{
                    id:true,
                    name:true,
                    age:true,
                    phone:true
                    
                }
            }
        }
    }) 

    return {data,aggregate}
}

async createPost(payload:createPost){

    let olduser = await this.prisma.user.findFirst({where:{id:payload.user_id}})
    if(!olduser) throw new NotFoundException("user not found")
    let data = await this.prisma.post.create({data:payload})

    return data
}

async update(payload:updatePost,id:string){

    let oldpost = await this.prisma.post.findFirst({where:{id}})
    if(!oldpost) throw new NotFoundException("post not found")
    
    let data = await this.prisma.post.update({where:{id},data:payload})

    return data

}
    async delete (id:string){

        let oldpost = await this.prisma.post.findFirst({where:{id}})
        if(!oldpost) throw new NotFoundException("post not found")
        
        let data = await this.prisma.post.delete({where:{id}})
    
        return {
            message:"o'chirildi.",
            status:true,
            data
        }
    }


}