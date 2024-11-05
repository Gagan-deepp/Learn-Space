import { defineField, defineType } from "sanity";

export const thread = defineType(
    {
        name: "thread",
        title: "Thread",
        type: "document",
        fields: [
            defineField(
                {
                    name: 'title',
                    type: 'string'
                }),
            defineField(
                {
                    name: 'slug',
                    type: 'slug',
                    options: {
                        source: 'title'
                    }
                }),
            defineField(
                {
                    name: 'author',
                    type: 'reference',
                    to: { type: 'author' }
                }),
            defineField(
                {
                    name: 'community',
                    type: 'reference',
                    to: { type: 'community' }
                }),
            defineField(
                {
                    name: 'children',
                    type: 'array',
                    of: [
                        {
                            type: 'reference',
                            to: [{ type: 'comment' }]
                        }
                    ]
                }),
            defineField(
                {
                    name: 'description',
                    type: 'text'
                }),
        ],
    }
)