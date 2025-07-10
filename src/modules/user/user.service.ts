import { BadRequestException, ConflictException, Injectable, NotFoundException, Post } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { QueryDto, registerDto, updatedDto } from "./dto/user.dto";
import { filter } from "rxjs";
import { title } from "process";

@Injectable()
export class UserService {
constructor(private prisma:PrismaService){}

async Allusers(payload:QueryDto){

   let filters:any =[]
    if(payload.name)  filters.push({
        name: {
          contains: payload.name,
          mode: 'insensitive'
        }
      });
    if(payload.age) filters.push({
        name: {
          contains: payload.name,
          mode: 'insensitive'
        }
      });
    if(payload.phone) filters.push({
        name: {
          contains: payload.name,
          mode: 'insensitive'
        }
      });
    if(payload.email) filters.push({
        name: {
          contains: payload.name,
          mode: 'insensitive'
        }
      });
        



    let data = await this.prisma.user.findMany({
        where:{
            OR:filters
        },
        select:{
            name:true,
            email:true,
            phone:true,
            age:true,
        
    
        },
        
    })

    return {
        data,
    }
}

async AddUser(payload:any){
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

async getUser(name:string){
  let data = await  this.prisma.user.findFirst({where:{name:name}})

  return data

}



async getUsers(){
  

  let data = await this.prisma.user.findMany({
    select:{
        id:true,
        name:true,
        post:{
            select:{
                id:true,
                title:true,
                commet:{
                  id:true,
                  name:true
                }
            },
            
            
        },
  
    }
}) 


return data

}


}
