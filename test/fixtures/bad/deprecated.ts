// @ts-nocheck
import url from 'url';
import React from 'react';

export function deprecatedUsage() {
  url.parse('https://example.com'); // deprecated url.parse
  
  const buf = new Buffer('hello world'); // deprecated new Buffer
}

class OldComponent extends React.Component {
  componentWillMount() {
    // deprecated lifecycle
  }
}
