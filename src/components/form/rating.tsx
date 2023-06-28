import { Rating, useMantineTheme, rem } from '@mantine/core';
import {
  IconMoodEmpty,
  IconMoodCry,
  IconMoodSad,
  IconMoodSmile,
  IconMoodHappy,
  IconMoodCrazyHappy,
} from '@tabler/icons-react';
import { useState } from 'react';
type RatingProps = {
  getRatingValue : (id:string, value: string| boolean| string[]) => void,
  id: string,
}
export default function MantineRating({getRatingValue,id}: RatingProps) {
  const [rating, setRating] = useState(0);
const theme = useMantineTheme();
  const getEmptyIcon = (value: number) => {
    const defaultProps = { size: rem(54), color: 'gray' };
    getRatingValue(id, rating.toString());
    switch (value) {
      case 1:
        return <IconMoodCry {...defaultProps} />;
      case 2:
        return <IconMoodSad {...defaultProps} />;
      case 3:
        return <IconMoodSmile {...defaultProps} />;
      case 4:
        return <IconMoodHappy {...defaultProps} />;
      case 5:
        return <IconMoodCrazyHappy {...defaultProps} />;
      default:
        return <IconMoodEmpty {...defaultProps} />;
    }
  };

  const getFullIcon = (value: number) => {
    const defaultProps = { size: rem(54) };
    switch (value) {
      case 1:
        return <IconMoodCry {...defaultProps} color={theme.colors.red[7]} />;
      case 2:
        return <IconMoodSad {...defaultProps} color={theme.colors.orange[7]} />;
      case 3:
        return <IconMoodSmile {...defaultProps} color={theme.colors.yellow[7]} />;
      case 4:
        return <IconMoodHappy {...defaultProps} color={theme.colors.lime[7]} />;
      case 5:
        return <IconMoodCrazyHappy {...defaultProps} color={theme.colors.green[7]} />;
      default:
        return <IconMoodEmpty {...defaultProps} />;
    }
    
  };

  return (
    <Rating emptySymbol={getEmptyIcon} fullSymbol={getFullIcon} highlightSelectedOnly onChange={setRating} />
  );
}