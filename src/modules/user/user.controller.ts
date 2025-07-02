import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { registerDto, updatedDto } from './dto/user.dto';

@Controller('api/user')
export class UserController {
constructor(private userService:UserService){}


    @Get("all")
    Allusers(){
        return this.userService.Allusers()

    }

    @Post("create")
    create(@Body() payload:registerDto){
        return this.userService.AddUser(payload)
    }

    @Put("update/:id")
    updateUser(@Body() payload:updatedDto,@Param("id") id:string){
        return this.userService.UpdateUser(payload,id)
    }

    
    @Delete("update/:id")
    deleteUser(@Param("id") id:string){
        return this.userService.remoweUser(id)
    }

    @Post("transaktion")
    async transaktion(@Body() payload:registerDto){
        try {
            let data = await this.userService.trancaktion_test(payload)

            return data
        } catch (error) {
            throw new BadRequestException(error.message )
        }
    
    }
}
