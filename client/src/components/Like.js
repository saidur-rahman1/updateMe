import React, {useState } from 'react';
import axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';


export default function Like(props) {

  const [like, setLike] = useState(props.like);
  const color = like ? 'primary' : 'disabled';
  const tip = like ? 'Unlike' : 'Like';
  const { mentionId } = props;

  const queryData = {
    mentionId
  };

  const likeClick = async (e) => {
    try {
      e.stopPropagation();
      await axios.put("http://localhost:3001/mention/like", queryData);
      setLike(prevLike => !prevLike);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Tooltip title={tip} placement="bottom">
        <FavoriteIcon onClick={ likeClick } color={color} />
    </Tooltip>
  );
}
