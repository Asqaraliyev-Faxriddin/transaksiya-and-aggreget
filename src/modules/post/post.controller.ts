import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { createPost, updatePost } from './dto/post.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService:PostService){}

    @Get("all")
    allPosts(){
        return this.postService.AllPost()
    }

    @Post("create")
    createPost(@Body() payload:createPost){

        return this.postService.createPost(payload)

    }

    @Put("update/:id")
    updatepost(@Body() payload:updatePost,@Param("id") id:string){

        return this.postService.update(payload,id)

    }

    @Delete("delete/:id")
    delete(@Param("id") id:string){

        return this.postService.delete(id)

    }

}
