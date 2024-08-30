import { z } from 'zod'

//signup validation
export const signupInput=z.object({
	name:z.string().optional(),
	email:z.string().email(),
	password:z.string().min(4)
})
export type SignupInput=z.infer<typeof signupInput>

//Signin validation
export const signinInput=z.object({
	email:z.string().email(),
	password:z.string().min(4)
})
export type SigninInput=z.infer<typeof signinInput>

//Create blog validation
export const createBlogInput=z.object({
	title:z.string(),
	content:z.string()
})
export type CreateBlogInput=z.infer<typeof createBlogInput>

//Update validation
export const updateBlogInput=z.object({
    id:z.string(),
	title:z.string(),
	content:z.string(),
})
export type UpdateBlogInput=z.infer<typeof updateBlogInput>