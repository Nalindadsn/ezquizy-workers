"use client"
import { MinimalTiptapEditor } from './components/minimal-tiptap'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

function page() {
  return (
    <div><ExampleForm /></div>
  )
}

export default page


const ExampleForm = () => {
    const formSchema = z.object({
      description: z
        .string({
          required_error: 'Description is required'
        })
        .min(1, 'Description is required')
    })
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        description: ''
      }
    })
  
    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Description</FormLabel>
                <FormControl>
                  <MinimalTiptapEditor
                    {...field}
                    throttleDelay={2000}
                    className={cn('w-full', {
                      'border-destructive focus-within:border-destructive': form.formState.errors.description
                    })}
                    editorContentClassName="p-5"
                    output="html"
                    placeholder="Type your description here..."
                    autofocus={true}
                    immediatelyRender={false}
                    editable={true}
                    injectCSS={true}
                    shouldRerenderOnTransaction={false}
                    editorClassName="focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    )
  }