import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateCommentDto {

    @ApiProperty()
    @IsString()
    name:string
        
    @ApiProperty()
    @IsString()
    post_id:string
}
