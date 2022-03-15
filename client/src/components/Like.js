import React, {useState } from 'react';
import axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';


export default function Like({mention}) {

  const [like, setLike] = useState(false);
  const [color, setColor] = useState('disabled');
  const [tip, setTip] = useState('Like');

  const mentionId = mention._id;

  const likeClick = async () => {
    await axios.put("http://localhost:3001/mention/like", {params:{mentionId}});
    setLike(prevLike => !prevLike);
    if (like) {
      setColor('primary');
      setTip('Unlike');
    } else {
      setColor('disabled');
      setTip('Like');
    }
  }


  return (
    <Tooltip title={tip} placement="bottom">
        <FavoriteIcon onClick={ likeClick } color={color} />
    </Tooltip>
  );
}
