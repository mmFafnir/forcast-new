import Button from "@/shared/UI/Button";
import TotalMatches from "@/shared/UI/TotalMatches";
import styles from "../styles/button.module.scss";
import IconFavorite from "../icons/IconFavorite";

export const FavoritesButton = () => {
  return (
    <Button className={styles.button}>
      <IconFavorite />
      <span>Избранное</span>
      <TotalMatches className={styles.total}>20</TotalMatches>
    </Button>
  );
};
