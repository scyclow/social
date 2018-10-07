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


const parseFragment = (fragment: string) => {
  if (fragment.match(externalLinkTest)) {
    return <a href={fragment} target="_blank">{fragment}</a>

  } else if (fragment.match(userTest)) {
    const userId = cleanFragment(fragment, /^@/)
    return <Link to={`/users/${userId}`}>{fragment}</Link>

  } else if (fragment.match(groupTest)) {
    const [groupId, threadId] = cleanFragment(fragment, /^\+/).split('/')
    console.log(groupId)
    const route = threadId
      ? `/groups/${groupId}/threads/${threadId}`
      : `/groups/${groupId}`
    return <Link to={route}>{fragment}</Link>

  } else {
    return fragment
  }
}

const combineFragments = (fragments: Array<Fragment>, f: string): Array<Fragment> => {
  const fragment = parseFragment(f);

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

export default ({ content }: Props) => (
  <React.Fragment>
    {content
      .split(' ')
      .reduce(combineFragments, [])
      .map((f, i) => <React.Fragment key={i}>{f}</React.Fragment>)
    }
  </React.Fragment>
)
