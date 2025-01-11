import Add from "../_components/add";

interface PostsEditProps {
    params: {
        id: string;
    };
}

export default async function PostsEdit({ params }: PostsEditProps) {
    const { id } = params;



    return (
        <main className="flex min-h-screen flex-col items-start ">
            <div className="w-full ">
                <Add id={id}/>
            </div>
        </main>
    );
}
