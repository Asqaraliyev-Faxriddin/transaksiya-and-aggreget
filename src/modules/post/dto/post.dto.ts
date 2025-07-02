import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"


export class createPost {

    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title:string

    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    body:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    user_id:string
}

export class updatePost {

    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title:string

    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    body:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    user_id:string
}