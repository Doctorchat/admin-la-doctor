import React from 'react';
import { Comment, Avatar } from 'antd';
import Highlighter from 'react-highlight-words';
import date from '../../../utils/date';
import PropTypes from 'prop-types';

const MobileView = ({ item, type, searchText }) => {
  let textToHighlight;

  if (type === 'logs') {
    textToHighlight = item.action;
  } else {
    textToHighlight = item.amount + ' ' + item.currency + ', ' + item.status;

    if (item.promocode) {
      textToHighlight += ', ' + item.promocode;
    }
  }
  return (
    <Comment
      key={item.id}
      author={
        <b>
          <Highlighter
            searchWords={[searchText]}
            textToHighlight={date(item.created_at).full}
            highlightStyle={{ color: 'red', fontWeight: 'bold', padding: '0' }}
          />
        </b>
      }
      avatar={
        <Avatar
          style={{
            marginTop: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {item.id + 1}
        </Avatar>
      }
      content={
        <p>
          <Highlighter
            searchWords={[searchText]}
            textToHighlight={textToHighlight}
            highlightStyle={{ color: 'red', fontWeight: 'bold', padding: '0' }}
          />
        </p>
      }
    />
  );
};

MobileView.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
};

export default MobileView;
