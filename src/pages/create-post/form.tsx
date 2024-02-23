import { useForm } from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { addDoc, collection} from 'firebase/firestore'
import { DataBase, auth } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"

export const CreateForm = () => {

    const [user] = useAuthState(auth);

    const navigate = useNavigate()

    interface CreateFormData {
        title: string,
        description: string,
    }

    const schema = yup.object().shape({
        title: yup.string().required("a title must be added!"),
        description: yup.string().required("description is needed!")
    });

    const {register, handleSubmit, formState: {errors} } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    })

    const postsRef = collection(DataBase, "posts")

    const onCreatePost = async (data: CreateFormData) => {

        await addDoc(postsRef, {
            //title: data.title,
            //description: data.description,
            ...data, //this adds all the info from data by destructuring the object
            username: user?.displayName,
            userId: user?.uid,
        });

        navigate("/")
    };


    return (
    <form onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder="what are u thinking about?..." {...register("title")}/>
        <p>{errors.title?.message}</p>
        <textarea placeholder="Thoughts here.." {...register("description")}/>
        <p>{errors.description?.message}</p>
        <input type="submit" className="primary-btn"></input>
    </form>
    ) 
}