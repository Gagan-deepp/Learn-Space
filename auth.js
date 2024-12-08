import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { client } from "./sanity/lib/client"
import { AUTHOR_GITHUB_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    authorization: {
      params: {
        access_type: "offline", // Ensures you get a refresh token
        prompt: "consent",
      },
    }
  })],
  callbacks: {
    async signIn({ user: { name, email, image }, profile }) {

      let id, login, bio;
      id = profile.sub; // Google uses "sub" as the unique ID
      login = profile.given_name;
      bio = "";

      const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_GITHUB_QUERY, { id });

      if (!existingUser) {
        await writeClient.create({
          _type: 'author',
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        })
      }
      return true
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {

        const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_GITHUB_QUERY, { id: profile?.sub });

        token.id = user?._id;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id, accessToken: token.accessToken });
      return session;
    }

  }
})