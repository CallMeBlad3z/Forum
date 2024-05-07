'use server';
import { db } from '@/db';
import { Topic } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';
import paths from '@/paths';

const createTopicSchema = z.object({
    name: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z- ]+$/, { 
        message: 'Must be lowercase letter or dashes without spaces.'
    }),
    description: z.string().min(10)
});

interface CreateTopicFormState {
    errors: {
        name?: string[];
        description?: string[];
        _form?: string[];
    };
}

export async function createTopic(
    formState: CreateTopicFormState,
    formData: FormData
): Promise<CreateTopicFormState> {

    await new Promise((resolve) => setTimeout(resolve, 2500)); //Simulate network delay

    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        };
    }

    const session = await auth(); //Get the current session
    if ( !session || !session.user) { //Check if user is logged in
        return { 
            errors: { 
                _form: ['You must be logged in to create a topic.']
            }
        };
    }

    let topic: Topic;
    try {
        topic = await db.topic.create({
            data: {
                slug: result.data.name, 
                description: result.data.description,
            }
        });
    } catch (err:unknown) {
        if (err instanceof Error) { // Check if error is an instance of Error
            return { // Return error message
                errors: {
                    _form: [err.message]
                }
            }
        } else {  // If error is not an instance of Error
            return { // Return unknown error message
                errors: { 
                    _form: ['An unknown error occurred.']
                }
            }
        }
    }
    revalidatePath('/');
    redirect(paths.topicShow(topic.slug)); //Redirects user to the newly created topic
}