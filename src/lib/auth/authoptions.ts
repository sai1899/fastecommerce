

import { db } from '@/app/db/db';
import { Users } from '@/app/db/schema';
import GoogleProvider from 'next-auth/providers/google';



export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            async profile(profile, token: any) {
                const data = {
                    fname: profile.given_name,
                    lname: profile.family_name,
                    email: profile.email,
                    provider: 'GOOGLE',
                    externalId: profile.sub,
                    image: profile.picture,
                    role:'admin'
                };

                console.log('data is',data)
                try {
                    const user = await db
                        .insert(Users)
                        .values(data)
                        .onConflictDoUpdate({ target: Users.email, set: data })
                        .returning();
                    return {
                        ...data,
                        name: data.fname,
                        id: String(user[0].id),
                        role: user[0].role,
                    };
                } catch (err) {
                    console.log(err);
                    return {
                        id: '',
                    };
                }
            },
        }),
    ],
    callbacks:{
        session(data: any){
            return data
        },
   
    jwt({token,user}){

        if(user){
            token.role=user.role;
            token.id=user.id
        }

        return token


    }
},
    
}