"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase_client";

function useUser () {
    const [currentUser, setCurrentUser] = useState()
    const catchUser = async () => {
        const {data: { user }} = await supabase.auth.getUser()
        setCurrentUser(user ?? "no user")
    }
    useEffect(() => {
        if(!supabase) return;
        catchUser()
     }, [supabase])
     return [currentUser]
}
export default useUser;