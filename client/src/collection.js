import { useEffect, useState } from "react"
import { db } from "../src/firebase"
import { onSnapshot, collection } from "firebase/firestore";


const [posts, setPosts] = useState([])
useEffect(() => {
    onSnapshot(collection(db, "Posts"), (querySnapshot) => {
        let listPost = [];
        querySnapshot.forEach((item) => {
            const post = item.data()
            post.id = item.id
            listPost.push(post)
        })
        setPosts((prev) => [...listPost])
    })
}, [])