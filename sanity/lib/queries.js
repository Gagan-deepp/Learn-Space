import { defineQuery } from "next-sanity";

export const COMMUNITY_QUERY = defineQuery(`
    *[_type == "community" && defined(slug.current) && !defined($query) || title match $query || category match $query || author->name match $query ] 
    | order(_createdAt desc)[0...4] {
        _id,
        title,
        slug,
        _createdAt,
        author -> { _id, name , image,bio },
        members[] -> { _id, name , image,bio },
        count,
        description,
        category,
        image
    }`
)
export const FAMOUS_COMMUNITY_QUERY = defineQuery(`
    *[_type == "community"] 
    | order(count desc)[0...4] {
        _id,
        title,
        slug,
        _createdAt,
        author -> { _id, name , image,bio },
        members[] -> { _id, name , image,bio },
        count,
        description,
        category,
        image
    }`
)
export const COMMUNITY_MEMBER_COUNT_QUERY = defineQuery(`
    *[_type == "community" && _id == $id][0] 
    {
        _id,
        count
    }`
)
export const COMMUNITY_BY_ID_QUERY = defineQuery(`
    *[_type == "community" && _id == $id][0] 
    {
        _id,
        title,
        slug,
        _createdAt,
        author -> { _id, name, username, image, bio, id },
        members[] -> { _id, name, image, bio, id },
        count,
        description,
        category,
        image,
        pitch
    }`
)
export const AUTHOR_GITHUB_QUERY = defineQuery(`
    *[_type == "author" && id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }
`)
export const AUTHOR_ID_QUERY = defineQuery(`
    *[_type == "author" && _id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }
`)
export const COMMUNITY_BY_AUTHOR_QUERY = defineQuery(`
    *[_type == "community" && author._ref == $id] 
    | order(_createdAt desc) {
        _id,
        title,
        slug,
        _createdAt,
        author -> { _id, name , image,bio },
        members[] -> { _id, name , image,bio },
        count,
        description,
        category,
        image
    }`
)

export const THREAD_QUERY = defineQuery(`
    *[_type == "thread"] 
    | order(_createdAt desc)[0...4] {
        _id,
        title,
        slug,
        _createdAt,
        author -> { _id, name , image },
        community -> { _id, title },
        description,
    }`
)