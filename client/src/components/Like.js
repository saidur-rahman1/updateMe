import React, {useState } from 'react';
import axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';


export default function Like({mention}) {

  const [like, setLike] = useState(mention.likes[0]);
  const color = like ? 'primary' : 'disabled';
  const tip = like ? 'Unlike' : 'Like';

  const mentionId = mention.id;

  // useEffect(() => {
  //   const getLike = async () => {
  //     const res = await axios.get("http://localhost:3001/mention/getlike/", {params:{mentionId}});
  //     setLike(res.data)
  //   };
  //   getLike();
  // }, [mentionId]);

  const queryData = {
    mentionId
  };

  const likeClick = async (e) => {
    e.stopPropagation();
    await axios.put("http://localhost:3001/mention/like", queryData);
    setLike(prevLike => !prevLike);
  }


  return (
    <Tooltip title={tip} placement="bottom">
        <FavoriteIcon onClick={ likeClick } color={color} />
    </Tooltip>
  );
}
