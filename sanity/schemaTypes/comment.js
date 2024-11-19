import { MessageCircle } from "lucide-react";
import { defineField, defineType } from "sanity";

export const comment = defineType(
    {
        name: "comment",
        title: "Comment",
        icon: MessageCircle,
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
            defineField({
                name: "images", 
                type: "array",  
                title: "Images",
                of: [{ type: "image" }],  
                options: {
                    hotspot: true,  // Optional: enables image cropping in Studio
                },
                validation: Rule => Rule.optional(), // Optional field
            }),
        ],
    }
)