import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post("created")
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get("all")
  findAll() {
    return this.commentService.findAll();
  }



  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
