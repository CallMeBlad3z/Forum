import {
    Input,
    Button,
    Textarea,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@nextui-org/react'


export default function TopicCreateForm() {
    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="primary">Create Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a Topic</h3>
                        <Input label="Name" labelPlacement="outside" placeholder="Name" />
                        <Textarea 
                            label="Description"
                            labelPlacement="outside"
                            placeholder="Describe your topic"
                            />
                        <Button color="success" type="submit">Create</Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}