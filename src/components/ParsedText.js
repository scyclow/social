// @flow

import * as React from 'react'
import { replace } from 'lodash'
import { Link } from 'react-router-dom'

type Fragment = string | React.Node;

const last = (arr: Array<Fragment>): Fragment => arr[arr.length - 1]

const externalLinkTest = /^(http|https):\/\/.+\..+/
const userTest = /^@.+/
const groupTest =/^\+.+/

const cleanFragment = (fragment: string, test: RegExp) => replace(
  replace(fragment, test, ''),
  /(\.$)|(\?$)|(!$)/,
  ''
)


type ParserFn = string => Fragment;

const parseFragment: ParserFn = (fragment) => {
  if (fragment.match(externalLinkTest)) {
    return <a href={fragment} target="_blank">{fragment}</a>

  } else if (fragment.match(userTest)) {
    const userId = cleanFragment(fragment, /^@/)
    return <Link to={`/users/${userId}`}>{fragment}</Link>

  } else if (fragment.match(groupTest)) {
    const [groupId, threadId] = cleanFragment(fragment, /^\+/).split('/')

    const route = threadId
      ? `/groups/${groupId}/threads/${threadId}`
      : `/groups/${groupId}`
    return <Link to={route}>{fragment}</Link>

  } else {
    return fragment
  }
}

// const parseString: ParserFn = fragment => {
//   if (typeof fragment !== 'string') return fragment

//   return fragment
//     .split(' ')
//     .map(fragment => {

//     })
// }

const combineFragments = (parserFn: ParserFn) => (fragments: Array<Fragment>, f: string): Array<Fragment> => {
  const fragment = parserFn(f);

  if (!fragments.length) {
    return [fragment]
  }

  const lastFragment = last(fragments)

  if (typeof lastFragment === 'string' && typeof fragment === 'string') {
    return [...fragments.slice(0, -1), lastFragment + ' ' + fragment]

  } else if (typeof lastFragment === 'string') {
    return [...fragments.slice(0, -1), lastFragment + ' ', fragment]

  } else {
    return [...fragments, ' ', fragment]
  }
}

type Props = { content: string };

const parser = (content: string, parserFn: ParserFn) => content
  .split(' ')
  .reduce(combineFragments(parserFn), [])
  .map((f, i) => <React.Fragment key={i}>{f}</React.Fragment>)

export default ({ content }: Props) => (
  <React.Fragment>
    {parser(content, parseFragment)}
  </React.Fragment>
)
