import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { IsOptional, IsString } from 'class-validator';


export class UpdateCommentDto {

    @ApiProperty()
    @IsOptional()
    @IsString()
    name?:string
        
    @ApiProperty()
    @IsOptional()
    @IsString()
    post_id?:string
}
