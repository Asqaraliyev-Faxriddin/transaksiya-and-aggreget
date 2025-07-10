import { PrismaService } from "src/core/database/prisma.service"
import { UserService } from "./user.service"
import {Test} from "@nestjs/testing"
import { mock } from "node:test"
import { ConflictException, NotFoundException } from "@nestjs/common"
import { create } from "node:domain"


describe("UserService",()=>{

    let prisma : PrismaService
    let service: UserService

    beforeEach(async()=>{

        let module = await Test.createTestingModule({
            providers:[UserService,{
                provide:PrismaService,
                useValue:{
                    user:{
                        findFirst:jest.fn(),
                        findMany:jest.fn(),
                        create:jest.fn(),
                        delete:jest.fn()

                    }
                }

            }]
        }).compile()

        service = module.get(UserService)
        prisma = module.get(PrismaService)


    })

    it("name orqali malumot o'qishi kerak",async()=>{

        let mock = {
            id:"ewfdgdffdfdewewwe",
            name:"bobur",
            age:23,

        };

        (prisma.user.findFirst as jest.Mock).mockResolvedValue(mock)

        let result = await service.getUser("ali")

        expect(prisma.user.findFirst).toHaveBeenCalledWith({
            where:{name:"ali"}
        })

        expect(result).toEqual(mock)


    })


    it("Hamma user larni ko'rish",async()=>{

        let usersMokcs = {
            id:"edfgn",
            name:"sdcbj",
            age:232
        };

        (prisma.user.findMany as jest.Mock).mockResolvedValue(usersMokcs)
        let payload = await service.getUsers()
        expect(prisma.user.findMany).toHaveBeenCalledWith({

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


        expect(payload).toEqual(usersMokcs)


    })

    


    it("User tekshirish emailini", async () => {
        let mockPayload = {
            name: "Vali",
            email: "ali@gmail.com"
        };
        
        (prisma.user.findFirst as jest.Mock).mockResolvedValue({ id: '123', ...mockPayload });

        let result = service.AddUser(mockPayload)

        expect(prisma.user.findFirst).toHaveBeenCalledWith({ where: { email: mockPayload.email } });
    
        await expect(result).rejects.toThrow(ConflictException);
    
    });


    it("User qo'shish",async()=>{

        let payload = {
            name:"Ali",
            email:"ali@gmail.com",
            ageL:24
        };

        (prisma.user.findFirst as jest.Mock).mockResolvedValue(null)
        (prisma.user.create as jest.Mock).mockResolvedValue({id:"sdsd",...payload})
            let result = await service.AddUser(payload)
            expect(prisma.user.findFirst).toHaveBeenNthCalledWith(1,{where:{
                    email:"ali@gmail.com"
            
                }
            
            
            })

            expect(prisma.user.create).toHaveBeenCalledWith({
                data:payload
            })

            expect(result).toEqual({id:"1",...payload})


    })


    it("Foydalanuvchini o'chirishdan oldin topish",(async()=>{

        let userId = "dfghjkl";

        (prisma.user.findFirst as jest.Mock).mockResolvedValue(null)
        let result = await service.remoweUser(userId)
        expect(result).rejects.toThrow(NotFoundException)


        expect(prisma.user.findFirst).toHaveBeenCalledWith({where:{id:userId}})


    }))


    it("User o'chirilishi", async () => {
        const userId = "existing-id";
        const mockUser = { id: userId, name: "Ali", email: "ali@gmail.com", age: 25 };
      
        (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
        (prisma.user.delete as jest.Mock).mockResolvedValue(mockUser);
      
        const result = await service.remoweUser(userId);
      
        expect(prisma.user.findFirst).toHaveBeenCalledWith({ where: { id: userId } });
        expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: userId } });
        expect(result).toEqual({
          message: "Malumot o'chirildi",
          olduser: mockUser,
        });
      });
})