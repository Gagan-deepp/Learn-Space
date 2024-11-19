// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('community').title('Community'),
      S.documentTypeListItem('thread').title('Thread'),
      S.documentTypeListItem('comment').title('Comment'),
    ])
