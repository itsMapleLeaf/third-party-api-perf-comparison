const mediaFragment = /* GraphQL */ `
  fragment media on Media {
    id
    siteUrl
    title {
      native
      romaji
      english
      userPreferred
    }
    format
    bannerImage
    coverImage {
      medium
      large
      extraLarge
      color
    }
    episodes
    externalLinks {
      id
      url
      site
    }
    nextAiringEpisode {
      episode
      airingAt
    }
    isAdult
  }
`

const mediaListEntryFragment = /* GraphQL */ `
  fragment mediaListEntry on MediaList {
    id
    status
    progress
    score(format: POINT_10)
  }
`

const scheduleQuery = /* GraphQL */ `
  query Schedule($startDate: Int!, $page: Int!) {
    Page(page: $page, perPage: 30) {
      pageInfo {
        currentPage
        hasNextPage
      }
      airingSchedules(airingAt_greater: $startDate, sort: TIME) {
        id
        episode
        airingAt
        media {
          ...media
          mediaListEntry {
            ...mediaListEntry
          }
        }
      }
    }
  }
  ${mediaFragment}
  ${mediaListEntryFragment}
`

let data: unknown

const promise = fetch("https://graphql.anilist.co", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  body: JSON.stringify({
    query: scheduleQuery,
    variables: {
      startDate: Math.floor(Date.now() / 1000),
      page: 1,
    },
  }),
})
  .then((res) => res.json())
  .then((fetchedData) => {
    data = fetchedData
  })

export default function App() {
  if (!data) throw promise
  return <pre>{JSON.stringify(data, undefined, 2)}</pre>
}
