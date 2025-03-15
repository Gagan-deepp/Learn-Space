"use server"

import { auth } from "@/auth"
import slugify from "slugify";
import { v4 as uuidv4 } from 'uuid';
import { writeClient } from "@/sanity/lib/write";
import { parseServerActionResponse } from "./utils";
import { fileUpload } from "./fileAction";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_COMMUNITY_QUERY } from "@/sanity/lib/queries";

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

export const addComment = async (content, id, files) => {
    const session = await auth();
    if (!session) return parseServerActionResponse({ error: "Not Signed In", status: "Error" });

    try {
        let uploadedFiles;
        if (files.length > 0) {
            uploadedFiles = await Promise.all(files.map(file => fileUpload(file))); // Upload all files concurrently
        }

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
            images: uploadedFiles,  // Pass the array of image references here
        }

        const result = await writeClient.create({ _type: "comment", ...comment });
        await writeClient
            .patch(id)
            .setIfMissing({ children: [] })
            .append("children", [
                { _type: "reference", _ref: result._id, _key: uuidv4() },
            ])
            .commit();

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

export const fetchCommunity = async (page = 1) => {
    const limit = 8;
    const start = (page - 1) * limit;
    const end = page * limit;
    const params = { start, end };

    return await sanityFetch({ query: ALL_COMMUNITY_QUERY, params })
}

export const fetchGoogleEvents = async (accessToken) => {
    try {
        const response = await fetch(
            "https://www.googleapis.com/calendar/v3/calendars/primary/events",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            console.log(response)
            throw new Error("Failed to fetch Google Calendar events");
        }

        const data = await response.json();
        return parseServerActionResponse({
            result: data.items.map((event) => ({
                id: event.id,
                title: event.summary,
                start: new Date(event.start.dateTime || event.start.date), // Handle all-day events
                end: new Date(event.end.dateTime || event.end.date),
            })),
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

export const deleteThread = async (threadId) => {
    const session = await auth();
    if (!session) return parseServerActionResponse({ error: "Not Signed In", status: "Error" });

    try {

        // Fetch the thread with references

        const thread = await writeClient.fetch(
            `*[_id == $threadId][0]{
              "childrenIds": children[]->_id
            }`,
            { threadId }
        );

        console.log("Thread ==> ", thread)

        if (!thread) {
            console.log("Thread not found");
            return parseServerActionResponse({
                error: "Thread not found",
                status: "Error",
            });
        }

        const docIdsToDelete = [];
        if (thread.childrenIds?.length > 0) {
            for (const childId of thread.childrenIds) {
                docIdsToDelete.push(childId, `drafts.${childId}`);
            }
        }
        docIdsToDelete.push(threadId, `drafts.${threadId}`);

        // --- Build a transaction ---
        const transaction = writeClient.transaction();

        // 1) Unset references on the main thread (published ID only is enough,
        //    but feel free to also patch the draft if needed)
        transaction.patch(threadId, (patch) =>
            patch.unset(["author", "community", "children"])
        );

        // 2) Delete all doc IDs (child comments + main thread; both published + drafts)
        for (const docId of docIdsToDelete) {
            transaction.delete(docId);
        }

        // --- Commit the transaction ---
        await transaction.commit();

        console.log(`Successfully deleted thread and comments`);
        return parseServerActionResponse({
            message: "Thread deleted successfully",
            status: "SUCCESS"
        });

    } catch (error) {
        console.error("Delete thread error:", error);
        return parseServerActionResponse({
            error: error.message,
            status: "Error"
        });
    }
}