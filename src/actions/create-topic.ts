'use server';

import { z } from 'zod';

const createTopicSchema = z.object({
    name: z
    .string()
    .min(10)
    .regex(/^[a-zA-Z- ]+$/, { 
        message: 'Must be lowercase letter or dashes without spaces.'
    }),
    description: z.string().min(10)
});

export async function createTopic(formData: FormData) {
    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
    });

    if (!result.success) {
        console.log(result.error.flatten().fieldErrors)
    }
    //TODO: revalidate the homepage
}