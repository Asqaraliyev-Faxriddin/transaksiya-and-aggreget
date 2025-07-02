import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { registerDto, updatedDto } from "./dto/user.dto";

@Injectable()
export class UserService {
constructor(private prisma:PrismaService){}

async Allusers(){

    let aggreggate = this.prisma.user.aggregate(
        {
            _max:{id:true},
            _min:{id:true},
            _count:true
        }
    )

    let data = await this.prisma.user.findMany({
        select:{
            id:true,
            name:true,
            age:true,
            phone:true,
            posts:{
                select:{
                    id:true,
                    title:true,
                    body:true,
                    comment:{
                        select:{
                            id:true,
                            name:true
                        
                        }
                    }
                }
            }

        },
        orderBy:{
            "age":"asc"
        }
    })
    return {data,aggreggate}

}

async AddUser(payload:registerDto){
    let oldemail = await this.prisma.user.findFirst({where:{email:payload.email}})
    if(oldemail) throw new ConflictException("email already exist")
    
    let data = await this.prisma.user.create({data:payload}) 

    return data

}

async remoweUser(id:string){
    let oldId = await this.prisma.user.findFirst({where:{id}})
    if(!oldId) throw new NotFoundException("user not found")

    let olduser = await this.prisma.user.delete({where:{id}})

    return {
        message:"Malumot o'chirildi",
        olduser

    }
}

async UpdateUser(payload:updatedDto,id:string){
    let oldId = await this.prisma.user.findFirst({where:{id}})
    if(!oldId) throw new NotFoundException("user not found")

    let olduser = await this.prisma.user.update({where:{id},data:payload} )

    return olduser
    
}

async trancaktion_test(payload:registerDto){

let data = await this.prisma.$transaction(async(l)=>{


try {
    
    const user = await l.user.create({
        data: {
            name:payload.name,
            email:payload.email,
            phone:payload.phone,
            address:payload.address,
            age:payload.age
        }
      })

     
      const post = await l.post.create({
        data: {
          title: "Biror post",
          body: "transaksiya",
          user_id: user.id
        }
      })


      const comment = await l.comment.create({
        data: {
          name: "Yaxshi yozilgan!",
          post_id: post.id
        }
      })

      
    return {message:"Mufaqqiyatli transaksiya bo'ldi."}

} catch (error) {
    throw new BadRequestException(error.message)
}

})

return { message: "Muvaffaqiyatli transaksiya bo'ldi." }
}


}
