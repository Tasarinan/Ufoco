import debounce from 'lodash.debounce';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class MdEditor extends PureComponent {
  static propTypes = {
    enableSpellcheck: PropTypes.bool.isRequired,
    hideHeadline: PropTypes.bool.isRequired,
    note: PropTypes.object.isRequired,
    fetchDetail: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const weekdayDate = toLocaleWeekday(getUpdateDate());
    return <form className='editor'></form>;
  }
}
