import { Post as InterfacePost } from "./Main"
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore"
import { DataBase, auth } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"

interface Props {
    post: InterfacePost
} // Interface so when parsing prop, the funcion knows what to expect.

interface Like {
    userId: string;
    likeId: string;
}

export const PostCard = (props: Props) =>{

    const {post} = props;

    const likesRef = collection(DataBase, "likes")

    const [likes, setLikes] = useState<Like[] | null >(null)

    const likesDoc = query(likesRef, where("postId", "==", post.id))

    const getLikes = async () =>{
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc)=>({userId: doc.data().userId, likeId: doc.id})))
    }

    const [user] = useAuthState(auth)

    const addLike = async () => {
        try {
        const newDoc = await addDoc(likesRef, { userId: user?.uid , postId: post.id }) //it receives 2 pieces of data, the ones we want to add to the database, following database nomenclature;
        if(user){
        setLikes((prev)=> prev ? [...prev, { userId: user?.uid, likeId: newDoc.id }] : [{userId: user?.uid, likeId: newDoc.id}])};}
         catch(err){
            console.log(err)
        }

    }

    const removeLike = async () => {
        try {
        const likeToDeleteQuery = query(
            likesRef,
            where("postId", "==", post.id), where("userId", "==", user?.uid )
        )// this logic is to find a document which satisfies this requirement so we can get the document ID to be deleted from the collection or likes array.

        const likeToDeleteData = await getDocs(likeToDeleteQuery) // here we fetch the data and then iterate through the arrays until we find just ONE item that satisfies the likeToDeleteQuery requirements.

        const likeId=likeToDeleteData.docs[0].id

        const likeToDelete = doc(DataBase, "likes", likeToDeleteData.docs[0].id)
        
        await deleteDoc(likeToDelete) //it receives 2 pieces of data, the ones we want to add to the database, following database nomenclature;
        if(user){
        setLikes((prev)=>prev && prev?.filter((like)=>like.likeId !== likeId))}
        }
         catch(err){
            console.log(err)
        }

    }
    
    
    const hasUserLiked = likes?.find((like)=> like.userId === user?.uid)

    useEffect(()=>{
        getLikes();
    }, []);

    

    return (
        <div className="post-container">
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <footer>
                <p>@{post.username}</p>
                <button onClick={hasUserLiked ? removeLike : addLike} className="like-btn"> {hasUserLiked ?  <>&#x2764;</> : <>&#x2661;</> } </button>
                {likes !=null && <p>likes: {likes.length}</p>}
            </footer>
        </div>
    )
}