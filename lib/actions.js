"use server"

import { auth } from "@/auth"
import slugify from "slugify";
import { v4 as uuidv4 } from 'uuid';
import { writeClient } from "@/sanity/lib/write";
import { parseServerActionResponse } from "./utils";

export const createCommunity = async (state, form, pitch) => {
    const session = await auth();

    if (!session) return parseServerActionResponse({ error: "Not Signed In", status: "Error" });

    const { title, description, link, category } = Object.fromEntries(
        Array.from(form).filter(([key]) => key != 'pitch')
    )

    const slug = slugify(title, { lower: true, strict: true });

    try {

        const community = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug
            },
            count: 1,
            members: [
                {
                    _type: 'reference',
                    _ref: session?.id,
                    _key: uuidv4(),
                }
            ],

            author: {
                _type: 'reference',
                _ref: session?.id,
            },
            pitch
        }

        const result = await writeClient.create({ _type: "community", ...community });

        return parseServerActionResponse({
            ...result,
            error: "",
            status: "SUCCESS"
        })

    } catch (error) {
        console.log(error);

        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: "ERROR",
        });
    }
}

export const createThread = async (state, form, community) => {
    const session = await auth();
    if (!session) return parseServerActionResponse({ error: "Not Signed In", status: "Error" });

    const { title, description } = Object.fromEntries(
        Array.from(form).filter(([key]) => key != 'pitch')
    )
    const slug = slugify(title, { lower: true, strict: true });
    try {

        const thread = {
            title,
            description,
            slug: {
                _type: slug,
                current: slug
            },
            author: {
                _type: 'reference',
                _ref: session?.id,
            },
            community: {
                _type: 'reference',
                _ref: community,
            },
        }

        const result = await writeClient.create({ _type: "thread", ...thread });

        return parseServerActionResponse({
            ...result,
            error: "",
            status: "SUCCESS"
        })

    } catch (error) {
        console.log(error);
        return parseServerActionResponse({ error: JSON.stringify(error), status: "ERROR" });
    }
}
export const joinCommunity = async (communityId, user) => {
    const newUser = {
        _type: 'reference',
        _ref: user._id,
        _key: uuidv4(),
    }
    try {
        const result = await writeClient
            .patch(communityId) // Specify the community document _id
            .setIfMissing({ members: [] }) // Initialize members array if it doesn't exist
            .insert('after', 'members[-1]', [newUser]) // Add new user at the end of the array
            .inc({ count: 1 })
            .commit(); // Commit the patch to apply the changes

        return parseServerActionResponse({
            ...result,
            error: "",
            status: "SUCCESS"
        })
    } catch (error) {
        console.log(error)
        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: "ERROR"
        })
    }

}
export const removeFromCommunity = async (communityId, userId) => {
    try {
        const memberToRemove = `members[_ref=="${userId}"]`;
        await writeClient
            .patch(communityId)
            .unset([memberToRemove])        // Remove the user from `members`
            .dec({ count: 1 })              // Decrement the `count` field
            .commit();

        return parseServerActionResponse({ error: "", status: "SUCCESS" })
    } catch (error) {
        console.log(error)
        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: "ERROR"
        })
    }

}

export const addComment = async (content, id) => {
    const session = await auth();
    if (!session) return parseServerActionResponse({ error: "Not Signed In", status: "Error" });

    try {

        const comment = {
            content,
            author: {
                _type: 'reference',
                _ref: session?.id,
                _key: uuidv4(),
            },
            parent: {
                _type: 'reference',
                _ref: id,
                _key: uuidv4(),
            },
        }

        const result = await writeClient.create({ _type: "comment", ...comment });

        return parseServerActionResponse({
            ...result,
            error: "",
            status: "SUCCESS"
        })

    } catch (error) {
        console.log(error);
        return parseServerActionResponse({ error: JSON.stringify(error), status: "ERROR" });
    }
}