import replace from 'lodash/replace';

/*
 * Escape tags with dollars wrapper
 * $<h1>$
 */
export function escapeTags(str: string) {
  return replace(str, /\$([^$]+)\$/, match => {
    return match
      .replace('<', '&lt;')
      .replace(/^\$/, '<b>')
      .replace(/\$$/, '</b>');
  });
}
