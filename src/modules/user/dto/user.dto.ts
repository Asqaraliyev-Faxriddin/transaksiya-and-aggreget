import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsOptional, IsString } from "class-validator"

export class registerDto{

@ApiProperty()
@IsString()
name:string

@ApiProperty()
@IsString()
phone:string

@ApiProperty()
@IsString()
address:string

@ApiProperty()
@IsEmail()
email:string

@ApiProperty()
@IsString()
age:string


}


export class updatedDto{

    @ApiProperty()
    @IsString()
    @IsOptional()
    name?:string
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    phone?:string
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    address?:string
    
    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email?:string
    
    @ApiProperty()
    @IsString()
    age?:string
    
    
    }
    export class QueryDto{

        @ApiProperty()
        @IsString()
        @IsOptional()
        name?:string
        
        @ApiProperty()
        @IsOptional()
        @IsString()
        phone?:string
        
        @ApiProperty()
        @IsOptional()
        @IsString()
        address?:string
        
        @ApiProperty()
        @IsOptional()
        @IsEmail()
        email?:string
        
        @ApiProperty()
        @IsOptional()
        @IsString()
        age?:string
        
        
        }