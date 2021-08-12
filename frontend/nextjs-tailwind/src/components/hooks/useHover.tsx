import { useState } from 'react';

const useHover = () => {
  const [hovering, setHovering] = useState(false);

  const onMouseOver = () => setHovering(true);
  const onMouseOut = () => setHovering(false);

  return [
    hovering,
    {
      onMouseOut,
      onMouseOver,
    },
  ];
};
export default useHover;
