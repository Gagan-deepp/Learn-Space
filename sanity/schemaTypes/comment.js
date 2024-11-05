import { defineField, defineType } from "sanity";

export const comment = defineType(
    {
        name: "comment",
        title: "Comment",
        type: "document",
        fields: [
            defineField(
                {
                    name: 'content',
                    type: 'string'
                }),
            defineField(
                {
                    name: 'author',
                    type: 'reference',
                    to: [{ type: 'author' }]
                }),
            defineField(
                {
                    name: 'parent',
                    type: 'reference',
                    to: [{ type: 'thread' }]
                }),
        ],
    }
)