import React from 'react';
import { ChipSet, Chip } from '@material/react-chips';
import { withRouter } from 'react-router-dom';
import './Tags.css';

const categories = {
  'politics': "Politik",
  'economy': "Wirtschaft",
  'science': "Wissenschaft",
  'technology': "Technologie",
  'culture': "Kultur",
  'sports': "Sport",
  'knowledge': "Wissen",
  'opinions': "Meinung"
};

const tags = Object.keys(categories).map(key =>
  <Chip id={key} label={categories[key]}></Chip>
)

const TagCloud = (props) => {
  const {
    filter,
    selected
  } = props;

  return (
    <span className='tagcloud'>
      <ChipSet
        filter
        selectedChipIds={selected}
        handleSelect={(selected) => filter(selected)}
      >
        {tags}
      </ChipSet>
    </span>
  )
}


export default withRouter(TagCloud);