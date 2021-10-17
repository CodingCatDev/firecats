import { colors } from '@/utils/css';

interface Colors {
  [key: string]: string;
}

const catColors: Colors = colors;

const CatColor = ({ color }: { color: string }): JSX.Element => {
  const getColor = (color: string) => {
    const catColor = catColors[color];
    return {
      backgroundColor: catColor,
      color: getContrastYIQ(catColor),
    };
  };
  function getContrastYIQ(hexcolor: string) {
    const hex = hexcolor.replace('#', '');
    var r = parseInt(hex.substr(0, 2), 16);
    var g = parseInt(hex.substr(2, 2), 16);
    var b = parseInt(hex.substr(4, 2), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? 'black' : 'white';
  }

  return (
    <span className="p-1 rounded" style={getColor(color)}>
      {color}
    </span>
  );
};

export default CatColor;
