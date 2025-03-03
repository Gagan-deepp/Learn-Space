import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_GITHUB_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
  callbacks: {
    async signIn({ user: { name, email, image }, profile, account }) {

      let id, login, bio;

      if (account.provider === "github") {
        id = profile.id;
        login = profile.login;
        bio = profile.bio;
      } else if (account.provider === "google") {
        id = profile.sub;
        login = profile.given_name;
        bio = "";
      }

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
        try {
          const userId = account.provider === "github" ? profile.id : profile.sub;
          const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_GITHUB_QUERY, { id: userId });
          token.id = user?._id;
        } catch (error) {
          console.error("Error fetching user from Sanity:", error);
          // Still return token to prevent auth failure
        }
        return token
      }
      return token;
    },

    async session({ session, token }) {
      if (token.id) {
        session.id = token.id;
      }
      return session;
    }

  }
})