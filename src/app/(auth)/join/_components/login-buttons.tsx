"use client";
import { Button } from "~/components/ui/button";
import { FaGithub, FaGoogle } from 'react-icons/fa6';
import { LogOut } from 'lucide-react';
import { Session } from "next-auth";
import { handleSignIn, handleSignOut } from "../_actions/auth";

export function LoginButtons({session}:{session: Session | null}) {

    return (
        <div className="flex flex-col gap-2 w-full max-w-[300px]">
            <Button 
                type="button" 
                className="bg-gray-800 hover:bg-gray-800/85" 
                disabled={Boolean(session)}
                onClick={() => handleSignIn("github")}
            >
                <FaGithub className="mr-2" />
                Continue with Github
            </Button>
            <Button 
                type="button" 
                className="bg-blue-500 hover:bg-blue-500/85" 
                disabled={Boolean(session)}
                onClick={() => handleSignIn("google")}
            >
                <FaGoogle className="mr-2" />
                Continue with Google
            </Button>
            {
                session && <div>
                <p className="mb-2 text-muted-foreground text-sm">You are already logged in</p>
                <Button 
                type="button" 
                disabled={!Boolean(session)}
                onClick={()=>handleSignOut()}
                className="w-full"
            >
                <LogOut size={16} className="mr-2" />
                Sign Out
            </Button>
            </div>
            }
        </div>
    );
}