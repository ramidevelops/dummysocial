import { getDocs, collection } from 
'firebase/firestore'
import { DataBase, auth } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { PostCard } from './PostCard';
import { useAuthState } from 'react-firebase-hooks/auth';

export interface Post {
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
}

export const Main = () => {

    const postsRef = collection(DataBase, "posts")
    const [postsList, setPostsList] = useState<Post[] | null>(null)

    const getPosts = async () =>{
        const data = await getDocs(postsRef);
        setPostsList(data.docs.map((doc)=>({...doc.data(), id: doc.id})) as Post[]) // all this logic is just to retrieve all the posts stored in the database. data is an object which contains an array of documents (posts) and to each doc we apply the data() built in function which retrieves all the info in the post as an object.
    };

    const [user] = useAuthState(auth)

    useEffect(()=>{
        getPosts();
    }, [])



    return(
        <div>
        {user ? <div>
            <h1>Timeline</h1>
            <div>{postsList?.map((post)=> <PostCard post={post}></PostCard>)}</div>
        </div> : <h1>Welcome</h1>}
        </div> 
    )
}